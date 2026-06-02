import { google } from 'googleapis'

// Product price matches OrderForm PACKAGES (৳99/kg)
const PRICE_PER_KG    = 99
const DELIVERY_PER_KG = 20   // flat delivery rate, location-independent

function calcPrices(quantity: string) {
  const kg       = parseFloat(quantity) || 0
  const product  = kg * PRICE_PER_KG
  const delivery = kg * DELIVERY_PER_KG
  return { kg, product, delivery, total: product + delivery }
}

// A=Timestamp B=নাম C=মোবাইল D=ঠিকানা E=জেলা F=থানা G=পরিমাণ H=পণ্যমূল্য
// I=ডেলিভারি J=মোট K=পেমেন্ট L=ট্রানজেকশনID M=নোট N=স্ট্যাটাস
// O=Tracking Code  P=Consignment ID
const HEADERS = [
  'Timestamp', 'নাম', 'মোবাইল', 'ঠিকানা', 'জেলা', 'থানা',
  'পরিমাণ (কেজি)', 'পণ্যমূল্য', 'ডেলিভারি চার্জ', 'মোট', 'পেমেন্ট',
  'ট্রানজেকশন ID', 'নোট', 'স্ট্যাটাস',
  'Steadfast Tracking Code', 'Steadfast Consignment ID',
]

// ─── Shared auth helper ───────────────────────────────────────────────────────
function getAuth(readonly = false) {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  (process.env.GOOGLE_PRIVATE_KEY ?? '')
        .replace(/\\n/g, '\n')   // literal \n → actual newline (from Vercel UI paste)
        .replace(/\r\n/g, '\n'), // normalize Windows line endings
    },
    scopes: [
      readonly
        ? 'https://www.googleapis.com/auth/spreadsheets.readonly'
        : 'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
}

// ─── Shared sheet-name resolver ───────────────────────────────────────────────
async function getSheetName(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  return meta.data.sheets?.[0]?.properties?.title ?? 'Sheet1'
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface OrderTrackingInfo {
  timestamp:     string
  name:          string
  phone:         string
  district:      string
  thana:         string
  quantity:      string
  total:         string
  status:        string
  trackingCode:  string
  consignmentId: string
}

// ─── Append one order row (including Steadfast tracking data) ─────────────────
// trackingCode and consignmentId are auto-filled by /api/place-order
// before this function is called; no manual step required.
export async function appendOrderToSheet(orderData: Record<string, string>) {
  const sheets        = google.sheets({ version: 'v4', auth: getAuth() })
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!
  const sheetName     = await getSheetName(sheets, spreadsheetId)

  // Write headers on first-ever use
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1`,
  })
  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range:            `${sheetName}!A1:P1`,
      valueInputOption: 'USER_ENTERED',
      requestBody:      { values: [HEADERS] },
    })
  }

  const { kg, product, delivery, total } = calcPrices(orderData.quantity)

  const paymentLabel =
    orderData.payment === 'cod'             ? 'ক্যাশ অন ডেলিভারি'
    : orderData.payment === 'bkash_personal'  ? 'বিকাশ পার্সোনাল'
    : orderData.payment === 'bkash_merchant'  ? 'বিকাশ মার্চেন্ট'
    : orderData.payment === 'nagad'           ? 'নগদ'
    : orderData.payment

  const row = [
    new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' }),  // A
    orderData.name,                                                   // B
    orderData.phone,                                                  // C
    orderData.address,                                                // D
    orderData.district,                                               // E
    orderData.thana        || '—',                                    // F
    `${kg} কেজি`,                                                    // G
    `৳${product} (${kg}kg × ৳${PRICE_PER_KG})`,                     // H
    `৳${delivery} (${kg}kg × ৳${DELIVERY_PER_KG})`,                 // I
    `৳${total}`,                                                      // J
    paymentLabel,                                                      // K
    orderData.transactionId || '—',                                   // L
    orderData.note         || '—',                                    // M
    'নতুন অর্ডার',                                                   // N
    orderData.trackingCode  || '',                                    // O ← auto
    orderData.consignmentId || '',                                    // P ← auto
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range:            `${sheetName}!A:P`,
    valueInputOption: 'USER_ENTERED',
    requestBody:      { values: [row] },
  })

  return { success: true, total }
}

// ─── Find the most recent order by phone number ───────────────────────────────
// Used by /api/track-order to look up tracking code from column N.
export async function getOrderByPhone(phone: string): Promise<OrderTrackingInfo | null> {
  const sheets        = google.sheets({ version: 'v4', auth: getAuth(true) })
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!
  const sheetName     = await getSheetName(sheets, spreadsheetId)

  const res  = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:P`,
  })
  const rows = res.data.values ?? []

  // Row 0 is the header; data starts at row 1. Search bottom-up for most recent.
  const normalizedPhone = phone.replace(/\s/g, '')
  for (let i = rows.length - 1; i >= 1; i--) {
    const row      = rows[i]
    const rowPhone = String(row[2] ?? '').replace(/\s/g, '')
    if (rowPhone !== normalizedPhone) continue

    return {
      timestamp:     String(row[0]  ?? ''),
      name:          String(row[1]  ?? ''),
      phone:         String(row[2]  ?? ''),
      district:      String(row[4]  ?? ''),
      thana:         String(row[5]  ?? ''),  // F
      quantity:      String(row[6]  ?? ''),  // G
      total:         String(row[9]  ?? ''),  // J
      status:        String(row[13] ?? 'নতুন অর্ডার'),  // N
      trackingCode:  String(row[14] ?? ''),  // O
      consignmentId: String(row[15] ?? ''),  // P
    }
  }

  return null
}
