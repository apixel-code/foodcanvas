const features = [
  {
    icon: '🌿',
    title: 'কেমিক্যাল মুক্ত',
    desc: 'কোনো কৃত্রিম পাকানো নেই — প্রাকৃতিকভাবে পাকা, তাজা ও স্বাস্থ্যকর আম',
  },
  {
    icon: '📦',
    title: 'প্রিমিয়াম প্যাকেজিং',
    desc: 'বিশেষ বক্সে সুরক্ষিত ডেলিভারি, একটি আমও ক্ষতিগ্রস্ত হবে না',
  },
  {
    icon: '🚚',
    title: 'সারাদেশে ডেলিভারি',
    desc: 'ঢাকাসহ বাংলাদেশের সব ৬৪ জেলায় দ্রুত ও নির্ভরযোগ্য ডেলিভারি',
  },
  {
    icon: '🌳',
    title: 'সরাসরি বাগান থেকে',
    desc: 'কোনো মধ্যস্থতাকারী নেই — রাজশাহীর বাগান থেকে সরাসরি আপনার কাছে',
  },
  {
    icon: '✅',
    title: 'মানের নিশ্চয়তা',
    desc: 'সন্তুষ্ট না হলে সম্পূর্ণ রিফান্ড বা রিপ্লেসমেন্ট — কোনো প্রশ্ন নেই',
  },
  {
    icon: '📞',
    title: 'সার্বক্ষণিক সাপোর্ট',
    desc: 'অর্ডার ট্র্যাকিং থেকে ডেলিভারি পর্যন্ত আমরা সবসময় আপনার পাশে',
  },
]

export default function WhyUs() {
  return (
    <section className="py-24 px-4" style={{ background: '#0a1f0e' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="badge-gold mb-5">কেন আমরা আলাদা</span>
          <h2
            className="font-bold text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
          >
            কেন Food Canvas-এর আম
            <br />
            <span style={{ color: '#fbbf24' }}>এত স্পেশাল?</span>
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
            রাজশাহীর সেরা বাগান থেকে সরাসরি — বিশ্বাস, মান ও তাজা স্বাদ একসাথে
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="why-card rounded-2xl p-7">
              <div className="why-icon w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg text-white mb-2.5">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-14 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.05))',
            border: '1px solid rgba(201,162,39,0.22)',
          }}
        >
          <div>
            <p className="text-white font-bold text-xl mb-1">আজই অর্ডার করুন, তাজা আম পান</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              সীমিত স্টক — মৌসুমী আম শেষ হওয়ার আগেই অর্ডার দিন
            </p>
          </div>
          <a
            href="#order"
            className="btn-accent shrink-0 inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-base"
            style={{ boxShadow: '0 8px 28px rgba(232,114,30,0.4)' }}
          >
            🛒 এখনই অর্ডার করুন
          </a>
        </div>
      </div>
    </section>
  )
}
