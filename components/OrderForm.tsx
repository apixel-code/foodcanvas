'use client'
import { useState } from 'react'
import Image from 'next/image'

// bKash official brand color: #E2136E
// SVG drawn as: pink circle + white lowercase "b" letterform (stem + D-bowl)
function BkashLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="bKash"
    >
      {/* Hot-pink circle background */}
      <circle cx="50" cy="50" r="50" fill="#E2136E" />

      {/* "b" — vertical stem */}
      <rect x="30" y="16" width="14" height="68" rx="7" fill="white" />

      {/* "b" — right-facing D bowl (perfect semicircle):
          start (44, 42) → sweep clockwise → end (44, 76)
          center = (44, 59), radius = 17                     */}
      <path d="M 44 42 A 17 17 0 0 1 44 76 Z" fill="white" />
    </svg>
  )
}

const districts = [
  'ঢাকা','চট্টগ্রাম','রাজশাহী','খুলনা','বরিশাল','সিলেট','রংপুর','ময়মনসিংহ',
  'নারায়ণগঞ্জ','গাজীপুর','টাঙ্গাইল','কিশোরগঞ্জ','মানিকগঞ্জ','মুন্সিগঞ্জ','নরসিংদী',
  'ফরিদপুর','গোপালগঞ্জ','মাদারীপুর','রাজবাড়ী','শরীয়তপুর','ব্রাহ্মণবাড়িয়া','কুমিল্লা',
  'চাঁদপুর','লক্ষ্মীপুর','নোয়াখালী','ফেনী','কক্সবাজার','বান্দরবান','খাগড়াছড়ি',
  'রাঙামাটি','হবিগঞ্জ','মৌলভীবাজার','সুনামগঞ্জ','নাটোর','চাঁপাইনবাবগঞ্জ','নওগাঁ',
  'বগুড়া','জয়পুরহাট','পাবনা','সিরাজগঞ্জ','যশোর','সাতক্ষীরা','মেহেরপুর',
  'নড়াইল','কুষ্টিয়া','চুয়াডাঙ্গা','ঝিনাইদহ','মাগুরা','বাগেরহাট','পিরোজপুর',
  'ঝালকাঠি','পটুয়াখালী','বরগুনা','ভোলা','দিনাজপুর','ঠাকুরগাঁও','পঞ্চগড়',
  'নীলফামারী','লালমনিরহাট','কুড়িগ্রাম','গাইবান্ধা','জামালপুর','শেরপুর','নেত্রকোনা',
]

const PACKAGES = [
  {
    id: '1kg',
    name: '১ কেজি হিমসাগর (Himsagar) পাকা আম',
    kg: 1,
    price: 99,
    img: 'https://images.unsplash.com/photo-1688492596644-b0e68aa86477?w=120&h=120&fit=crop&q=80',
  },
  {
    id: '5kg',
    name: '৫ কেজি হিমসাগর (Himsagar) পাকা আম',
    kg: 5,
    price: 495,
    img: 'https://images.unsplash.com/photo-1630552358140-c50ab1c5f8be?w=120&h=120&fit=crop&q=80',
  },
  {
    id: '10kg',
    name: '১০ কেজি হিমসাগর (Himsagar) পাকা আম',
    kg: 10,
    price: 990,
    img: 'https://images.unsplash.com/photo-1680008702821-e1b598db30f3?w=120&h=120&fit=crop&q=80',
  },
  {
    id: '20kg',
    name: '২০ কেজি হিমসাগর (Himsagar) পাকা আম',
    kg: 20,
    price: 1980,
    img: 'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=120&h=120&fit=crop&q=80',
  },
]

const DELIVERY_PER_KG = 20

const BKASH_PERSONAL = '01972312458'
const BKASH_MERCHANT = '01752952571'

const inp  = 'w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white text-stone-800 text-sm transition-all'
const lbl  = 'block text-xs font-bold text-stone-500 mb-1.5 uppercase tracking-wider'

