'use client'
import { useState } from 'react'
import { useInView } from '@/hooks/useInView'

const faqs = [
  { q: 'আম কতদিনে ডেলিভারি পাব?',            a: 'ঢাকায় ২–৩ কার্যদিবস, অন্য জেলায় ৩–৫ কার্যদিবসের মধ্যে পৌঁছানো হয়।' },
  { q: 'আম কি কাঁচা নাকি পাকা আসবে?',         a: 'অর্ডারের সময় উল্লেখ করুন। সাধারণত আধা পাকা পাঠানো হয় যাতে পৌঁছানোর পর পাকলে সর্বোচ্চ মান থাকে।' },
  { q: 'আম নষ্ট হলে কী করব?',                a: 'ডেলিভারির ২৪ ঘণ্টার মধ্যে ছবি তুলে WhatsApp-এ পাঠান। আমরা রিপ্লেসমেন্ট বা সম্পূর্ণ রিফান্ড দেব।' },
  { q: 'বিকাশে পেমেন্ট কোন নম্বরে করব?',     a: 'অর্ডার কনফার্মেশন কলের সময় বিকাশ/নগদ নম্বর জানানো হবে।' },
  { q: 'ন্যূনতম কত কেজি অর্ডার করা যাবে?',   a: 'সর্বনিম্ন ১ কেজি অর্ডার করা যাবে।' },
  { q: 'কি কি জেলায় ডেলিভারি দেওয়া হয়?',   a: 'বাংলাদেশের সব ৬৪ জেলায় ডেলিভারি দেওয়া হয়।' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref: headerRef, inView: headerVisible } = useInView()
  const { ref: listRef,   inView: listVisible   } = useInView()
  const { ref: ctaRef,    inView: ctaVisible    } = useInView()

  return (
    <section className="py-24 px-4" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className={`text-center mb-12 reveal-parent ${headerVisible ? 'is-visible' : ''}`}>
          <span className="badge-green mb-5 anim-rotate reveal-d-1">সাধারণ প্রশ্ন</span>
          <h2
            className="font-bold mb-3 anim-blur reveal-d-2"
            style={{ color: 'var(--color-primary)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
          >
            আপনার মনের প্রশ্ন
          </h2>
          <p className="text-stone-500 anim-up reveal-d-3">যেকোনো প্রশ্নের উত্তর এখানে পাবেন</p>
        </div>

        {/* Accordion — slides in from right */}
        <div ref={listRef} className={`space-y-3 reveal-parent ${listVisible ? 'is-visible' : ''}`}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={`faq-item anim-right reveal-d-${i + 1}`}>
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    background: 'white',
                    border: isOpen ? '1.5px solid var(--color-primary-pale)' : '1.5px solid #ede9e4',
                    boxShadow: isOpen ? '0 4px 20px rgba(15,61,32,0.08)' : 'none',
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span
                      className="font-semibold text-sm pr-4"
                      style={{ color: isOpen ? 'var(--color-primary)' : '#1c1917' }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300"
                      style={{
                        background: isOpen ? 'var(--color-primary)' : 'var(--color-primary-pale)',
                        color: isOpen ? 'white' : 'var(--color-primary)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div className={`faq-answer ${isOpen ? 'faq-open' : ''}`}>
                    <div
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: '#57534e', background: 'var(--color-mint)' }}
                    >
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className={`mt-10 reveal-parent ${ctaVisible ? 'is-visible' : ''}`}>
          <div
            className="rounded-2xl p-6 text-center anim-zoom"
            style={{ background: 'var(--color-primary-pale)', border: '1px solid rgba(15,61,32,0.1)' }}
          >
            <p className="text-stone-700 text-sm mb-3">আরও কোনো প্রশ্ন আছে? সরাসরি যোগাযোগ করুন</p>
            <a
              href="https://wa.me/8801972312458"
              className="btn-whatsapp inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-full text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp-এ জিজ্ঞেস করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
