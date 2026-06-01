'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// ✅ তোমার ছবিগুলো public/images/ ফোল্ডারে রাখো এই নামে:
// hero-1.jpg, hero-2.jpg, hero-3.jpg, hero-4.jpg, hero-5.jpg ...
const heroImages = [
  { src: '/images/hero-1.jpg', alt: 'Food Canvas — তাজা হিমসাগর আম' },
  { src: '/images/hero-2.jpg', alt: 'Food Canvas — রাজশাহীর সেরা আম' },
  { src: '/images/hero-3.jpg', alt: 'Food Canvas — কেমিক্যাল মুক্ত আম' },
  { src: '/images/hero-4.jpg', alt: 'Food Canvas — প্রিমিয়াম প্যাকেজিং' },
  { src: '/images/hero-5.jpg', alt: 'Food Canvas — সরাসরি বাগান থেকে' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length)
        setFade(true)
      }, 300)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    setFade(false)
    setTimeout(() => { setCurrent(i); setFade(true) }, 200)
  }

  return (
    <section
      className="min-h-screen flex items-center pt-20 pb-12 px-4"
      style={{ background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-mint) 100%)' }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — Content */}
        <div className="space-y-6">
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: 'var(--color-primary-pale)', color: 'var(--color-primary)' }}
          >
            🌿 ১০০% কেমিক্যাল মুক্ত
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--color-primary)' }}>
            রাজশাহীর সেরা
            <br />
            <span className="text-5xl md:text-6xl">Food Canvas</span>
          </h1>

          <p className="text-lg text-stone-600">
            সরাসরি বাগান থেকে আপনার দরজায় — তাজা, মিষ্টি, বিশ্বস্ত
          </p>

          <div
            className="inline-block rounded-2xl px-6 py-4"
            style={{ background: 'var(--color-alert-light)', border: '2px solid #fca5a5' }}
          >
            <p className="text-sm text-stone-600 mb-1">বিশেষ অফার মূল্য</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--color-alert)' }}>
              মাত্র ১৪০ টাকা/কেজি
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3">
            {['কেমিক্যাল মুক্ত', 'প্রিমিয়াম প্যাকেজিং', 'হোম ডেলিভারি সারাদেশ', 'সীমিত স্টক'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-stone-700 font-medium">
                <span className="text-green-600 font-bold">✓</span> {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#order"
              className="btn-accent flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-lg"
              style={{ boxShadow: '0 6px 24px rgba(249,115,22,0.35)' }}
            >
              🛒 এখনই অর্ডার করুন
            </a>
            <a href="#products" className="btn-outline-primary flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-lg">
              🥭 পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Right — Slideshow */}
        <div className="relative flex flex-col items-center gap-4">

          {/* Image container */}
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              key={current}
              src={heroImages[current].src}
              alt={heroImages[current].alt}
              fill
              className="object-cover"
              style={{
                opacity: fade ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
              priority={current === 0}
            />

            {/* Floating badge */}
            <div
              className="absolute bottom-4 left-4 rounded-2xl px-4 py-3 shadow-lg"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              <p className="text-xs font-medium opacity-80">এই মৌসুমে</p>
              <p className="text-lg font-bold">সীমিত স্টক 🔥</p>
            </div>

            {/* Prev/Next arrows */}
            <button
              onClick={() => goTo((current - 1 + heroImages.length) % heroImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow text-stone-700 font-bold text-lg transition-all"
              aria-label="আগের ছবি"
            >
              ‹
            </button>
            <button
              onClick={() => goTo((current + 1) % heroImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow text-stone-700 font-bold text-lg transition-all"
              aria-label="পরের ছবি"
            >
              ›
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  background: i === current ? 'var(--color-primary)' : '#d1d5db',
                }}
                aria-label={`ছবি ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
