'use client'
import Image from 'next/image'
import { useState } from 'react'

// ✅ তোমার ছবিগুলো public/images/ ফোল্ডারে রাখো এই নামে:
// product-1.jpg → ১ কেজি প্যাকেজ
// product-2.jpg → ৫ কেজি প্যাকেজ
// product-3.jpg → ১০ কেজি প্যাকেজ
// product-detail-1.jpg, product-detail-2.jpg, ... → gallery ছবি
const products = [
  {
    id: 1,
    name: '১ কেজি প্যাকেজ',
    images: ['/images/product-1.jpg', '/images/hero-1.jpg', '/images/hero-2.jpg'],
    badge: 'ট্রায়াল প্যাক',
    badgeBg: 'var(--color-primary-pale)',
    badgeColor: 'var(--color-primary)',
    weight: '১ কেজি',
    mangoes: '৫–৭টি আম',
    price: '১৪০ টাকা/কেজি',
    delivery: '+ ডেলিভারি চার্জ',
    features: ['তাজা হিমসাগর', 'প্রিমিয়াম প্যাক', 'কেমিক্যাল মুক্ত'],
    popular: false,
  },
  {
    id: 2,
    name: '৫ কেজি প্যাকেজ',
    images: ['/images/product-2.jpg', '/images/hero-3.jpg', '/images/hero-4.jpg'],
    badge: '⭐ সবচেয়ে জনপ্রিয়',
    badgeBg: 'var(--color-accent)',
    badgeColor: '#fff',
    weight: '৫ কেজি',
    mangoes: '২৫–৩৫টি আম',
    price: '১৪০ টাকা/কেজি',
    delivery: 'ঢাকায় সাশ্রয়ী ডেলিভারি',
    features: ['সাশ্রয়ী প্যাক', 'পরিবারের জন্য আদর্শ', 'বিশেষ ছাড়'],
    popular: true,
  },
  {
    id: 3,
    name: '১০ কেজি প্যাকেজ',
    images: ['/images/product-3.jpg', '/images/hero-5.jpg', '/images/hero-1.jpg'],
    badge: '💎 বেস্ট ভ্যালু',
    badgeBg: 'var(--color-primary)',
    badgeColor: '#fff',
    weight: '১০ কেজি',
    mangoes: '৫০–৭০টি আম',
    price: '১৪০ টাকা/কেজি',
    delivery: 'সারাদেশে ডেলিভারি',
    features: ['সর্বোচ্চ সাশ্রয়', 'অফিস/গিফট প্যাক', 'বিশেষ ডিসকাউন্ট'],
    popular: false,
  },
]

function ProductCard({ p }: { p: typeof products[0] }) {
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <div
      className="product-card-hover rounded-3xl overflow-hidden bg-white"
      style={{
        boxShadow: p.popular ? '0 8px 32px rgba(249,115,22,0.2)' : '0 4px 16px rgba(0,0,0,0.08)',
        border: p.popular ? '2px solid var(--color-accent)' : '1.5px solid var(--color-border)',
      }}
    >
      {/* Product Image with thumbnail strip */}
      <div className="relative">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={p.images[imgIdx]}
            alt={`Food Canvas হিমসাগর আম ${p.name}`}
            fill
            className="object-cover transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span
            className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full z-10"
            style={{ background: p.badgeBg, color: p.badgeColor }}
          >
            {p.badge}
          </span>
        </div>

        {/* Thumbnail strip */}
        {p.images.length > 1 && (
          <div className="flex gap-1.5 px-3 py-2 bg-stone-50 border-b border-stone-100">
            {p.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className="relative rounded-md overflow-hidden transition-all"
                style={{
                  width: 44,
                  height: 36,
                  border: i === imgIdx ? '2px solid var(--color-primary)' : '2px solid transparent',
                  opacity: i === imgIdx ? 1 : 0.6,
                }}
              >
                <Image
                  src={img}
                  alt={`ছবি ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {p.name}
          </h3>
          <p className="text-stone-500 text-sm mt-0.5">{p.weight} • {p.mangoes}</p>
        </div>

        <div>
          <span className="text-2xl font-bold" style={{ color: 'var(--color-alert)' }}>
            {p.price}
          </span>
          <p className="text-xs font-medium text-green-700 mt-0.5">{p.delivery}</p>
        </div>

        <ul className="space-y-1.5">
          {p.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-stone-700">
              <span className="text-green-600">✓</span> {f}
            </li>
          ))}
        </ul>

        <a
          href="#order"
          className={`block text-center font-bold py-3 rounded-xl text-white ${p.popular ? 'btn-accent' : 'btn-primary'}`}
        >
          {p.popular ? '⭐ এখনই অর্ডার করুন' : 'অর্ডার করুন'}
        </a>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <section id="products" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
            আমাদের প্যাকেজ বেছে নিন
          </h2>
          <p className="text-stone-600 text-lg">Food Canvas — সরাসরি রাজশাহীর বাগান থেকে তাজা হিমসাগর আম</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