export default function OrderForm() {
  const [selectedId, setSelectedId] = useState('5kg')
  const [qty, setQty]               = useState(1)
  const [name, setName]             = useState('')
  const [phone, setPhone]           = useState('')
  const [address, setAddress]       = useState('')
  const [district, setDistrict]     = useState('')
  const [payment, setPayment]       = useState('cod')
  const [txId, setTxId]             = useState('')
  const [note, setNote]             = useState('')
  const [loading,      setLoading]      = useState(false)
  const [success,      setSuccess]      = useState(false)
  const [trackingCode, setTrackingCode] = useState('')
  const [error,        setError]        = useState('')

  const pkg          = PACKAGES.find(p => p.id === selectedId)!
  const productTotal = pkg.price * qty
  const totalKg      = pkg.kg * qty
  const deliveryAmt  = totalKg * DELIVERY_PER_KG
  const grandTotal   = productTotal + deliveryAmt
  const isBkash      = payment === 'bkash_personal' || payment === 'bkash_merchant'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!district)           { setError('জেলা সিলেক্ট করুন।'); return }
    if (isBkash && !txId)    { setError('ট্রানজেকশন ID দিন।'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, address, district,
          quantity: String(totalKg),
          payment, transactionId: txId, note,
          package: pkg.name,
          packages_qty: String(qty),
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setTrackingCode(data.tracking_code || '')
        setSuccess(true)
        setName(''); setPhone(''); setAddress(''); setDistrict('')
        setTxId(''); setNote(''); setQty(1); setSelectedId('5kg'); setPayment('cod')
      } else {
        setError(data.error || 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।')
      }
    } catch {
      setError('ইন্টারনেট সমস্যা। একটু পরে আবার চেষ্টা করুন।')
    } finally { setLoading(false) }
  }

  return (
    <section id="order" className="py-24 px-4" style={{ background: '#0a1f0e' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge-gold mb-5">অর্ডার করুন</span>
          <h2 className="font-bold text-white mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            এখনই অর্ডার দিন 🥭
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
            ফর্ম পূরণ করুন — ২৪ ঘণ্টার মধ্যে কল করব
          </p>
        </div>

        {/* Success */}
        {success && (
          <div className="rounded-2xl p-8 text-center space-y-4" style={{ background: '#d1fae5', border: '2px solid #6ee7b7' }}>
            <p className="text-5xl">✅</p>
            <p className="font-bold text-green-800 text-xl">অর্ডার সফলভাবে নিশ্চিত হয়েছে!</p>
            <p className="text-sm text-green-700">
              Steadfast Courier-এ শিপমেন্ট তৈরি হয়েছে। শীঘ্রই ডেলিভারি হবে।
            </p>

            {trackingCode && (
              <div className="rounded-xl px-5 py-4 mx-auto max-w-xs" style={{ background: 'white', border: '1px solid #a7f3d0' }}>
                <p className="text-xs font-bold text-green-600 mb-1 uppercase tracking-widest">আপনার ট্র্যাকিং কোড</p>
                <p className="font-mono font-bold text-lg tracking-widest text-green-900">{trackingCode}</p>
                <p className="text-xs text-green-600 mt-1">
                  নিচের <strong>"অর্ডার ট্র্যাকিং"</strong> সেকশনে ফোন নম্বর দিয়ে স্ট্যাটাস দেখুন
                </p>
              </div>
            )}

            <button
              onClick={() => { setSuccess(false); setTrackingCode('') }}
              className="text-xs underline text-green-700"
            >
              আরেকটি অর্ডার করুন
            </button>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-0">

            {/* ── ১. পণ্য নির্বাচন ── */}
            <div
              className="rounded-t-3xl p-6 md:p-8"
              style={{ background: 'white', borderBottom: '1px solid #f0f0f0' }}
            >
              <h3 className="font-bold text-base mb-5" style={{ color: 'var(--color-primary)' }}>
                আপনার পণ্য নির্বাচন করুন
              </h3>

              <div className="divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden">
                {PACKAGES.map((p) => {
                  const isSelected = selectedId === p.id
                  return (
                    <label
                      key={p.id}
                      className="flex items-center gap-4 px-4 py-4 cursor-pointer transition-colors"
                      style={{
                        background: isSelected ? '#f0fdf4' : 'white',
                      }}
                    >
                      {/* Radio */}
                      <div
                        className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: isSelected ? 'var(--color-primary)' : '#d1d5db',
                          background: isSelected ? 'var(--color-primary)' : 'white',
                        }}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <input
                        type="radio"
                        name="package"
                        value={p.id}
                        checked={isSelected}
                        onChange={() => { setSelectedId(p.id); setQty(1) }}
                        className="hidden"
                      />

                      {/* Image */}
                      <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-stone-100 relative">
                        <Image src={p.img} alt={p.name} fill className="object-cover" sizes="56px" />
                      </div>

                      {/* Name */}
                      <span
                        className="flex-1 text-sm font-medium"
                        style={{ color: isSelected ? 'var(--color-primary)' : '#374151' }}
                      >
                        {p.name}
                      </span>

                      {/* Qty stepper */}
                      <div
                        className="shrink-0 flex items-center gap-0 rounded-xl border overflow-hidden"
                        style={{ borderColor: isSelected ? 'var(--color-primary)' : '#e5e7eb' }}
                      >
                        <button
                          type="button"
                          onClick={() => isSelected && setQty(q => Math.max(1, q - 1))}
                          disabled={!isSelected || qty <= 1}
                          className="w-9 h-9 flex items-center justify-center text-base font-bold transition-colors disabled:opacity-30"
                          style={{ color: isSelected ? 'var(--color-primary)' : '#9ca3af' }}
                        >
                          −
                        </button>
                        <span
                          className="w-10 text-center text-sm font-bold border-x"
                          style={{
                            borderColor: isSelected ? 'var(--color-primary)' : '#e5e7eb',
                            color: '#1c1917',
                          }}
                        >
                          {isSelected ? qty : 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => isSelected && setQty(q => q + 1)}
                          disabled={!isSelected}
                          className="w-9 h-9 flex items-center justify-center text-base font-bold transition-colors disabled:opacity-30"
                          style={{ color: isSelected ? 'var(--color-primary)' : '#9ca3af' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span
                        className="shrink-0 w-20 text-right font-bold text-sm"
                        style={{ color: isSelected ? '#dc2626' : '#6b7280' }}
                      >
                        {(p.price * (isSelected ? qty : 1)).toLocaleString('bn-BD')}৳
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* ── ২. বিলিং + সারসংক্ষেপ ── */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-6 md:p-8"
              style={{ background: 'white', borderTop: '1px solid #f0f0f0' }}
            >
              {/* বিলিং তথ্য */}
              <div className="space-y-4 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-stone-100 md:pr-6">
                <h3 className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>
                  বিলিং তথ্য
                </h3>

                <div>
                  <label className={lbl}>নাম *</label>
                  <input type="text" className={inp} placeholder="আপনার পূর্ণ নাম" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                  <label className={lbl}>মোবাইল নম্বর *</label>
                  <input type="tel" className={inp} placeholder="01XXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div>
                  <label className={lbl}>সম্পূর্ণ ঠিকানা *</label>
                  <textarea className={inp} rows={2} placeholder="বাসা/রাস্তা/এলাকা" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div>
                  <label className={lbl}>জেলা *</label>
                  <select className={inp} value={district} onChange={e => setDistrict(e.target.value)} required>
                    <option value="">জেলা বেছে নিন</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>বিশেষ নির্দেশনা (ঐচ্ছিক)</label>
                  <textarea className={inp} rows={2} placeholder="কোনো নির্দেশনা থাকলে..." value={note} onChange={e => setNote(e.target.value)} />
                </div>
              </div>

              {/* অর্ডার সারসংক্ষেপ */}
              <div className="pt-6 md:pt-0 md:pl-6 space-y-5 flex flex-col">
                <h3 className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>
                  আপনার পণ্য
                </h3>

                {/* Summary card */}
                <div className="rounded-2xl p-4 space-y-3 text-sm flex-1" style={{ background: '#f8fffe', border: '1px solid #d1fae5' }}>
                  <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                      <Image src={pkg.img} alt={pkg.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800 text-xs leading-snug">{pkg.name}</p>
                      <p className="text-stone-400 text-xs mt-0.5">× {qty} প্যাকেট = {totalKg} কেজি</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>পণ্যমূল্য</span>
                    <span className="font-semibold">৳{productTotal.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>
                      ডেলিভারি
                      <span className="text-stone-400 text-xs ml-1">({totalKg}কেজি × ৳{DELIVERY_PER_KG})</span>
                    </span>
                    <span className="font-semibold">৳{deliveryAmt.toLocaleString('bn-BD')}</span>
                  </div>
                  <p className="text-xs text-stone-400">📍 সারাদেশে: ৳{DELIVERY_PER_KG}/কেজি</p>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-stone-200">
                    <span style={{ color: 'var(--color-primary)' }}>মোট</span>
                    <span style={{ color: '#dc2626' }}>৳{grandTotal.toLocaleString('bn-BD')}</span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl px-4 py-3 text-xs font-medium" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' }}>
                    ⚠️ {error}
                  </div>
                )}
              </div>
            </div>

            {/* ── ৩. পেমেন্ট পদ্ধতি ── */}
            <div className="p-6 md:p-8 space-y-5" style={{ background: 'white', borderTop: '1px solid #f0f0f0' }}>
              <h3 className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>
                পেমেন্ট পদ্ধতি
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'cod',             label: 'ক্যাশ অন ডেলিভারি', icon: '💵', desc: 'পণ্য পেয়ে পরিশোধ' },
                  { id: 'bkash_personal',  label: 'বিকাশ পার্সোনাল',   icon: '',    desc: BKASH_PERSONAL },
                  { id: 'bkash_merchant',  label: 'বিকাশ মার্চেন্ট',   icon: '',    desc: BKASH_MERCHANT },
                ].map(pm => {
                  const active   = payment === pm.id
                  const isBkash  = pm.id.startsWith('bkash')
                  return (
                    <label
                      key={pm.id}
                      className="flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 cursor-pointer transition-all text-center"
                      style={{
                        borderColor: active ? (isBkash ? '#E2136E' : 'var(--color-primary)') : '#e5e7eb',
                        background:  active ? (isBkash ? '#fff0f6'  : 'var(--color-primary-pale)') : 'white',
                      }}
                    >
                      <input type="radio" name="payment" value={pm.id} checked={active} onChange={() => setPayment(pm.id)} className="hidden" />

                      {isBkash ? (
                        <BkashLogo size={36} />
                      ) : (
                        <span className="text-2xl">{pm.icon}</span>
                      )}

                      <span
                        className="text-xs font-bold"
                        style={{ color: active ? (isBkash ? '#E2136E' : 'var(--color-primary)') : '#374151' }}
                      >
                        {pm.label}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: active ? (isBkash ? '#c40f5b' : 'var(--color-primary)') : '#9ca3af' }}
                      >
                        {pm.desc}
                      </span>
                    </label>
                  )
                })}
              </div>

              {/* bKash info box */}
              {isBkash && (
                <div
                  className="rounded-2xl p-5 space-y-3"
                  style={{ background: '#fff0f6', border: '1.5px solid #f9a8d4' }}
                >
                  {/* Header with bKash logo */}
                  <div className="flex items-center gap-2">
                    <BkashLogo size={24} />
                    <p className="font-bold text-sm" style={{ color: '#9d0040' }}>
                      বিকাশে পেমেন্ট করার নিয়ম
                    </p>
                  </div>

                  <div
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm"
                    style={{ background: 'white', border: '1px solid #fecdd3' }}
                  >
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#E2136E' }}>Account Type</p>
                      <p className="font-bold" style={{ color: '#9d0040' }}>
                        {payment === 'bkash_personal' ? 'Personal Account' : 'Merchant Account'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold" style={{ color: '#E2136E' }}>Number</p>
                      <p className="font-bold text-base tracking-widest" style={{ color: '#9d0040' }}>
                        {payment === 'bkash_personal' ? BKASH_PERSONAL : BKASH_MERCHANT}
                      </p>
                    </div>
                  </div>

                  <ol className="text-xs space-y-1 list-decimal list-inside" style={{ color: '#be185d' }}>
                    <li>উপরের নম্বরে পেমেন্ট পাঠান (Send Money বা Payment)</li>
                    <li>ট্রানজেকশন ID সংগ্রহ করুন</li>
                    <li>নিচের ঘরে সেই ID লিখুন</li>
                  </ol>

                  <div>
                    <label className={lbl} style={{ color: '#9d0040' }}>ট্রানজেকশন ID *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white text-stone-800 text-sm transition-all"
                      style={{ border: '2px solid #fda4af', outline: 'none' }}
                      onFocus={e  => (e.currentTarget.style.borderColor = '#E2136E')}
                      onBlur={e   => (e.currentTarget.style.borderColor = '#fda4af')}
                      placeholder="যেমন: 8HJ3K2LM9N"
                      value={txId}
                      onChange={e => setTxId(e.target.value)}
                      required={isBkash}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── Submit ── */}
            <div className="rounded-b-3xl p-6 md:p-8 pt-0" style={{ background: 'white' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full font-bold py-4 rounded-2xl text-base text-white transition-all disabled:opacity-60"
                style={{
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #e8721e, #c9570e)',
                  boxShadow: loading ? 'none' : '0 8px 28px rgba(232,114,30,0.4)',
                }}
              >
                {loading ? '⏳ পাঠানো হচ্ছে...' : '✅ অর্ডার নিশ্চিত করুন'}
              </button>
              <p className="text-center text-xs text-stone-400 mt-3">
                অর্ডার দেওয়ার পর ২৪ ঘণ্টার মধ্যে কল করে নিশ্চিত করা হবে।
              </p>
            </div>

          </form>
        )}
      </div>
    </section>
  )
}
