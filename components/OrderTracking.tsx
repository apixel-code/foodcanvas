'use client'
import { useState, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrderInfo {
  timestamp:    string
  name:         string
  phone:        string
  district:     string
  thana:        string
  quantity:     string
  total:        string
  status:       string
  trackingCode: string
}

interface TrackingData {
  delivery_status: string
}

interface TrackResult {
  order:    OrderInfo
  tracking: TrackingData | null
  error?:   string
}

// ─── Timeline step definitions ────────────────────────────────────────────────
const TIMELINE = [
  { label: 'অর্ডার নিশ্চিত',    sublabel: 'অর্ডার গৃহীত হয়েছে',     icon: '📋' },
  { label: 'প্যাকেজিং',         sublabel: 'কুরিয়ারে বুক করা হয়েছে', icon: '📦' },
  { label: 'পথে আছে',           sublabel: 'ডেলিভারি রুটে আছে',       icon: '🚚' },
  { label: 'ডেলিভারি সম্পন্ন',  sublabel: 'আপনার কাছে পৌঁছেছে',      icon: '✅' },
]

// Steadfast delivery_status → which timeline step (0-based) is the furthest done
const STATUS_TO_STEP: Record<string, number> = {
  pending:           1,
  in_review:         1,
  in_transit:        2,
  hold:              2,
  partial_delivered: 3,
  delivered:         3,
  unknown:           1,
  cancelled:         -1,  // special: show cancelled state
}

const STATUS_LABELS: Record<string, string> = {
  pending:           'কুরিয়ারে বুক হয়েছে',
  in_review:         'কুরিয়ার রিভিউ করছে',
  in_transit:        'ডেলিভারি রুটে আছে',
  hold:              'অস্থায়ীভাবে হোল্ড আছে',
  partial_delivered: 'আংশিক ডেলিভারি সম্পন্ন',
  delivered:         'সফলভাবে ডেলিভারি হয়েছে',
  cancelled:         'অর্ডার বাতিল করা হয়েছে',
  unknown:           'তথ্য পাওয়া যাচ্ছে না',
}

// ─── Derived step index from API response ─────────────────────────────────────
function getActiveStep(order: OrderInfo, tracking: TrackingData | null): number {
  if (!order.trackingCode) return 0                // not shipped yet
  if (!tracking) return 1                           // shipped but Steadfast unreachable
  return STATUS_TO_STEP[tracking.delivery_status] ?? 1
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepNode({
  index,
  step,
  activeStep,
  isCancelled,
}: {
  index:       number
  step:        { label: string; sublabel: string; icon: string }
  activeStep:  number
  isCancelled: boolean
}) {
  const done    = !isCancelled && index <= activeStep
  const current = !isCancelled && index === activeStep
  const cancelled = isCancelled

  const circleStyle: React.CSSProperties = done
    ? { background: 'var(--color-primary)', border: '2.5px solid var(--color-primary)' }
    : cancelled
    ? { background: '#fef2f2', border: '2.5px solid #fca5a5' }
    : { background: 'white', border: '2.5px solid #d1d5db' }

  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      {/* Circle */}
      <div
        className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500"
        style={circleStyle}
      >
        {/* Pulse ring for the current active step */}
        {current && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'var(--color-primary)', opacity: 0.25 }}
          />
        )}

        {done ? (
          <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : cancelled ? (
          <span className="text-xl">✕</span>
        ) : (
          <span className="text-xl">{step.icon}</span>
        )}
      </div>

      {/* Label */}
      <div className="text-center px-1">
        <p
          className="text-xs font-bold leading-snug"
          style={{
            color: done
              ? 'var(--color-primary)'
              : cancelled
              ? '#dc2626'
              : '#9ca3af',
          }}
        >
          {step.label}
        </p>
        <p
          className="text-xs mt-0.5 leading-snug"
          style={{ color: done ? '#6b7280' : '#c4b5b5', fontSize: '0.68rem' }}
        >
          {step.sublabel}
        </p>
      </div>
    </div>
  )
}

function ConnectorLine({
  filled,
  isCancelled,
}: {
  filled:      boolean
  isCancelled: boolean
}) {
  return (
    <div
      className="h-1 flex-1 rounded-full mt-5 shrink transition-all duration-700"
      style={{
        background: isCancelled
          ? '#fca5a5'
          : filled
          ? 'var(--color-primary)'
          : '#e5e7eb',
        minWidth: 8,
      }}
    />
  )
}

