import { NextRequest, NextResponse } from 'next/server'
import { appendOrderToSheet } from '@/lib/googleSheets'

// Must match OrderForm PACKAGES and lib/googleSheets constants
const PRICE_PER_KG    = 99
const DELIVERY_PER_KG = 20

// ─── POST /api/place-order ────────────────────────────────────────────────────
// Flow:
//  1. Validate request body
//  2. Call Steadfast "Create Order" API → get tracking_code + consignment_id
//  3. Save full order row (including tracking data) to Google Sheets atomically
//  4. Return success with tracking_code so OrderForm can show it immediately
export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'অবৈধ ডেটা' }, { status: 400 })
  }

  // ── Input validation ──────────────────────────────────────────────────────
  if (!body.name || !body.phone || !body.address || !body.district || !body.quantity) {
    return NextResponse.json(
      { error: 'সব প্রয়োজনীয় তথ্য পূরণ করুন' },
      { status: 400 },
    )
  }

  const kg = parseFloat(body.quantity)
  if (isNaN(kg) || kg < 1) {
    return NextResponse.json(
      { error: 'কমপক্ষে ১ কেজি অর্ডার করতে হবে' },
      { status: 400 },
    )
  }

  const phone = body.phone.replace(/\s/g, '')
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    return NextResponse.json(
      { error: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)' },
      { status: 400 },
    )
  }

  const isBkash = body.payment === 'bkash_personal' || body.payment === 'bkash_merchant'
  if (isBkash && !body.transactionId) {
    return NextResponse.json(
      { error: 'বিকাশ পেমেন্টের জন্য ট্রানজেকশন ID দিন' },
      { status: 400 },
    )
  }

  // ── Price calculation (server-authoritative) ──────────────────────────────
  const productTotal  = kg * PRICE_PER_KG
  const deliveryTotal = kg * DELIVERY_PER_KG
  const grandTotal    = productTotal + deliveryTotal

  // COD = 0 for bKash (customer already paid merchant); full amount for cash-on-delivery
  const cod_amount = isBkash ? 0 : grandTotal

  // Unique invoice number per order (timestamp + last 4 digits of phone)
  const invoice = `FC-${Date.now()}-${phone.slice(-4)}`

  // ── Step 1: Create consignment on Steadfast ───────────────────────────────
  let trackingCode  = ''
  let consignmentId = ''

  try {
    const sfRes = await fetch('https://portal.steadfast.com.bd/api/v1/create_order', {
      method: 'POST',
      headers: {
        'Api-Key':      process.env.STEADFAST_API_KEY!,
        'Secret-Key':   process.env.STEADFAST_SECRET_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invoice,
        recipient_name:    body.name,
        recipient_phone:   phone,
        recipient_address: `${body.address}, ${body.district}`,
        cod_amount,
        note:   body.note || '',
        weight: kg,
      }),
      cache: 'no-store',
    })

    if (!sfRes.ok) {
      const errJson = await sfRes.json().catch(() => ({}))
      console.error('[place-order] Steadfast rejected:', sfRes.status, errJson)
      return NextResponse.json(
        { error: 'কুরিয়ার সার্ভিসে অর্ডার তৈরি করতে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।' },
        { status: 502 },
      )
    }

    const sfData  = await sfRes.json()
    trackingCode  = String(sfData?.consignment?.tracking_code  ?? '')
    consignmentId = String(sfData?.consignment?.consignment_id ?? '')

    if (!trackingCode) {
      console.error('[place-order] Missing tracking_code in Steadfast response:', sfData)
      return NextResponse.json(
        { error: 'ট্র্যাকিং কোড পাওয়া যায়নি। আবার চেষ্টা করুন।' },
        { status: 502 },
      )
    }
  } catch (err) {
    console.error('[place-order] Steadfast network error:', err)
    return NextResponse.json(
      { error: 'কুরিয়ার সার্ভিসে সংযোগ সমস্যা। একটু পরে আবার চেষ্টা করুন।' },
      { status: 503 },
    )
  }

  // ── Step 2: Save to Google Sheets (with tracking data) ────────────────────
  // Steadfast consignment is already created at this point.
  // If Sheets fails, we log it but still return success so the customer
  // receives the tracking code. Admin can check Steadfast dashboard.
  try {
    await appendOrderToSheet({
      name:          body.name,
      phone,
      address:       body.address,
      district:      body.district,
      quantity:      body.quantity,
      payment:       body.payment,
      transactionId: body.transactionId || '',
      note:          body.note          || '',
      trackingCode,
      consignmentId,
      invoice,
    })
  } catch (err) {
    console.error(
      '[place-order] ⚠️  Google Sheets failed AFTER Steadfast success.',
      'Tracking code:', trackingCode,
      'Consignment ID:', consignmentId,
      err,
    )
    // Still return success — customer has tracking code, Steadfast order exists
  }

  return NextResponse.json({
    message:       'অর্ডার সফলভাবে হয়েছে!',
    tracking_code: trackingCode,
    total:         grandTotal,
  })
}
