'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'হোম', href: '#' },
  { label: 'পণ্য', href: '#products' },
  { label: 'রিভিউ', href: '#reviews' },
  { label: 'যোগাযোগ', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-3xl">🥭</span>
          <div>
            <p className="font-bold text-lg leading-tight" style={{ color: 'var(--color-primary)' }}>
              Food Canvas
            </p>
            <p className="text-xs leading-tight text-stone-500">রাজশাহী থেকে সরাসরি</p>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-stone-700 font-medium transition-colors hover:text-green-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#order"
          className="btn-accent hidden md:inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full"
          style={{ boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }}
        >
          🛒 অর্ডার করুন
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-stone-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="মেনু"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-stone-700 font-medium py-2 hover:text-green-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setMenuOpen(false)}
            className="block text-center text-white font-bold py-3 rounded-xl"
            style={{ background: 'var(--color-accent)' }}
          >
            🛒 এখনই অর্ডার করুন
          </a>
        </div>
      )}
    </nav>
  )
}
