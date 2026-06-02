'use client'
import { useState, useEffect } from 'react'

export default function FloatingButtons() {
  const [waHover, setWaHover] = useState(false)
  const [fbHover, setFbHover] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const btnSize = isMobile ? '44px' : '54px'
  const waIconSize = isMobile ? 22 : 26
  const fbIconSize = isMobile ? 20 : 24

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isMobile ? '80px' : '28px',
        right: isMobile ? '12px' : '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: isMobile ? '10px' : '12px',
      }}
    >
      {/* WhatsApp */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Tooltip — desktop only */}
        {!isMobile && (
          <span
            style={{
              position: 'absolute',
              right: 'calc(100% + 10px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15,20,20,0.88)',
              color: 'white',
              fontSize: '0.72rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              padding: '5px 10px',
              borderRadius: '6px',
              opacity: waHover ? 1 : 0,
              pointerEvents: 'none',
              transition: 'opacity 0.2s ease',
            }}
          >
            WhatsApp
          </span>
        )}
        <a
          href="https://wa.me/8801972312458"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp-এ যোগাযোগ করুন"
          onMouseEnter={() => setWaHover(true)}
          onMouseLeave={() => setWaHover(false)}
          style={{
            width: btnSize,
            height: btnSize,
            borderRadius: '50%',
            background: '#25d366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: waHover
              ? '0 8px 28px rgba(37,211,102,0.55)'
              : '0 4px 18px rgba(0,0,0,0.25)',
            transform: waHover ? 'scale(1.12) translateY(-3px)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease',
            textDecoration: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width={waIconSize} height={waIconSize}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Facebook */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Tooltip — desktop only */}
        {!isMobile && (
          <span
            style={{
              position: 'absolute',
              right: 'calc(100% + 10px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15,20,20,0.88)',
              color: 'white',
              fontSize: '0.72rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              padding: '5px 10px',
              borderRadius: '6px',
              opacity: fbHover ? 1 : 0,
              pointerEvents: 'none',
              transition: 'opacity 0.2s ease',
            }}
          >
            Facebook
          </span>
        )}
        <a
          href="https://www.facebook.com/profile.php?id=61575638096031"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook পেজ দেখুন"
          onMouseEnter={() => setFbHover(true)}
          onMouseLeave={() => setFbHover(false)}
          style={{
            width: btnSize,
            height: btnSize,
            borderRadius: '50%',
            background: '#1877f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: fbHover
              ? '0 8px 28px rgba(24,119,242,0.55)'
              : '0 4px 18px rgba(0,0,0,0.25)',
            transform: fbHover ? 'scale(1.12) translateY(-3px)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease',
            textDecoration: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width={fbIconSize} height={fbIconSize}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
