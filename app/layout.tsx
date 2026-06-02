import type { Metadata } from 'next'
import { Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import FloatingButtons from '@/components/FloatingButtons'

const hind = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Food Canvas | রাজশাহীর সেরা আম সরাসরি আপনার দরজায়',
  description:
    'Food Canvas — রাজশাহীর সরাসরি বাগান থেকে সংগ্রহ করা তাজা হিমসাগর আম। ১০০% কেমিক্যাল মুক্ত, প্রিমিয়াম প্যাকেজিং। এখনই অর্ডার করুন।',
  keywords: ['Food Canvas', 'হিমসাগর আম', 'রাজশাহীর আম', 'তাজা আম', 'আম অনলাইন অর্ডার', 'কেমিক্যাল মুক্ত আম'],
  openGraph: {
    title: 'Food Canvas — রাজশাহী থেকে সরাসরি',
    description: 'Food Canvas — তাজা, মিষ্টি, কেমিক্যাল মুক্ত হিমসাগর আম। এখনই অর্ডার করুন।',
    type: 'website',
    locale: 'bn_BD',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={hind.variable}>
      <body className="min-h-full antialiased" style={{ fontFamily: 'var(--font-bangla)' }}>
        {children}
        <FloatingButtons />
      </body>
    </html>
  )
}
