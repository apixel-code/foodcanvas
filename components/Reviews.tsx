const reviews = [
  {
    name: 'রহিমা বেগম',
    location: 'মিরপুর, ঢাকা',
    rating: 5,
    text: 'সত্যিই অসাধারণ আম! বাজারের আমের সাথে তুলনাই হয় না। একদম তাজা এসেছে, গন্ধটাও অনেক সুন্দর। পরের বার ১০ কেজি অর্ডার করব।',
    initial: 'র',
  },
  {
    name: 'করিম সাহেব',
    location: 'উত্তরা, ঢাকা',
    rating: 5,
    text: 'অফিসের সবার জন্য ১০ কেজি নিয়েছিলাম। সবাই খুব পছন্দ করেছে। প্যাকেজিং দারুণ ছিল, একটা আমও নষ্ট হয়নি।',
    initial: 'ক',
  },
  {
    name: 'সুমাইয়া আক্তার',
    location: 'চট্টগ্রাম',
    rating: 5,
    text: 'চট্টগ্রামে ডেলিভারি দিয়েছে মাত্র ২ দিনে। আম এত মিষ্টি এবং রসালো ছিল! পরিবারের সবাই খুশি। ধন্যবাদ।',
    initial: 'সু',
  },
]

const stats = [
  { num: '৫০০+', label: 'সন্তুষ্ট গ্রাহক' },
  { num: '১০০%', label: 'কেমিক্যাল মুক্ত' },
  { num: '৬৪', label: 'জেলায় ডেলিভারি' },
  { num: '৪.৯/৫', label: 'গড় রেটিং' },
]

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 px-4" style={{ background: '#0a1f0e' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-gold mb-5">গ্রাহক রিভিউ</span>
          <h2
            className="font-bold text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
          >
            আমাদের গ্রাহকরা
            <br />
            <span style={{ color: '#fbbf24' }}>কী বলছেন?</span>
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.42)' }}>
            হাজারো পরিবারের বিশ্বস্ত পছন্দ — Food Canvas
          </p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="review-card rounded-2xl p-7 flex flex-col gap-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              {/* Quote mark */}
              <span
                className="text-5xl font-serif leading-none"
                style={{ color: 'rgba(201,162,39,0.3)', lineHeight: 0.8 }}
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, si) => (
                  <span key={si} style={{ color: '#fbbf24', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.62)' }}>
                {r.text}
              </p>

              {/* Customer */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white' }}
                >
                  {r.initial}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{r.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{r.location}</p>
                </div>
                <span
                  className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80' }}
                >
                  ✓ যাচাইকৃত
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.05))',
            border: '1px solid rgba(201,162,39,0.22)',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-bold mb-1" style={{ color: '#fbbf24', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                {s.num}
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
