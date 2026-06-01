import { google } from 'googleapis'

const PRICE_PER_KG     = 140
const DELIVERY_DHAKA   = 120  // ঢাকায় প্রতি কেজি ডেলিভারি
const DELIVERY_OUTSIDE = 140  // ঢাকার বাইরে প্রতি কেজি ডেলিভারি

function calcPrices(quantity: string, district: string) {
  const kg       = parseFloat(quantity) || 0
  const product  = kg * PRICE_PER_KG
  const rate     = district === 'ঢাকা' ? DELIVERY_DHAKA : DELIVERY_OUTSIDE
  const delivery = kg * rate
  return { kg, product, delivery, total: product + delivery, rate }
}

const HEADERS = [
  'Timestamp', 'নাম', 'মোবাইল', 'ঠিকানা', 'জেলা',
  'পরিমাণ (কেজি)', 'পণ্যমূল্য', 'ডেলিভারি চার্জ', 'মোট', 'পেমেন্ট',
  'ট্রানজেকশন ID', 'নোট', 'স্ট্যাটাস',
]

export async function appendOrderToSheet(orderData: Record<string, string>) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  // প্রথম sheet-এর নাম খুঁজে বের করো
  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const sheetName = meta.data.sheets?.[0]?.properties?.title ?? 'Sheet1'
  const range = `${sheetName}!A:M`

  // Sheet খালি থাকলে header row যোগ করো
  const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A1` })
  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:M1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [HEADERS] },
    })
  }

  const { kg, product, delivery, total, rate } = calcPrices(orderData.quantity, orderData.district)

  const paymentLabel =
    orderData.payment === 'cod'   ? 'ক্যাশ অন ডেলিভারি'
    : orderData.payment === 'bkash' ? 'বিকাশ'
    : 'নগদ'

  const row = [
    new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' }),
    orderData.name,
    orderData.phone,
    orderData.address,
    orderData.district,
    `${kg} কেজি`,
    `৳${product} (${kg}kg × ৳${PRICE_PER_KG})`,
    `৳${delivery} (${kg}kg × ৳${rate})`,
    `৳${total}`,
    paymentLabel,
    orderData.transactionId || '—',
    orderData.note || '—',
    'নতুন অর্ডার',
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })

  return { success: true, total }
}
