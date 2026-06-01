'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'আম কতদিনে ডেলিভারি পাব?',
    a: 'ঢাকায় ২-৩ কার্যদিবস, অন্য জেলায় ৩-৫ কার্যদিবসের মধ্যে পৌঁছানো হয়।',
  },
  {
    q: 'আম কি কাঁচা নাকি পাকা আসবে?',
    a: 'অর্ডারের সময় উল্লেখ করুন। সাধারণত আধা পাকা অবস্থায় পাঠানো হয় যাতে পৌঁছানোর পর পাকলে সর্বোচ্চ মান থাকে।',
  },
  {
    q: 'আম নষ্ট হলে কী করব?',
    a: 'ডেলিভারির ২৪ ঘণ্টার মধ্যে ছবি তুলে আমাদের WhatsApp-এ পাঠান। আমরা রিপ্লেসমেন্ট বা রিফান্ড দেব।',
  },
  {
    q: 'বিকাশে পেমেন্ট কোন নম্বরে করব?',
    a: 'অর্ডার কনফার্মেশন কলের সময় বিকাশ/নগদ নম্বর জানানো হবে।',
  },
  {
    q: 'ন্যূনতম কত কেজি অর্ডার করা যাবে?',
    a: 'সর্বনিম্ন ১ কেজি অর্ডার করা যাবে।',
  },
  {
    q: 'কি কি জেলায় ডেলিভারি দেওয়া হয়?',
    a: 'বাংলাদেশের সব ৬৪ জেলায় ডেলিভারি দেওয়া হয়।',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
            সাধারণ প্রশ্নাবলী
          </h2>
          <p className="text-stone-600">আপনার মনের প্রশ্নের উত্তর এখানে</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all"
              style={{
                border: `1.5px solid ${open === i ? 'var(--color-primary-pale)' : 'var(--color-border)'}`,
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span
                  className="text-xl font-bold transition-transform duration-200 ml-4 flex-shrink-0"
                  style={{
                    color: 'var(--color-primary)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>

              {open === i && (
                <div
                  className="px-6 pb-5 text-stone-600 leading-relaxed"
                  style={{ background: 'var(--color-mint)' }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
