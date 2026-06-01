import Image from 'next/image'

const products = [
  {
    id: 1,
    name: '১ কেজি প্যাকেজ',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400',
    badge: 'ট্রায়াল প্যাক',
    badgeBg: 'var(--color-primary-pale)',
    badgeColor: 'var(--color-primary)',
    weight: '১ কেজি',
    mangoes: '৫–৭টি আম',
    price: '১৪০ টাকা',
    originalPrice: null,
    delivery: '+ ডেলিভারি চার্জ',
    features: ['তাজা হিমসাগর', 'প্রিমিয়াম প্যাক', 'কেমিক্যাল মুক্ত'],
    popular: false,
  },
  {
    id: 2,
    name: '৫ কেজি প্যাকেজ',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400',
    badge: '⭐ সবচেয়ে জনপ্রিয়',
    badgeBg: 'var(--color-accent)',
    badgeColor: '#fff',
    weight: '৫ কেজি',
    mangoes: '২৫–৩৫টি আম',
    price: '৬৫০ টাকা',
    originalPrice: '৭০০ টাকা',
    delivery: 'ফ্রি ডেলিভারি (ঢাকায়)',
    features: ['সাশ্রয়ী প্যাক', 'পরিবারের জন্য আদর্শ', 'বিশেষ ছাড়'],
    popular: true,
  },
  {
    id: 3,
    name: '১০ কেজি প্যাকেজ',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
    badge: '💎 বেস্ট ভ্যালু',
    badgeBg: 'var(--color-primary)',
    badgeColor: '#fff',
    weight: '১০ কেজি',
    mangoes: '৫০–৭০টি আম',
    price: '১,২০০ টাকা',
    originalPrice: '১,৪০০ টাকা',
    delivery: 'ফ্রি ডেলিভারি সারাদেশ',
    features: ['সর্বোচ্চ সাশ্রয়', 'অফিস/গিফট প্যাক', 'বিশেষ ডিসকাউন্ট'],
    popular: false,
  },
]

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
            <div
              key={p.id}
              className="product-card-hover rounded-3xl overflow-hidden"
              style={{
                boxShadow: p.popular
                  ? '0 8px 32px rgba(249,115,22,0.2)'
                  : '0 4px 16px rgba(0,0,0,0.08)',
                border: p.popular ? '2px solid var(--color-accent)' : '1.5px solid var(--color-border)',
              }}
            >
              {/* Product Image */}
              <div className="relative h-52 w-full">
                <Image
                  src={p.image}
                  alt={`Food Canvas হিমসাগর আম ${p.name}`}
                  fill
                  className="object-cover"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: p.badgeBg, color: p.badgeColor }}
                >
                  {p.badge}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {p.name}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">
                    {p.weight} • {p.mangoes}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ color: 'var(--color-alert)' }}>
                    {p.price}
                  </span>
                  {p.originalPrice && (
                    <span className="text-sm line-through text-stone-400">{p.originalPrice}</span>
                  )}
                </div>
                <p className="text-xs font-medium text-green-700">{p.delivery}</p>

                {/* Features */}
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
          ))}
        </div>
      </div>
    </section>
  )
}
