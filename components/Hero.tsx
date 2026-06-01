import Image from 'next/image'

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center pt-20 pb-12 px-4"
      style={{ background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-mint) 100%)' }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — Content */}
        <div className="space-y-6">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: 'var(--color-primary-pale)', color: 'var(--color-primary)' }}
          >
            🌿 ১০০% কেমিক্যাল মুক্ত
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--color-primary)' }}>
            রাজশাহীর সেরা
            <br />
            <span className="text-5xl md:text-6xl">Food Canvas</span>
          </h1>

          <p className="text-lg text-stone-600">
            সরাসরি বাগান থেকে আপনার দরজায় — তাজা, মিষ্টি, বিশ্বস্ত
          </p>

          {/* Price */}
          <div
            className="inline-block rounded-2xl px-6 py-4"
            style={{ background: 'var(--color-alert-light)', border: '2px solid #fca5a5' }}
          >
            <p className="text-sm text-stone-600 mb-1">বিশেষ অফার মূল্য</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--color-alert)' }}>
              মাত্র ১৪০ টাকা/কেজি
            </p>
          </div>

          {/* Bullets */}
          <ul className="grid grid-cols-2 gap-3">
            {['কেমিক্যাল মুক্ত', 'প্রিমিয়াম প্যাকেজিং', 'হোম ডেলিভারি সারাদেশ', 'সীমিত স্টক'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-stone-700 font-medium">
                  <span className="text-green-600 font-bold">✓</span> {item}
                </li>
              )
            )}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#order"
              className="btn-accent flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-lg"
              style={{ boxShadow: '0 6px 24px rgba(249,115,22,0.35)' }}
            >
              🛒 এখনই অর্ডার করুন
            </a>
            <a
              href="#products"
              className="btn-outline-primary flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-lg"
            >
              🥭 পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=600"
              alt="Food Canvas — রাজশাহীর তাজা হিমসাগর আম"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Floating badge */}
          <div
            className="absolute -bottom-4 -left-4 md:bottom-6 md:left-6 rounded-2xl px-4 py-3 shadow-lg"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            <p className="text-xs font-medium opacity-80">এই মৌসুমে</p>
            <p className="text-lg font-bold">সীমিত স্টক 🔥</p>
          </div>
        </div>
      </div>
    </section>
  )
}
