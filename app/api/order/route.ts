import { NextRequest, NextResponse } from 'next/server'
import { appendOrderToSheet } from '@/lib/googleSheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.name || !body.phone || !body.address || !body.district || !body.quantity) {
      return NextResponse.json(
        { error: 'সব প্রয়োজনীয় তথ্য পূরণ করুন' },
        { status: 400 }
      )
    }

    const kg = parseFloat(body.quantity)
    if (isNaN(kg) || kg < 1) {
      return NextResponse.json(
        { error: 'কমপক্ষে ১ কেজি অর্ডার করতে হবে' },
        { status: 400 }
      )
    }

    const phoneRegex = /^01[3-9]\d{8}$/
    if (!phoneRegex.test(body.phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)' },
        { status: 400 }
      )
    }

    if ((body.payment === 'bkash' || body.payment === 'nagad') && !body.transactionId) {
      return NextResponse.json(
        { error: 'বিকাশ/নগদ পেমেন্টের জন্য ট্রানজেকশন ID দিন' },
        { status: 400 }
      )
    }

    const result = await appendOrderToSheet(body)

    return NextResponse.json({
      message: 'অর্ডার সফলভাবে জমা হয়েছে!',
      total: result.total,
    })
  } catch (error) {
    console.error('Order API Error:', error)
    return NextResponse.json(
      { error: 'সার্ভার সমস্যা। পরে আবার চেষ্টা করুন।' },
      { status: 500 }
    )
  }
}
