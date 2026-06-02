import { NextRequest, NextResponse } from 'next/server'
import { getOrderByPhone } from '@/lib/googleSheets'

export const preferredRegion = 'sin1' // Singapore — closest Vercel region to Bangladesh

// Steadfast delivery_status → human-readable Bangla label + UI color
export const STEADFAST_STATUS_MAP: Record<string, { label: string; color: string; step: number }> = {
  pending:           { label: 'কুরিয়ারে বুক হয়েছে',       color: '#d97706', step: 1 },
  in_review:         { label: 'কুরিয়ার রিভিউ করছে',        color: '#d97706', step: 1 },
  in_transit:        { label: 'ডেলিভারি রুটে আছে',         color: '#2563eb', step: 2 },
  hold:              { label: 'অস্থায়ীভাবে হোল্ড আছে',     color: '#ea580c', step: 2 },
  partial_delivered: { label: 'আংশিক ডেলিভারি সম্পন্ন',    color: '#0891b2', step: 3 },
  delivered:         { label: 'সফলভাবে ডেলিভারি হয়েছে ✓', color: '#16a34a', step: 3 },
  cancelled:         { label: 'অর্ডার বাতিল করা হয়েছে',   color: '#dc2626', step: -1 },
  unknown:           { label: 'তথ্য পাওয়া যাচ্ছে না',      color: '#6b7280', step: 1 },
}

// ─── GET /api/track-order?phone=01XXXXXXXXX ───────────────────────────────────
export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get('phone')?.replace(/\s/g, '')

  // Validate BD mobile number format
  if (!phone || !/^01[3-9]\d{8}$/.test(phone)) {
    return NextResponse.json(
      { error: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)' },
      { status: 400 },
    )
  }

  // ── Step 1: Look up the most recent order in Google Sheets ────────────────
  let order
  try {
    order = await getOrderByPhone(phone)
  } catch (err) {
    console.error('[track-order] Google Sheets error:', err)
    return NextResponse.json(
      { error: 'অর্ডার তথ্য লোড করতে সমস্যা হচ্ছে। একটু পরে আবার চেষ্টা করুন।' },
      { status: 500 },
    )
  }

  if (!order) {
    return NextResponse.json(
      { error: 'এই নম্বরে কোনো অর্ডার পাওয়া যায়নি।' },
      { status: 404 },
    )
  }

  // ── Step 2: Tracking code is saved automatically by /api/place-order.
  //    If empty, the Steadfast call hasn't happened yet (edge case).
  if (!order.trackingCode) {
    return NextResponse.json({ order, tracking: null })
  }

  // ── Step 3: Fetch live status from Steadfast ──────────────────────────────
  let tracking: { delivery_status: string } | null = null
  try {
    const sfRes = await fetch(
      `https://portal.packzy.com/api/v1/status_by_trackingcode/${encodeURIComponent(order.trackingCode)}`,
      {
        headers: {
          'Api-Key':    process.env.STEADFAST_API_KEY!,
          'Secret-Key': process.env.STEADFAST_SECRET_KEY!,
        },
        // Always fetch fresh status; never use cached response
        cache: 'no-store',
      },
    )

    if (sfRes.ok) {
      const json = await sfRes.json()
      // Steadfast may return status at top level or inside a `data` object
      const deliveryStatus: string =
        json?.delivery_status ?? json?.data?.delivery_status ?? 'unknown'
      tracking = { delivery_status: deliveryStatus }
    } else {
      console.warn('[track-order] Steadfast returned', sfRes.status)
    }
  } catch (err) {
    // Non-fatal: show order info even if Steadfast is unreachable
    console.error('[track-order] Steadfast API error:', err)
  }

  return NextResponse.json({ order, tracking })
}
