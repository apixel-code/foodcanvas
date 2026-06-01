const features = [
  { icon: '🌿', title: 'কেমিক্যাল মুক্ত', desc: 'কোনো কৃত্রিম পাকানো নেই — প্রাকৃতিকভাবে পাকা' },
  { icon: '📦', title: 'প্রিমিয়াম প্যাকেজিং', desc: 'নিরাপদ বক্সে ডেলিভারি, একটি আমও নষ্ট হবে না' },
  { icon: '🚚', title: 'সারাদেশে ডেলিভারি', desc: 'ঢাকাসহ বাংলাদেশের সব ৬৪ জেলায়' },
  { icon: '🌳', title: 'সরাসরি বাগান থেকে', desc: 'মধ্যস্থতাকারী নেই — বাগান থেকে সরাসরি আপনার কাছে' },
  { icon: '✅', title: 'মানের নিশ্চয়তা', desc: 'সন্তুষ্ট না হলে সম্পূর্ণ ফেরত বা রিপ্লেসমেন্ট' },
  { icon: '📞', title: 'সার্বক্ষণিক সাপোর্ট', desc: 'অর্ডার ট্র্যাকিং ও কাস্টমার কেয়ার সবসময়' },
]

export default function WhyUs() {
  return (
    <section className="py-16 px-4" style={{ background: 'var(--color-mint)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
            কেন Food Canvas এর আম এত স্পেশাল?
          </h2>
          <p className="text-stone-600 text-lg">রাজশাহীর সেরা বাগান থেকে সরাসরি আপনার কাছে</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-hover bg-white rounded-2xl p-6"
              style={{
                border: '1.5px solid var(--color-primary-pale)',
                boxShadow: '0 2px 12px rgba(26,92,42,0.06)',
              }}
            >
              <span className="text-4xl mb-3 block">{f.icon}</span>
              <h3 className="font-bold text-lg mb-1.5" style={{ color: 'var(--color-primary)' }}>
                {f.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
