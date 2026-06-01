export default function Footer() {
  const navLinks = [
    { label: 'হোম', href: '#' },
    { label: 'পণ্য', href: '#products' },
    { label: 'রিভিউ', href: '#reviews' },
    { label: 'অর্ডার করুন', href: '#order' },
    { label: 'যোগাযোগ', href: '#contact' },
  ]

  const trustBadges = [
    { icon: '🌿', text: '১০০% কেমিক্যাল মুক্ত' },
    { icon: '🚚', text: 'সারাদেশে ডেলিভারি' },
    { icon: '✅', text: 'মানের নিশ্চয়তা' },
    { icon: '📞', text: 'সার্বক্ষণিক সাপোর্ট' },
  ]

  return (
    <footer className="bg-stone-950 text-stone-400">
      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🥭</span>
              <div>
                <p className="text-white font-bold text-xl leading-tight">
                  Food Canvas
                </p>
                <p className="text-xs text-stone-500 leading-tight">
                  রাজশাহী থেকে সরাসরি
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              রাজশাহীর সেরা বাগান থেকে সংগ্রহ করা তাজা হিমসাগর আম সরাসরি আপনার
              দরজায় পৌঁছে দেওয়াই আমাদের লক্ষ্য।
            </p>
            <a
              href="#order"
              className="btn-accent inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-sm text-white"
            >
              🛒 এখনই অর্ডার করুন
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              কুইক লিংক
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              আমাদের প্রতিশ্রুতি
            </p>
            <ul className="space-y-2.5">
              {trustBadges.map((b) => (
                <li
                  key={b.text}
                  className="flex items-center gap-2.5 text-sm text-stone-400"
                >
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              যোগাযোগ
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:+8801972312458"
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
              >
                📱 +8801972312458
              </a>
              <a
                href="https://wa.me/8801972312458"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
              >
                💬 WhatsApp করুন
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-800" />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-stone-500">
        <p>© {new Date().getFullYear()} Food Canvas সর্বস্বত্ব সংরক্ষিত।</p>
        <p>
          Developed by{" "}
          <a
            href="https://www.apixel.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 font-semibold transition-colors"
          >
            Apixel
          </a>
        </p>
      </div>
    </footer>
  );
}
