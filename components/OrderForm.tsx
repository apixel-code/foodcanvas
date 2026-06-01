'use client'
import { useState } from 'react'

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

const PRICE_PER_KG    = 140  // পণ্যমূল্য প্রতি কেজি
const DELIVERY_DHAKA  = 120  // ঢাকায় ডেলিভারি প্রতি কেজি
const DELIVERY_OUTSIDE = 140 // ঢাকার বাইরে ডেলিভারি প্রতি কেজি

interface FormData {
  name: string
  phone: string
  address: string
  district: string
  quantity: string   // কেজি — কাস্টমার নিজে লিখবে
  payment: string
  transactionId: string
  note: string
}

const initialState: FormData = {
  name: '', phone: '', address: '', district: '',
  quantity: '', payment: 'cod', transactionId: '', note: '',
}

export default function OrderForm() {
  const [form, setForm] = useState<FormData>(initialState)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Live calculation
  const kg = parseFloat(form.quantity) || 0
  const product  = kg * PRICE_PER_KG
  const delivery = form.district
    ? kg * (form.district === 'ঢাকা' ? DELIVERY_DHAKA : DELIVERY_OUTSIDE)
    : 0
  const total = product + delivery
  const deliveryRate = form.district === 'ঢাকা' ? DELIVERY_DHAKA : DELIVERY_OUTSIDE

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => { setForm((p) => ({ ...p, [field]: e.target.value })); setError('') }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (kg <= 0) { setError('কমপক্ষে ১ কেজি দিন।'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      })
      const data = await res.json()
      if (res.ok) { setSuccess(true); setForm(initialState) }
      else setError(data.error || 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } catch {
      setError('ইন্টারনেট সমস্যা। একটু পরে আবার চেষ্টা করুন।')
    } finally { setLoading(false) }
  }

  const inp = 'w-full px-3 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-stone-800 text-sm'
  const lbl = 'block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wide'

  return (
    <section id="order" className="py-14 px-4" style={{ background: 'var(--color-primary)' }}>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center text-white mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">এখনই অর্ডার করুন 🥭</h2>
          <p className="text-sm opacity-75">ফর্ম পূরণ করুন — ২৪ ঘণ্টার মধ্যে কল করব</p>
        </div>

        {/* Success */}
        {success && (
          <div className="rounded-2xl p-5 text-center" style={{ background: '#d1fae5', border: '2px solid #6ee7b7' }}>
            <p className="text-2xl mb-1">✅</p>
            <p className="font-bold text-green-800">অর্ডার সফলভাবে জমা হয়েছে!</p>
            <p className="text-sm text-green-700 mt-1">শীঘ্রই আপনাকে কল করা হবে।</p>
            <button onClick={() => setSuccess(false)} className="mt-3 text-xs underline text-green-700">
              আরেকটি অর্ডার করুন
            </button>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 space-y-4" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>

            {/* নাম + মোবাইল */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>নাম *</label>
                <input type="text" className={inp} placeholder="আপনার নাম" value={form.name} onChange={set('name')} required />
              </div>
              <div>
                <label className={lbl}>মোবাইল *</label>
                <input type="tel" className={inp} placeholder="01XXXXXXXXX" value={form.phone} onChange={set('phone')} required />
              </div>
            </div>

            {/* ঠিকানা */}
            <div>
              <label className={lbl}>সম্পূর্ণ ঠিকানা *</label>
              <textarea className={inp} rows={2} placeholder="বাসা/রাস্তা/এলাকা" value={form.address} onChange={set('address')} required />
            </div>

            {/* জেলা + পরিমাণ */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>জেলা *</label>
                <select className={inp} value={form.district} onChange={set('district')} required>
                  <option value="">জেলা বেছে নিন</option>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>পরিমাণ (কেজি) *</label>
                <input
                  type="number"
                  className={inp}
                  placeholder="যেমন: ৫"
                  min="1"
                  step="1"
                  value={form.quantity}
                  onChange={set('quantity')}
                  required
                />
                <p className="text-xs text-stone-400 mt-1">সর্বনিম্ন ১ কেজি</p>
              </div>
            </div>

            {/* পেমেন্ট */}
            <div>
              <label className={lbl}>পেমেন্ট পদ্ধতি *</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cod',   label: '💵 ক্যাশ অন ডেলিভারি' },
                  { id: 'bkash', label: '💜 বিকাশ' },
                  { id: 'nagad', label: '🟠 নগদ' },
                ].map((pm) => {
                  const active = form.payment === pm.id
                  return (
                    <label
                      key={pm.id}
                      className="flex items-center justify-center p-2.5 rounded-xl cursor-pointer border-2 text-xs font-semibold text-center transition-all"
                      style={{
                        borderColor: active ? 'var(--color-primary)' : '#e5e7eb',
                        background: active ? 'var(--color-primary-pale)' : 'white',
                        color: active ? 'var(--color-primary)' : '#374151',
                      }}
                    >
                      <input type="radio" name="payment" value={pm.id} checked={active} onChange={set('payment')} className="hidden" />
                      {pm.label}
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Transaction ID */}
            {(form.payment === 'bkash' || form.payment === 'nagad') && (
              <div>
                <label className={lbl}>ট্রানজেকশন ID *</label>
                <input type="text" className={inp} placeholder="পেমেন্টের পর ID দিন" value={form.transactionId} onChange={set('transactionId')} required />
              </div>
            )}

            {/* নোট */}
            <div>
              <label className={lbl}>বিশেষ নির্দেশনা (ঐচ্ছিক)</label>
              <textarea className={inp} rows={2} placeholder="কোনো নির্দেশনা থাকলে লিখুন..." value={form.note} onChange={set('note')} />
            </div>

            {/* অর্ডার সারসংক্ষেপ */}
            <div className="rounded-xl p-4 space-y-2 text-sm" style={{ background: 'var(--color-mint)', border: '1px solid var(--color-mint-dark)' }}>
              <p className="font-bold text-stone-600 text-xs uppercase tracking-wide mb-2">মূল্য হিসাব</p>

              <div className="flex justify-between text-stone-600">
                <span>পণ্যমূল্য  <span className="text-stone-400">({kg || '?'} কেজি × ৳{PRICE_PER_KG})</span></span>
                <span className="font-semibold">{kg > 0 ? `৳${product.toLocaleString()}` : '—'}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>
                  ডেলিভারি
                  {form.district && kg > 0 && (
                    <span className="text-stone-400"> ({kg} কেজি × ৳{deliveryRate})</span>
                  )}
                </span>
                <span className="font-semibold">
                  {form.district && kg > 0 ? `৳${delivery.toLocaleString()}` : '—'}
                </span>
              </div>

              {form.district && (
                <p className="text-xs text-stone-400">
                  {form.district === 'ঢাকা'
                    ? '📍 ঢাকা: ডেলিভারি ৳১২০/কেজি'
                    : '📍 ঢাকার বাইরে: ডেলিভারি ৳১৪০/কেজি'}
                </p>
              )}

              <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-base">
                <span style={{ color: 'var(--color-primary)' }}>মোট</span>
                <span style={{ color: 'var(--color-alert)' }}>
                  {form.district && kg > 0 ? `৳${total.toLocaleString()}` : '—'}
                </span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg px-4 py-3 text-sm font-medium" style={{ background: 'var(--color-alert-light)', color: 'var(--color-alert)' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-3.5 rounded-xl text-base transition-all disabled:opacity-60"
              style={{
                background: loading ? '#9ca3af' : 'var(--color-accent)',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(249,115,22,0.3)',
              }}
            >
              {loading ? '⏳ পাঠানো হচ্ছে...' : '✅ অর্ডার নিশ্চিত করুন'}
            </button>

            <p className="text-center text-xs text-stone-400">
              অর্ডার দেওয়ার পর কল করে নিশ্চিত করা হবে।
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
