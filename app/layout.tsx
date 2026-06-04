import type { Metadata } from 'next'
import { Noto_Sans_Bengali, Hind_Siliguri } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import FloatingButtons from '@/components/FloatingButtons'

const noto = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla',
  display: 'swap',
})

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
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
    images: [
      {
        url: '/images/For_OpenGraph.png',
        width: 2940,
        height: 1602,
        alt: 'Food Canvas — রাজশাহীর সেরা হিমসাগর আম',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Canvas — রাজশাহী থেকে সরাসরি',
    description: 'Food Canvas — তাজা, মিষ্টি, কেমিক্যাল মুক্ত হিমসাগর আম। এখনই অর্ডার করুন।',
    images: ['/images/For_OpenGraph.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${noto.variable} ${hind.variable}`}>
      <body className="min-h-full antialiased" style={{ fontFamily: 'var(--font-bangla)' }}>
        {children}
        <FloatingButtons />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1346525930759526');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1346525930759526&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
