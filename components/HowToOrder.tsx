const steps = [
  {
    num: '১',
    icon: '🖱️',
    title: 'অর্ডার ফর্ম পূরণ করুন',
    desc: 'নিচের ফর্মে নাম, ফোন নম্বর ও সম্পূর্ণ ঠিকানা দিন',
  },
  {
    num: '২',
    icon: '📞',
    title: 'কনফার্মেশন কল',
    desc: 'আমরা ২৪ ঘণ্টার মধ্যে কল করে অর্ডার নিশ্চিত করব',
  },
  {
    num: '৩',
    icon: '🚚',
    title: 'প্যাকেজিং ও ডেলিভারি',
    desc: 'তাজা আম বাগান থেকে সংগ্রহ করে প্রিমিয়াম বক্সে পাঠানো হবে',
  },
  {
    num: '৪',
    icon: '🥭',
    title: 'আম গ্রহণ করুন',
    desc: 'দরজায় পৌঁছানো আম নিরাপদে বুঝে নিন ও উপভোগ করুন',
  },
]

export default function HowToOrder() {
  return (
    <section className="py-16 px-4" style={{ background: 'rgba(220,252,231,0.3)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
            কীভাবে অর্ডার করবেন?
          </h2>
          <p className="text-stone-600 text-lg">মাত্র ৪টি সহজ ধাপে অর্ডার করুন</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: 'var(--color-primary-pale)' }}
          />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              {/* Step icon circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold mb-4 relative z-10 shadow-lg"
                style={{ background: 'var(--color-primary)' }}
              >
                <span className="text-3xl leading-none">{step.icon}</span>
              </div>
              <span
                className="absolute top-0 right-4 md:right-auto w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'var(--color-accent)' }}
              >
                {step.num}
              </span>

              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-primary)' }}>
                {step.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#order"
            className="btn-accent inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-lg"
            style={{ boxShadow: '0 6px 24px rgba(249,115,22,0.3)' }}
          >
            🛒 এখনই অর্ডার করুন
          </a>
        </div>
      </div>
    </section>
  )
}
