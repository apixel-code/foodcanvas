'use client'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const products = [
  {
    id: 1,
    name: '১ কেজি প্যাকেজ',
    image: '/images/product_img_01.jpeg',
    badge: 'ট্রায়াল প্যাক',
    badgeStyle: { background: 'var(--color-primary-pale)', color: 'var(--color-primary)' },
    weight: '১ কেজি',
    mangoes: '৫–৭টি আম',
    price: '৯৯ টাকা/কেজি',
    delivery: '+ ডেলিভারি চার্জ',
    features: ['তাজা হিমসাগর', 'প্রিমিয়াম প্যাক', 'কেমিক্যাল মুক্ত'],
    popular: false,
    cta: 'অর্ডার করুন',
  },
  {
    id: 2,
    name: '৫ কেজি প্যাকেজ',
    image: '/images/product_img-02.jpeg',
    badge: '⭐ সবচেয়ে জনপ্রিয়',
    badgeStyle: { background: '#e8721e', color: '#fff' },
    weight: '৫ কেজি',
    mangoes: '২৫–৩৫টি আম',
    price: '৯৯ টাকা/কেজি',
    delivery: 'সারাদেশে ডেলিভারি',
    features: ['সাশ্রয়ী প্যাক', 'পরিবারের জন্য আদর্শ', 'বিশেষ ছাড়'],
    popular: true,
    cta: '⭐ এখনই অর্ডার করুন',
  },
  {
    id: 3,
    name: '১০ কেজি প্যাকেজ',
    image: '/images/product_img_03.png',
    badge: '💎 বেস্ট ভ্যালু',
    badgeStyle: { background: 'var(--color-primary)', color: '#fff' },
    weight: '১০ কেজি',
    mangoes: '৫০–৭০টি আম',
    price: '৯৯ টাকা/কেজি',
    delivery: 'সারাদেশে ডেলিভারি',
    features: ['সর্বোচ্চ সাশ্রয়', 'অফিস/গিফট প্যাক', 'বিশেষ ডিসকাউন্ট'],
    popular: false,
    cta: 'অর্ডার করুন',
  },
]

function ProductCard({ p }: { p: (typeof products)[0] }) {
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
          src={p.image}
          alt={`Food Canvas হিমসাগর আম ${p.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm"
          style={p.badgeStyle}
        >
          {p.badge}
        </span>
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

const CARD_ANIMS = ['anim-left', 'anim-zoom', 'anim-right'] as const

export default function Products() {
  const { ref: headerRef, inView: headerVisible } = useInView()
  const { ref: cardsRef,  inView: cardsVisible  } = useInView()

  return (
    <section id="products" className="py-24 px-4" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className={`text-center mb-14 reveal-parent ${headerVisible ? 'is-visible' : ''}`}>
          <span className="badge-green mb-5 anim-down reveal-d-1">আমাদের প্যাকেজ</span>
          <h2
            className="font-bold mb-4 leading-tight anim-blur reveal-d-2"
            style={{ color: 'var(--color-primary)', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
          >
            আপনার পছন্দের প্যাকেজ
            <br />
            <span style={{ color: 'var(--color-accent)' }}>বেছে নিন</span>
          </h2>
          <p className="text-stone-500 text-lg anim-up reveal-d-3">
            সরাসরি রাজশাহীর বাগান থেকে — তাজা হিমসাগর আম
          </p>
        </div>

        {/* Cards — left, zoom-bounce, right */}
        <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-7 reveal-parent ${cardsVisible ? 'is-visible' : ''}`}>
          {products.map((p, i) => (
            <div key={p.id} className={`${CARD_ANIMS[i]} reveal-d-${i + 1}`}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-stone-400 text-sm mt-8">
          * সব প্যাকেজেই ৯৯ টাকা/কেজি হারে মূল্য।
        </p>
      </div>
    </section>
  )
}
