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

function NagadLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nagad">
      <circle cx="50" cy="50" r="50" fill="#FF6600" />
      <rect x="26" y="20" width="13" height="60" rx="6.5" fill="white" />
      <rect x="61" y="20" width="13" height="60" rx="6.5" fill="white" />
      <line x1="32" y1="23" x2="68" y2="77" stroke="white" strokeWidth="13" strokeLinecap="round" />
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

const THANAS: Record<string, string[]> = {
  'ঢাকা': ['ধানমন্ডি','মিরপুর','মোহাম্মদপুর','গুলশান','উত্তরা','বাড্ডা','রামপুরা','মতিঝিল','সূত্রাপুর','কোতোয়ালি','লালবাগ','কামরাঙ্গীরচর','হাজারীবাগ','শ্যামপুর','কদমতলী','ডেমরা','সবুজবাগ','খিলগাঁও','ওয়ারী','তেজগাঁও','তেজগাঁও শিল্পাঞ্চল','বনানী','ক্যান্টনমেন্ট','দক্ষিণখান','উত্তরখান','তুরাগ','শাহ আলী','পল্লবী','শাহজাহানপুর','কেরানীগঞ্জ','নবাবগঞ্জ','দোহার','সাভার','ধামরাই'],
  'চট্টগ্রাম': ['কোতোয়ালি','ডবলমুরিং','বাকলিয়া','চান্দগাঁও','পাঁচলাইশ','পতেঙ্গা','বায়েজীদ বোস্তামী','আকবর শাহ','আনোয়ারা','বাঁশখালী','বোয়ালখালী','চন্দনাইশ','ফটিকছড়ি','হাটহাজারী','কর্ণফুলী','লোহাগাড়া','মিরসরাই','পটিয়া','রাঙ্গুনিয়া','রাউজান','সন্দ্বীপ','সাতকানিয়া','সীতাকুণ্ড'],
  'রাজশাহী': ['রাজশাহী সদর','বোয়ালিয়া','মতিহার','রাজপাড়া','শাহমখদুম','বাঘা','চারঘাট','দুর্গাপুর','গোদাগাড়ী','মোহনপুর','পবা','পুঠিয়া','তানোর'],
  'খুলনা': ['খুলনা সদর','সোনাডাঙ্গা','খালিশপুর','দৌলতপুর','লবণচরা','আড়ংঘাটা','বটিয়াঘাটা','দাকোপ','দিঘলিয়া','ডুমুরিয়া','ফুলতলা','কয়রা','পাইকগাছা','রূপসা','তেরখাদা'],
  'বরিশাল': ['বরিশাল সদর','কোতোয়ালি','বন্দর','আগৈলঝাড়া','বাকেরগঞ্জ','বানারীপাড়া','বাবুগঞ্জ','গৌরনদী','হিজলা','মেহেন্দিগঞ্জ','মুলাদী','উজিরপুর'],
  'সিলেট': ['সিলেট সদর','কোতোয়ালি','জালালাবাদ','এয়ারপোর্ট','মোগলাবাজার','বালাগঞ্জ','বিয়ানীবাজার','বিশ্বনাথ','কোম্পানিগঞ্জ','দক্ষিণ সুরমা','ফেঞ্চুগঞ্জ','গোলাপগঞ্জ','গোয়াইনঘাট','জকিগঞ্জ','কানাইঘাট','ওসমানীনগর'],
  'রংপুর': ['রংপুর সদর','কোতোয়ালি','তাজহাট','বদরগঞ্জ','গঙ্গাচড়া','কাউনিয়া','মিঠাপুকুর','পীরগঞ্জ','পীরগাছা','তারাগঞ্জ'],
  'ময়মনসিংহ': ['ময়মনসিংহ সদর','কোতোয়ালি','ভালুকা','ধোবাউড়া','ফুলবাড়িয়া','গফরগাঁও','গৌরীপুর','হালুয়াঘাট','ঈশ্বরগঞ্জ','মুক্তাগাছা','নান্দাইল','ফুলপুর','তারাকান্দা','ত্রিশাল'],
  'নারায়ণগঞ্জ': ['নারায়ণগঞ্জ সদর','বন্দর','আড়াইহাজার','রূপগঞ্জ','সোনারগাঁও','ফতুল্লা','সিদ্ধিরগঞ্জ'],
  'গাজীপুর': ['গাজীপুর সদর','জয়দেবপুর','কালিয়াকৈর','কালীগঞ্জ','কাপাসিয়া','শ্রীপুর','টঙ্গী'],
  'টাঙ্গাইল': ['টাঙ্গাইল সদর','বাসাইল','ভূঞাপুর','দেলদুয়ার','ঘাটাইল','গোপালপুর','কালিহাতি','মধুপুর','মির্জাপুর','নাগরপুর','সখীপুর','ধনবাড়ী'],
  'কিশোরগঞ্জ': ['কিশোরগঞ্জ সদর','অষ্টগ্রাম','বাজিতপুর','ভৈরব','হোসেনপুর','ইটনা','করিমগঞ্জ','কটিয়াদি','কুলিয়ারচর','মিঠামইন','নিকলী','পাকুন্দিয়া','তাড়াইল'],
  'মানিকগঞ্জ': ['মানিকগঞ্জ সদর','দৌলতপুর','ঘিওর','হরিরামপুর','সাটুরিয়া','শিবালয়','সিঙ্গাইর'],
  'মুন্সিগঞ্জ': ['মুন্সিগঞ্জ সদর','গজারিয়া','লৌহজং','শ্রীনগর','সিরাজদিখান','টঙ্গীবাড়ী'],
  'নরসিংদী': ['নরসিংদী সদর','বেলাবো','মনোহরদী','পলাশ','রায়পুরা','শিবপুর'],
  'ফরিদপুর': ['ফরিদপুর সদর','আলফাডাঙ্গা','ভাঙ্গা','বোয়ালমারী','চরভদ্রাসন','মধুখালী','নগরকান্দা','সালথা','সদরপুর'],
  'গোপালগঞ্জ': ['গোপালগঞ্জ সদর','কাশিয়ানী','কোটালীপাড়া','মুকসুদপুর','টুঙ্গিপাড়া'],
  'মাদারীপুর': ['মাদারীপুর সদর','কালকিনি','রাজৈর','শিবচর','ডাসার'],
  'রাজবাড়ী': ['রাজবাড়ী সদর','বালিয়াকান্দি','গোয়ালন্দ','কালুখালী','পাংশা'],
  'শরীয়তপুর': ['শরীয়তপুর সদর','ভেদরগঞ্জ','ডামুড্যা','গোসাইরহাট','জাজিরা','নড়িয়া'],
  'ব্রাহ্মণবাড়িয়া': ['ব্রাহ্মণবাড়িয়া সদর','আখাউড়া','আশুগঞ্জ','বাঞ্ছারামপুর','কসবা','নাসিরনগর','নবীনগর','সরাইল','বিজয়নগর'],
  'কুমিল্লা': ['কুমিল্লা সদর','কুমিল্লা সদর দক্ষিণ','আদর্শ সদর','বরুড়া','ব্রাহ্মণপাড়া','বুড়িচং','চান্দিনা','চৌদ্দগ্রাম','দাউদকান্দি','দেবিদ্বার','হোমনা','লাকসাম','লালমাই','মেঘনা','মনোহরগঞ্জ','মুরাদনগর','নাঙ্গলকোট','তিতাস'],
  'চাঁদপুর': ['চাঁদপুর সদর','ফরিদগঞ্জ','হাইমচর','হাজীগঞ্জ','কচুয়া','মতলব উত্তর','মতলব দক্ষিণ','শাহরাস্তি'],
  'লক্ষ্মীপুর': ['লক্ষ্মীপুর সদর','কমলনগর','রামগঞ্জ','রামগতি','রায়পুর'],
  'নোয়াখালী': ['নোয়াখালী সদর','বেগমগঞ্জ','চাটখিল','কোম্পানিগঞ্জ','হাতিয়া','কবিরহাট','সেনবাগ','সুবর্ণচর'],
  'ফেনী': ['ফেনী সদর','ছাগলনাইয়া','দাগনভূঞা','ফুলগাজী','পরশুরাম','সোনাগাজী'],
  'কক্সবাজার': ['কক্সবাজার সদর','চকরিয়া','কুতুবদিয়া','মহেশখালী','পেকুয়া','রামু','টেকনাফ','উখিয়া'],
  'বান্দরবান': ['বান্দরবান সদর','আলীকদম','লামা','নাইক্ষ্যংছড়ি','রোয়াংছড়ি','রুমা','থানচি'],
  'খাগড়াছড়ি': ['খাগড়াছড়ি সদর','দিঘিনালা','গুইমারা','লক্ষ্মীছড়ি','মাটিরাঙ্গা','মানিকছড়ি','মহালছড়ি','পানছড়ি','রামগড়'],
  'রাঙামাটি': ['রাঙামাটি সদর','বাঘাইছড়ি','বরকল','বিলাইছড়ি','কাউখালী','কাপ্তাই','জুরাছড়ি','লংগদু','নানিয়ারচর','রাজস্থলী'],
  'হবিগঞ্জ': ['হবিগঞ্জ সদর','আজমিরীগঞ্জ','বাহুবল','বানিয়াচং','চুনারুঘাট','লাখাই','মাধবপুর','নবীগঞ্জ'],
  'মৌলভীবাজার': ['মৌলভীবাজার সদর','বড়লেখা','জুড়ী','কমলগঞ্জ','কুলাউড়া','রাজনগর','শ্রীমঙ্গল'],
  'সুনামগঞ্জ': ['সুনামগঞ্জ সদর','বিশ্বম্ভরপুর','ছাতক','দিরাই','দোয়ারাবাজার','জগন্নাথপুর','জামালগঞ্জ','ধরমপাশা','শাল্লা','তাহিরপুর'],
  'নাটোর': ['নাটোর সদর','বাগাতিপাড়া','বড়াইগ্রাম','গুরুদাসপুর','লালপুর','সিংড়া'],
  'চাঁপাইনবাবগঞ্জ': ['চাঁপাইনবাবগঞ্জ সদর','ভোলাহাট','গোমস্তাপুর','নাচোল','শিবগঞ্জ'],
  'নওগাঁ': ['নওগাঁ সদর','আত্রাই','বদলগাছি','ধামইরহাট','মান্দা','মহাদেবপুর','নিয়ামতপুর','পত্নীতলা','পোরশা','রানীনগর','সাপাহার'],
  'বগুড়া': ['বগুড়া সদর','আদমদীঘি','ধুনট','দুপচাঁচিয়া','গাবতলী','কাহালু','নন্দীগ্রাম','শাহজাহানপুর','শেরপুর','শিবগঞ্জ','সারিয়াকান্দি','সোনাতলা'],
  'জয়পুরহাট': ['জয়পুরহাট সদর','আক্কেলপুর','কালাই','ক্ষেতলাল','পাঁচবিবি'],
  'পাবনা': ['পাবনা সদর','আটঘরিয়া','বেড়া','ভাঙ্গুড়া','চাটমোহর','ফরিদপুর','ঈশ্বরদী','সাঁথিয়া','সুজানগর'],
  'সিরাজগঞ্জ': ['সিরাজগঞ্জ সদর','বেলকুচি','চৌহালি','কামারখন্দ','কাজীপুর','রায়গঞ্জ','শাহজাদপুর','তাড়াশ','উল্লাপাড়া'],
  'যশোর': ['যশোর সদর','অভয়নগর','বাঘারপাড়া','চৌগাছা','ঝিকরগাছা','কেশবপুর','মণিরামপুর','শার্শা'],
  'সাতক্ষীরা': ['সাতক্ষীরা সদর','আশাশুনি','দেবহাটা','কালিগঞ্জ','কলারোয়া','শ্যামনগর','তালা'],
  'মেহেরপুর': ['মেহেরপুর সদর','গাংনী','মুজিবনগর'],
  'নড়াইল': ['নড়াইল সদর','কালিয়া','লোহাগড়া'],
  'কুষ্টিয়া': ['কুষ্টিয়া সদর','ভেড়ামারা','দৌলতপুর','খোকসা','কুমারখালী','মিরপুর'],
  'চুয়াডাঙ্গা': ['চুয়াডাঙ্গা সদর','আলমডাঙ্গা','দামুড়হুদা','জীবননগর'],
  'ঝিনাইদহ': ['ঝিনাইদহ সদর','হরিণাকুণ্ডু','কালীগঞ্জ','কোটচাঁদপুর','মহেশপুর','শৈলকুপা'],
  'মাগুরা': ['মাগুরা সদর','মহম্মদপুর','শালিখা','শ্রীপুর'],
  'বাগেরহাট': ['বাগেরহাট সদর','চিতলমারী','ফকিরহাট','কচুয়া','মংলা','মোরেলগঞ্জ','মোল্লাহাট','রামপাল','শরণখোলা'],
  'পিরোজপুর': ['পিরোজপুর সদর','ভান্ডারিয়া','কাউখালী','মঠবাড়িয়া','নাজিরপুর','নেছারাবাদ','ইন্দুরকানী'],
  'ঝালকাঠি': ['ঝালকাঠি সদর','কাঠালিয়া','নলছিটি','রাজাপুর'],
  'পটুয়াখালী': ['পটুয়াখালী সদর','বাউফল','দশমিনা','গলাচিপা','কলাপাড়া','মির্জাগঞ্জ','রাঙ্গাবালী'],
  'বরগুনা': ['বরগুনা সদর','আমতলী','বামনা','বেতাগী','পাথরঘাটা','তালতলী'],
  'ভোলা': ['ভোলা সদর','বোরহানউদ্দিন','চরফ্যাশন','দৌলতখান','লালমোহন','মনপুরা','তজুমদ্দিন'],
  'দিনাজপুর': ['দিনাজপুর সদর','বিরামপুর','বিরল','বোচাগঞ্জ','চিরিরবন্দর','ফুলবাড়ী','ঘোড়াঘাট','হাকিমপুর','খানসামা','নবাবগঞ্জ','পার্বতীপুর'],
  'ঠাকুরগাঁও': ['ঠাকুরগাঁও সদর','বালিয়াডাঙ্গী','হরিপুর','পীরগঞ্জ','রানীশংকৈল'],
  'পঞ্চগড়': ['পঞ্চগড় সদর','আটোয়ারী','বোদা','দেবীগঞ্জ','তেঁতুলিয়া'],
  'নীলফামারী': ['নীলফামারী সদর','ডিমলা','ডোমার','জলঢাকা','কিশোরগঞ্জ','সৈয়দপুর'],
  'লালমনিরহাট': ['লালমনিরহাট সদর','আদিতমারী','হাতীবান্ধা','কালীগঞ্জ','পাটগ্রাম'],
  'কুড়িগ্রাম': ['কুড়িগ্রাম সদর','ভূরুঙ্গামারী','চর রাজিবপুর','চিলমারী','ফুলবাড়ী','নাগেশ্বরী','রাজারহাট','রৌমারী','উলিপুর'],
  'গাইবান্ধা': ['গাইবান্ধা সদর','ফুলছড়ি','গোবিন্দগঞ্জ','পলাশবাড়ী','সাদুল্লাপুর','সাঘাটা','সুন্দরগঞ্জ'],
  'জামালপুর': ['জামালপুর সদর','বকশীগঞ্জ','দেওয়ানগঞ্জ','ইসলামপুর','মাদারগঞ্জ','মেলান্দহ','সরিষাবাড়ী'],
  'শেরপুর': ['শেরপুর সদর','ঝিনাইগাতী','নকলা','নালিতাবাড়ী','শ্রীবরদী'],
  'নেত্রকোনা': ['নেত্রকোনা সদর','আটপাড়া','বারহাট্টা','দুর্গাপুর','খালিয়াজুরী','কলমাকান্দা','কেন্দুয়া','মদন','মোহনগঞ্জ','পূর্বধলা'],
}

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
const NAGAD_NUMBER   = '01972312458'

