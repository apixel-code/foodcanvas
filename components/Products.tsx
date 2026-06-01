'use client'
import Image from 'next/image'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: '১ কেজি প্যাকেজ',
    images: [
      'https://images.unsplash.com/photo-1688492596644-b0e68aa86477?w=800&h=600&fit=crop&q=85&auto=format',
      'https://images.unsplash.com/photo-1685478676925-05548b7bc317?w=800&h=600&fit=crop&q=85&auto=format',
    ],
    badge: 'ট্রায়াল প্যাক',
    badgeStyle: { background: 'var(--color-primary-pale)', color: 'var(--color-primary)' },
    weight: '১ কেজি',
    mangoes: '৫–৭টি আম',
    price: '১৪০ টাকা/কেজি',
    delivery: '+ ডেলিভারি চার্জ',
    features: ['তাজা হিমসাগর', 'প্রিমিয়াম প্যাক', 'কেমিক্যাল মুক্ত'],
    popular: false,
    cta: 'অর্ডার করুন',
  },
  {
    id: 2,
    name: '৫ কেজি প্যাকেজ',
    images: [
      'https://images.unsplash.com/photo-1630552358140-c50ab1c5f8be?w=800&h=600&fit=crop&q=85&auto=format',
      'https://images.unsplash.com/photo-1672709904166-c551e5051eb2?w=800&h=600&fit=crop&q=85&auto=format',
    ],
    badge: '⭐ সবচেয়ে জনপ্রিয়',
    badgeStyle: { background: '#e8721e', color: '#fff' },
    weight: '৫ কেজি',
    mangoes: '২৫–৩৫টি আম',
    price: '১৪০ টাকা/কেজি',
    delivery: 'ঢাকায় সাশ্রয়ী ডেলিভারি',
    features: ['সাশ্রয়ী প্যাক', 'পরিবারের জন্য আদর্শ', 'বিশেষ ছাড়'],
    popular: true,
    cta: '⭐ এখনই অর্ডার করুন',
  },
  {
    id: 3,
    name: '১০ কেজি প্যাকেজ',
    images: [
      'https://images.unsplash.com/photo-1680008702821-e1b598db30f3?w=800&h=600&fit=crop&q=85&auto=format',
      'https://images.unsplash.com/photo-1685478677352-43868751fb8e?w=800&h=600&fit=crop&q=85&auto=format',
    ],
    badge: '💎 বেস্ট ভ্যালু',
    badgeStyle: { background: 'var(--color-primary)', color: '#fff' },
    weight: '১০ কেজি',
    mangoes: '৫০–৭০টি আম',
    price: '১৪০ টাকা/কেজি',
    delivery: 'সারাদেশে ডেলিভারি',
    features: ['সর্বোচ্চ সাশ্রয়', 'অফিস/গিফট প্যাক', 'বিশেষ ডিসকাউন্ট'],
    popular: false,
    cta: 'অর্ডার করুন',
  },
]

function ProductCard({ p }: { p: (typeof products)[0] }) {
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <div
      className="product-card-hover rounded-3xl overflow-hidden bg-white flex flex-col"
      style={{
        boxShadow: p.popular
          ? '0 12px 48px rgba(232,114,30,0.22)'
          : '0 4px 24px rgba(0,0,0,0.08)',
        border: p.popular ? '2px solid #e8721e' : '1.5px solid #ede9e4',
      }}
    >
      {/* Popular glow strip */}
      {p.popular && (
        <div
          className="text-center py-2 text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: 'linear-gradient(90deg, #e8721e, #c9570e)' }}
        >
          🔥 সর্বোচ্চ চাহিদার প্যাকেজ
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-stone-100">
        <Image
          src={p.images[imgIdx]}
          alt={`Food Canvas হিমসাগর আম ${p.name}`}
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm"
          style={p.badgeStyle}
        >
          {p.badge}
        </span>
        {/* Thumbnail strip */}
        {p.images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 px-3 py-2" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }}>
            {p.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === imgIdx ? 20 : 7,
                  height: 7,
                  background: i === imgIdx ? '#fbbf24' : 'rgba(255,255,255,0.5)',
                }}
                aria-label={`ছবি ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
            {p.name}
          </h3>
          <p className="text-stone-400 text-sm">{p.weight} &nbsp;·&nbsp; {p.mangoes}</p>
        </div>

        <div>
          <span className="text-2xl font-bold" style={{ color: '#dc2626' }}>
            {p.price}
          </span>
          <p className="text-xs font-semibold mt-1" style={{ color: 'var(--color-primary)' }}>
            {p.delivery}
          </p>
        </div>

        <ul className="space-y-2 flex-1">
          {p.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-stone-600">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: 'var(--color-primary-pale)', color: 'var(--color-primary)' }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        <a
          href="#order"
          className={`block text-center font-bold py-3.5 rounded-xl text-white text-sm mt-auto transition-all hover:-translate-y-0.5 ${p.popular ? 'btn-accent' : 'btn-primary'}`}
          style={{
            boxShadow: p.popular
              ? '0 6px 20px rgba(232,114,30,0.35)'
              : '0 6px 20px rgba(15,61,32,0.25)',
          }}
        >
          {p.cta}
        </a>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <section id="products" className="py-24 px-4" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge-green mb-5">আমাদের প্যাকেজ</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{ color: 'var(--color-primary)', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
          >
            আপনার পছন্দের প্যাকেজ
            <br />
            <span style={{ color: 'var(--color-accent)' }}>বেছে নিন</span>
          </h2>
          <p className="text-stone-500 text-lg">
            সরাসরি রাজশাহীর বাগান থেকে — তাজা হিমসাগর আম
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-stone-400 text-sm mt-8">
          * সব প্যাকেজেই ১৪০ টাকা/কেজি হারে মূল্য।&nbsp;
          ডেলিভারি চার্জ জেলাভেদে আলাদা। অর্ডার করার সময় জানানো হবে।
        </p>
      </div>
    </section>
  )
}
