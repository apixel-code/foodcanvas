const reviews = [
  {
    name: 'রহিমা বেগম',
    location: 'মিরপুর, ঢাকা',
    rating: 5,
    text: 'সত্যিই অসাধারণ আম! বাজারের আমের সাথে তুলনাই হয় না। একদম তাজা এসেছে, গন্ধটাও অনেক সুন্দর। পরের বার ১০ কেজি অর্ডার করব।',
  },
  {
    name: 'করিম সাহেব',
    location: 'উত্তরা, ঢাকা',
    rating: 5,
    text: 'অফিসের সবার জন্য ১০ কেজি নিয়েছিলাম। সবাই খুব পছন্দ করেছে। প্যাকেজিং দারুণ ছিল, একটা আমও নষ্ট হয়নি।',
  },
  {
    name: 'সুমাইয়া আক্তার',
    location: 'চট্টগ্রাম',
    rating: 5,
    text: 'চট্টগ্রামে ডেলিভারি দিয়েছে মাত্র ২ দিনে। আম এত মিষ্টি এবং রসালো ছিল! পরিবারের সবাই খুশি। ধন্যবাদ।',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 px-4" style={{ background: 'var(--color-mint)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
            আমাদের খুশি গ্রাহকরা কী বলছেন
          </h2>
          <p className="text-stone-600 text-lg">হাজারো পরিবারের বিশ্বস্ত পছন্দ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6"
              style={{
                borderLeft: '4px solid var(--color-primary)',
                boxShadow: '0 4px 16px rgba(26,92,42,0.08)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, si) => (
                  <span key={si} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>

              {/* Review text */}
              <p className="text-stone-700 leading-relaxed mb-5 text-sm">"{r.text}"</p>

              {/* Customer */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-stone-800">{r.name}</p>
                  <p className="text-xs text-stone-500">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div
          className="mt-10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-8 text-white text-center"
          style={{ background: 'var(--color-primary)' }}
        >
          {[
            { num: '৫০০+', label: 'সন্তুষ্ট গ্রাহক' },
            { num: '১০০%', label: 'কেমিক্যাল মুক্ত' },
            { num: '৬৪', label: 'জেলায় ডেলিভারি' },
            { num: '৪.৯/৫', label: 'গড় রেটিং' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold">{stat.num}</p>
              <p className="text-sm opacity-80 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
