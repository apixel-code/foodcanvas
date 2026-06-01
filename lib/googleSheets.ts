import { google } from 'googleapis'

const PRICE_PER_KG    = 20
const DELIVERY_PER_KG = 20

function calcPrices(quantity: string) {
  const kg       = parseFloat(quantity) || 0
  const product  = kg * PRICE_PER_KG
  const delivery = kg * DELIVERY_PER_KG
  return { kg, product, delivery, total: product + delivery, rate: DELIVERY_PER_KG }
}

// Column N (index 13) → admin fills this after creating shipment on Steadfast portal
const HEADERS = [
  'Timestamp', 'নাম', 'মোবাইল', 'ঠিকানা', 'জেলা',
  'পরিমাণ (কেজি)', 'পণ্যমূল্য', 'ডেলিভারি চার্জ', 'মোট', 'পেমেন্ট',
  'ট্রানজেকশন ID', 'নোট', 'স্ট্যাটাস', 'Steadfast Tracking Code',
]

// ─── Shared auth helper ───────────────────────────────────────────────────────
function getAuth(readonly = false) {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      readonly
        ? 'https://www.googleapis.com/auth/spreadsheets.readonly'
        : 'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface OrderTrackingInfo {
  timestamp:    string
  name:         string
  phone:        string
  district:     string
  quantity:     string
  total:        string
  status:       string
  trackingCode: string
}

export async function appendOrderToSheet(orderData: Record<string, string>) {
  const auth = getAuth()

  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  // প্রথম sheet-এর নাম খুঁজে বের করো
  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const sheetName = meta.data.sheets?.[0]?.properties?.title ?? 'Sheet1'
  const range = `${sheetName}!A:M`

  // Sheet খালি থাকলে header row যোগ করো (A:N — tracking code কলামসহ)
  const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A1` })
  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:N1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [HEADERS] },
    })
  }

  const { kg, product, delivery, total, rate } = calcPrices(orderData.quantity)

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

// ─── Order lookup by phone (for tracking) ─────────────────────────────────────
// Reads columns A:N and returns the MOST RECENT row matching the phone number.
// Column N (index 13) = Steadfast Tracking Code, filled by admin after shipping.
export async function getOrderByPhone(phone: string): Promise<OrderTrackingInfo | null> {
  const sheets       = google.sheets({ version: 'v4', auth: getAuth(true) })
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  const meta      = await sheets.spreadsheets.get({ spreadsheetId })
  const sheetName = meta.data.sheets?.[0]?.properties?.title ?? 'Sheet1'

  const res  = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A:N` })
  const rows = res.data.values ?? []

  // Row 0 is the header; data starts at row 1. Iterate bottom-up for most recent.
  const normalizedPhone = phone.replace(/\s/g, '')
  for (let i = rows.length - 1; i >= 1; i--) {
    const row      = rows[i]
    const rowPhone = String(row[2] ?? '').replace(/\s/g, '')
    if (rowPhone !== normalizedPhone) continue

    return {
      timestamp:    String(row[0]  ?? ''),
      name:         String(row[1]  ?? ''),
      phone:        String(row[2]  ?? ''),
      district:     String(row[4]  ?? ''),
      quantity:     String(row[5]  ?? ''),
      total:        String(row[8]  ?? ''),
      status:       String(row[12] ?? 'নতুন অর্ডার'),
      trackingCode: String(row[13] ?? ''),
    }
  }

  return null
}
