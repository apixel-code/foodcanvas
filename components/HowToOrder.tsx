const steps = [
  {
    num: '০১',
    icon: '🖱️',
    title: 'অর্ডার ফর্ম পূরণ করুন',
    desc: 'নিচের ফর্মে নাম, ফোন ও সম্পূর্ণ ঠিকানা দিয়ে অর্ডার দিন',
  },
  {
    num: '০২',
    icon: '📞',
    title: 'কনফার্মেশন কল',
    desc: '২৪ ঘণ্টার মধ্যে আমরা কল করে অর্ডার নিশ্চিত করব',
  },
  {
    num: '০৩',
    icon: '🚚',
    title: 'প্যাকেজিং ও শিপমেন্ট',
    desc: 'বাগান থেকে তাজা আম সংগ্রহ করে প্রিমিয়াম বক্সে ডেলিভারি',
  },
  {
    num: '০৪',
    icon: '🥭',
    title: 'আম গ্রহণ করুন',
    desc: 'দরজায় পৌঁছানো তাজা হিমসাগর আম নিন ও উপভোগ করুন',
  },
]

export default function HowToOrder() {
  return (
    <section className="py-24 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-green mb-5">অর্ডার প্রক্রিয়া</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{ color: 'var(--color-primary)', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
          >
            কীভাবে অর্ডার করবেন?
          </h2>
          <p className="text-stone-500 text-lg">মাত্র ৪টি সহজ ধাপে তাজা আম পান</p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">

          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(to right, var(--color-primary-pale), var(--color-primary-pale))' }}
          />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">

              {/* Step circle */}
              <div className="relative z-10 mb-6">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    boxShadow: '0 8px 28px rgba(15,61,32,0.3)',
                  }}
                >
                  <span className="text-3xl">{step.icon}</span>
                </div>
                {/* Step number badge */}
                <span
                  className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'var(--color-accent)', boxShadow: '0 2px 8px rgba(232,114,30,0.4)' }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Step number text */}
              <span
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-gold)' }}
              >
                {step.num}
              </span>

              <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-primary)' }}>
                {step.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#order"
            className="btn-accent inline-flex items-center gap-2.5 font-bold px-10 py-4 rounded-full text-lg"
            style={{ boxShadow: '0 8px 32px rgba(232,114,30,0.4)' }}
          >
            🛒 এখনই অর্ডার করুন
          </a>
        </div>
      </div>
    </section>
  )
}