// ─── Order summary card ───────────────────────────────────────────────────────
function OrderCard({
  order,
  tracking,
  activeStep,
  isCancelled,
}: {
  order:       OrderInfo
  tracking:    TrackingData | null
  activeStep:  number
  isCancelled: boolean
}) {
  const sfStatus    = tracking?.delivery_status ?? ''
  const statusLabel = sfStatus ? (STATUS_LABELS[sfStatus] ?? sfStatus) : '—'

  const statusBadgeStyle: React.CSSProperties = isCancelled
    ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' }
    : activeStep === 3
    ? { background: '#f0fdf4', color: '#15803d', border: '1px solid #86efac' }
    : { background: '#fffbeb', color: '#b45309', border: '1px solid #fcd34d' }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid #e7e5e4' }}
    >
      {/* Header strip */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: 'var(--color-primary)' }}
      >
        <div>
          <p className="text-white font-bold text-sm">{order.name}</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {order.phone}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {order.timestamp}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4" style={{ background: 'white' }}>

        {/* Order details row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'জেলা',      value: order.district || '—' },
            { label: 'থানা',      value: order.thana    || '—' },
            { label: 'পরিমাণ',   value: order.quantity  || '—' },
            { label: 'মোট মূল্য', value: order.total    || '—' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3 text-center"
              style={{ background: '#f9fafb' }}
            >
              <p className="text-xs font-bold" style={{ color: '#9ca3af', fontSize: '0.65rem' }}>
                {label}
              </p>
              <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-primary)' }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Steadfast live status badge */}
        {tracking && (
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm"
            style={statusBadgeStyle}
          >
            <span className="font-semibold text-xs">Steadfast স্ট্যাটাস</span>
            <span className="font-bold text-xs">{statusLabel}</span>
          </div>
        )}

        {/* Tracking code */}
        {order.trackingCode && (
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ background: '#f8f9ff', border: '1px solid #dbeafe' }}
          >
            <span className="text-xs font-semibold" style={{ color: '#3b82f6' }}>
              ট্র্যাকিং কোড
            </span>
            <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#1e40af' }}>
              {order.trackingCode}
            </span>
          </div>
        )}

        {/* No tracking code yet */}
        {!order.trackingCode && (
          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}
          >
            <p className="text-xs font-semibold" style={{ color: '#92400e' }}>
              ⏳ আপনার অর্ডারটি প্রস্তুত হচ্ছে। শীঘ্রই Steadfast-এ শিপ করা হবে।
            </p>
          </div>
        )}

        {/* Cancelled note */}
        {isCancelled && (
          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}
          >
            <p className="text-xs font-semibold" style={{ color: '#dc2626' }}>
              এই অর্ডারটি বাতিল হয়েছে। সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function OrderTracking() {
  const [phone,   setPhone]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [result,  setResult]  = useState<TrackResult | null>(null)

  const handleTrack = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = phone.replace(/\s/g, '')
    if (!/^01[3-9]\d{8}$/.test(cleaned)) {
      setError('সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res  = await fetch(`/api/track-order?phone=${encodeURIComponent(cleaned)}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।')
      } else {
        setResult(data)
      }
    } catch {
      setError('ইন্টারনেট সংযোগ সমস্যা। একটু পরে আবার চেষ্টা করুন।')
    } finally {
      setLoading(false)
    }
  }, [phone])

  const activeStep  = result ? getActiveStep(result.order, result.tracking) : 0
  const isCancelled = result?.tracking?.delivery_status === 'cancelled'

  return (
    <section
      id="track"
      className="py-20 px-4"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'var(--color-primary-pale)', color: 'var(--color-primary)' }}
          >
            অর্ডার ট্র্যাকিং
          </span>
          <h2
            className="font-bold mb-2"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--color-primary)' }}
          >
            আপনার অর্ডার কোথায় আছে?
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            অর্ডার দেওয়ার সময় ব্যবহার করা মোবাইল নম্বরটি দিন
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <input
            type="tel"
            value={phone}
            onChange={e => { setPhone(e.target.value); setError('') }}
            placeholder="01XXXXXXXXX"
            className="flex-1 px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
            style={{
              border: error ? '2px solid #fca5a5' : '2px solid #e7e5e4',
              outline: 'none',
              background: 'white',
              color: 'var(--color-text-main)',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--color-primary)'
            }}
            onBlur={e => {
              if (!error) e.currentTarget.style.borderColor = '#e7e5e4'
            }}
            maxLength={14}
          />
          <button
            type="submit"
            disabled={loading || !phone}
            className="shrink-0 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
            style={{
              background: loading
                ? '#9ca3af'
                : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(15,61,32,0.35)',
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                খোঁজা হচ্ছে...
              </span>
            ) : (
              'ট্র্যাক করুন'
            )}
          </button>
        </form>

        {/* Inline error */}
        {error && (
          <div
            className="flex items-start gap-2 rounded-xl px-4 py-3 mb-6 text-sm"
            style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' }}
          >
            <span className="shrink-0 mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* ── Result panel ── */}
        {result && (
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: '1.5px solid #e7e5e4', background: 'white' }}
          >
            {/* Timeline header strip */}
            <div
              className="px-6 py-5"
              style={{ background: 'var(--color-mint)', borderBottom: '1px solid #d1fae5' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
                ডেলিভারি অগ্রগতি
              </p>

              {/* ── The 4-step horizontal timeline ── */}
              <div className="flex items-start">
                {TIMELINE.map((step, i) => (
                  <div key={i} className="flex items-center flex-1 min-w-0">
                    <StepNode
                      index={i}
                      step={step}
                      activeStep={activeStep}
                      isCancelled={isCancelled && i > 0}
                    />
                    {/* Connector between steps */}
                    {i < TIMELINE.length - 1 && (
                      <ConnectorLine
                        filled={!isCancelled && i < activeStep}
                        isCancelled={isCancelled}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order details card */}
            <div className="p-5">
              <OrderCard
                order={result.order}
                tracking={result.tracking}
                activeStep={activeStep}
                isCancelled={isCancelled}
              />
            </div>

            {/* Refresh hint */}
            <div className="pb-5 text-center">
              <button
                type="button"
                onClick={() => handleTrack({ preventDefault: () => {} } as React.FormEvent)}
                className="text-xs underline underline-offset-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                🔄 স্ট্যাটাস রিফ্রেশ করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
