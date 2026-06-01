export default function ContactBar() {
  return (
    <div id="contact" style={{ background: 'var(--color-primary)' }} className="text-white py-5">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        <p className="font-semibold text-lg">📞 প্রয়োজনে যোগাযোগ করুন:</p>
        <a
          href="tel:+8801XXXXXXXXX"
          className="btn-accent font-bold px-5 py-2.5 rounded-full"
        >
          📱 01X-XXXXXXXX
        </a>
        <a
          href="https://wa.me/880XXXXXXXXX"
          className="btn-whatsapp font-bold px-5 py-2.5 rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 WhatsApp করুন
        </a>
      </div>
    </div>
  )
}
