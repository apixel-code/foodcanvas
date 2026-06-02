'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const bgImages = [
  { src: 'https://images.unsplash.com/photo-1685478677352-43868751fb8e?w=1920&h=1080&fit=crop&q=85&auto=format', alt: 'গাছে ঝুলন্ত তাজা কাঁচা আম' },
  { src: 'https://images.unsplash.com/photo-1501746877-14782df58970?w=1920&h=1080&fit=crop&q=85&auto=format', alt: 'পাকা হিমসাগর আমের স্তূপ' },
  { src: 'https://images.unsplash.com/photo-1672709904166-c551e5051eb2?w=1920&h=1080&fit=crop&q=85&auto=format', alt: 'গাছের ডালে থোকা থোকা কাঁচা আম' },
  { src: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=1920&h=1080&fit=crop&q=85&auto=format', alt: 'রাজশাহীর পাকা হলুদ আম' },
  { src: 'https://images.unsplash.com/photo-1630552358140-c50ab1c5f8be?w=1920&h=1080&fit=crop&q=85&auto=format', alt: 'বাজারের ঝুড়িতে কাঁচা আম' },
  { src: 'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=1920&h=1080&fit=crop&q=85&auto=format', alt: 'ট্রেতে সাজানো পাকা আম' },
]

const stats = [
  { num: '৫০০+', label: 'সন্তুষ্ট গ্রাহক' },
  { num: '১০০%', label: 'কেমিক্যাল মুক্ত' },
  { num: '৬৪ জেলা', label: 'ডেলিভারি' },
  { num: '৪.৯★', label: 'গড় রেটিং' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Background Slideshow ── */}
      {bgImages.map((img, i) => (
        <div
          key={img.src}
          className="hero-bg-slide absolute inset-0"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Overlay layers ── */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.72) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)' }} />

      {/* ── Main Content (Centered) ── */}
      <div
        className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto flex flex-col items-center"
        style={{ paddingTop: '88px', paddingBottom: '120px' }}
      >

        {/* Premium badge */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 text-sm font-semibold anim-fade-down"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(201,162,39,0.45)',
            color: '#fcd34d',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s infinite' }}
          />
          ১০০% কেমিক্যাল মুক্ত &nbsp;·&nbsp; সরাসরি রাজশাহীর বাগান থেকে
        </div>

        {/* Main headline */}
        <h1
          className="font-bold text-white leading-tight mb-5 anim-fade-up anim-d200"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 5.25rem)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          রাজশাহীর সেরা
          <br />
          <span style={{ color: '#fbbf24' }}>হিমসাগর আম</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-white/70 mb-10 anim-fade-up anim-d300"
          style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)', fontWeight: 300, letterSpacing: '0.03em' }}
        >
          Food Canvas — তাজা, মিষ্টি, বিশ্বস্ত · আপনার দরজায় পৌঁছে দেই
        </p>

        {/* Price badge */}
        <div
          className="inline-flex flex-col items-center rounded-2xl px-10 py-5 mb-10 anim-scale-in anim-d400"
          style={{
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(220,38,38,0.4)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <span className="text-white/55 text-sm mb-1">এই মৌসুমে বিশেষ মূল্য</span>
          <span className="text-white font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', lineHeight: 1.1 }}>
            মাত্র <span style={{ color: '#f87171' }}>৯৯ টাকা</span>/কেজি
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest mt-2 px-3 py-1 rounded-full"
            style={{ color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)' }}
          >
            ⚡ সীমিত স্টক — এখনই সুযোগ নিন
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 anim-fade-up anim-d500">
          <a
            href="#order"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-full font-bold text-white text-lg transition-all hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #e8721e, #c9570e)',
              boxShadow: '0 8px 32px rgba(232,114,30,0.5)',
            }}
          >
            🛒 এখনই অর্ডার করুন
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-full font-bold text-lg text-white transition-all hover:-translate-y-1 hover:bg-white/10"
            style={{
              border: '2px solid rgba(255,255,255,0.38)',
              backdropFilter: 'blur(8px)',
            }}
          >
            🥭 প্যাকেজ দেখুন
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 anim-fade-up anim-d600">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-bold" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: '#fbbf24' }}>
                {s.num}
              </p>
              <p className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dot indicators (right side) ── */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-2.5">
        {bgImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-500 block cursor-pointer"
            style={{
              width: 5,
              height: i === current ? 28 : 5,
              background: i === current ? '#fbbf24' : 'rgba(255,255,255,0.28)',
            }}
            aria-label={`ছবি ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 select-none">
        <span className="text-white/35 uppercase tracking-widest" style={{ fontSize: '0.6rem' }}>
          স্ক্রোল করুন
        </span>
        <div className="relative w-px h-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="absolute inset-x-0 top-0 h-full scroll-line" style={{ background: 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>

      {/* ── Bottom stats bar overlay ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 hidden lg:flex items-center justify-center gap-10 py-4 px-6"
        style={{
          background: 'rgba(10,31,14,0.75)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(201,162,39,0.18)',
        }}
      >
        {[
          { icon: '🌿', text: '১০০% কেমিক্যাল মুক্ত' },
          { icon: '🚚', text: 'সারাদেশে ডেলিভারি' },
          { icon: '📦', text: 'প্রিমিয়াম প্যাকেজিং' },
          { icon: '✅', text: 'মানের নিশ্চয়তা' },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
