'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

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
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 anim-fade-down"
      style={{
        background: scrolled ? 'rgba(10,31,14,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.3)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,162,39,0.18)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Image
            src="/images/logo.png"
            alt="Food Canvas Logo"
            width={52}
            height={52}
            className="transition-transform group-hover:scale-110 drop-shadow-md"
          />
          <div>
            <p className="font-bold text-lg leading-tight text-white tracking-tight">
              Food Canvas
            </p>
            <p className="text-xs leading-tight font-medium" style={{ color: '#c9a227' }}>
              রাজশাহী থেকে সরাসরি
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium transition-all"
                style={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fbbf24' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#order"
          className="btn-accent hidden md:inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-full text-sm"
          style={{ boxShadow: '0 4px 20px rgba(232,114,30,0.4)' }}
        >
          🛒 অর্ডার করুন
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="মেনু"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-5 py-4 space-y-1"
          style={{
            background: 'rgba(10,31,14,0.98)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-medium text-sm border-b transition-colors"
              style={{ color: 'rgba(255,255,255,0.75)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setMenuOpen(false)}
            className="btn-accent block text-center text-white font-bold py-3.5 rounded-xl mt-4 text-sm"
          >
            🛒 এখনই অর্ডার করুন
          </a>
        </div>
      )}
    </nav>
  )
}