const inp  = 'w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white text-stone-800 text-sm transition-all'
const lbl  = 'block text-xs font-bold text-stone-500 mb-1.5 uppercase tracking-wider'

export default function OrderForm() {
  const [selectedId, setSelectedId] = useState('5kg')
  const [qty, setQty]               = useState(1)
  const [name, setName]             = useState('')
  const [phone, setPhone]           = useState('')
  const [address, setAddress]       = useState('')
  const [district, setDistrict]     = useState('')
  const [thana, setThana]           = useState('')
  const [payment, setPayment]       = useState('cod')
  const [txId, setTxId]             = useState('')
  const [note, setNote]             = useState('')
  const [loading,      setLoading]      = useState(false)
  const [success,      setSuccess]      = useState(false)
  const [trackingCode, setTrackingCode] = useState('')
  const [error,        setError]        = useState('')
  const [copied,       setCopied]       = useState<string | null>(null)

  const pkg          = PACKAGES.find(p => p.id === selectedId)!
  const productTotal = pkg.price * qty
  const totalKg      = pkg.kg * qty
  const deliveryAmt  = totalKg * DELIVERY_PER_KG
  const grandTotal   = productTotal + deliveryAmt
  const isPrePaid    = payment === 'bkash_personal' || payment === 'bkash_merchant' || payment === 'nagad'

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!district)           { setError('জেলা সিলেক্ট করুন।'); return }
    if (!thana)              { setError('থানা সিলেক্ট করুন।'); return }
    if (isPrePaid && !txId)  { setError('ট্রানজেকশন ID দিন।'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, address, district, thana,
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
        setTimeout(() => {
          document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
        setName(''); setPhone(''); setAddress(''); setDistrict('')
        setTxId(''); setNote(''); setQty(1); setSelectedId('5kg'); setPayment('cod'); setThana('')
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
              className="text-xs underline text-green-700 cursor-pointer"
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
                          className="w-9 h-9 flex items-center justify-center text-base font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
                          className="w-9 h-9 flex items-center justify-center text-base font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>জেলা *</label>
                    <select className={inp} value={district} onChange={e => { setDistrict(e.target.value); setThana('') }} required>
                      <option value="">জেলা বেছে নিন</option>
                      {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>থানা *</label>
                    <select
                      className={inp}
                      value={thana}
                      onChange={e => setThana(e.target.value)}
                      required
                      disabled={!district}
                      style={{ opacity: district ? 1 : 0.5, cursor: district ? 'pointer' : 'not-allowed' }}
                    >
                      <option value="">{district ? 'থানা বেছে নিন' : 'আগে জেলা দিন'}</option>
                      {(THANAS[district] ?? []).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
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

              {/* Payment option cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {[
                  { id: 'cod',            label: 'ক্যাশ অন ডেলিভারি', sub: 'পণ্য পেয়ে পরিশোধ', logo: <span className="text-[2rem]">💵</span>, accent: 'var(--color-primary)', bg: 'var(--color-primary-pale)', border: 'var(--color-primary)' },
                  { id: 'bkash_personal', label: 'বিকাশ পার্সোনাল',   sub: 'Send Money',         logo: <BkashLogo size={34} />,               accent: '#E2136E',              bg: '#fff0f6',                   border: '#E2136E' },
                  { id: 'bkash_merchant', label: 'বিকাশ মার্চেন্ট',   sub: 'Make Payment',       logo: <BkashLogo size={34} />,               accent: '#E2136E',              bg: '#fff0f6',                   border: '#E2136E' },
                  { id: 'nagad',          label: 'নগদ',                sub: 'Send Money',         logo: <NagadLogo size={34} />,               accent: '#E05C00',              bg: '#fff7f0',                   border: '#FF6600' },
                ].map(pm => {
                  const active = payment === pm.id
                  return (
                    <label
                      key={pm.id}
                      className="flex flex-col items-center gap-1.5 p-3 md:p-4 rounded-2xl border-2 cursor-pointer transition-all text-center select-none min-w-0"
                      style={{
                        borderColor: active ? pm.border : '#e5e7eb',
                        background:  active ? pm.bg     : 'white',
                        boxShadow:   active ? `0 0 0 3px ${pm.border}22` : 'none',
                      }}
                    >
                      <input type="radio" name="payment" value={pm.id} checked={active} onChange={() => { setPayment(pm.id); setTxId('') }} className="hidden" />
                      {pm.logo}
                      <span className="text-xs font-bold leading-tight w-full" style={{ color: active ? pm.accent : '#374151' }}>
                        {pm.label}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap" style={{
                        background: active ? pm.accent : '#f3f4f6',
                        color:      active ? 'white'   : '#6b7280',
                      }}>
                        {pm.sub}
                      </span>
                    </label>
                  )
                })}
              </div>

              {/* Pre-paid info box */}
              {isPrePaid && (() => {
                const isBkash = payment.startsWith('bkash')
                const number  = payment === 'bkash_personal' ? BKASH_PERSONAL : payment === 'bkash_merchant' ? BKASH_MERCHANT : NAGAD_NUMBER
                const accent  = isBkash ? '#E2136E' : '#E05C00'
                const bg      = isBkash ? '#fff0f6'  : '#fff7f0'
                const border  = isBkash ? '#fda4af'  : '#fdba74'
                const numId   = `num-${payment}`
                const steps   = isBkash
                  ? payment === 'bkash_personal'
                    ? ['বিকাশ অ্যাপ খুলুন → Send Money', `নম্বরে পাঠান: ${number}`, 'Transaction ID কপি করুন', 'নিচের ঘরে লিখুন']
                    : ['বিকাশ অ্যাপ খুলুন → Make Payment', `নম্বরে পেমেন্ট করুন: ${number}`, 'Transaction ID কপি করুন', 'নিচের ঘরে লিখুন']
                  : ['নগদ অ্যাপ খুলুন → Send Money', `নম্বরে পাঠান: ${number}`, 'Transaction ID কপি করুন', 'নিচের ঘরে লিখুন']

                return (
                  <div className="rounded-2xl p-5 space-y-4" style={{ background: bg, border: `1.5px solid ${border}` }}>

                    {/* Header */}
                    <div className="flex items-center gap-2.5">
                      {isBkash ? <BkashLogo size={26} /> : <NagadLogo size={26} />}
                      <p className="font-bold text-sm" style={{ color: accent }}>
                        {isBkash ? 'বিকাশে' : 'নগদে'} পেমেন্ট করার নিয়ম
                      </p>
                    </div>

                    {/* Number box with copy */}
                    <div
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl px-4 py-3"
                      style={{ background: 'white', border: `1px solid ${border}` }}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold mb-0.5" style={{ color: accent }}>
                          {isBkash ? (payment === 'bkash_personal' ? 'Personal Number' : 'Merchant Number') : 'Nagad Number'}
                        </p>
                        <p className="font-bold text-xl tracking-wider" style={{ color: accent }}>
                          {number}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(number, numId)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                        style={{
                          background: copied === numId ? '#d1fae5' : `${accent}15`,
                          color:      copied === numId ? '#065f46'  : accent,
                          border:     `1.5px solid ${copied === numId ? '#6ee7b7' : accent}`,
                        }}
                      >
                        {copied === numId ? '✓ কপি হয়েছে!' : '⎘ কপি করুন'}
                      </button>
                    </div>

                    {/* Steps */}
                    <ol className="space-y-1.5">
                      {steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: accent }}>
                          <span
                            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-bold text-white text-xs"
                            style={{ background: accent, marginTop: '1px' }}
                          >
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>

                    {/* Transaction ID */}
                    <div>
                      <label className={lbl} style={{ color: accent }}>ট্রানজেকশন ID *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-white text-stone-800 text-sm transition-all"
                        style={{ border: `2px solid ${border}`, outline: 'none' }}
                        onFocus={e => (e.currentTarget.style.borderColor = accent)}
                        onBlur={e  => (e.currentTarget.style.borderColor = border)}
                        placeholder="যেমন: 8HJ3K2LM9N"
                        value={txId}
                        onChange={e => setTxId(e.target.value)}
                        required={isPrePaid}
                      />
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* ── Submit ── */}
            <div className="rounded-b-3xl p-6 md:p-8 pt-0" style={{ background: 'white' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full font-bold py-4 rounded-2xl text-base text-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
