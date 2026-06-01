export default function ContactBar() {
  return (
    <div id="contact" className="py-6 px-4" style={{ background: 'var(--color-primary)' }}>
      <div
        className="max-w-4xl mx-auto rounded-2xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div>
          <p className="font-bold text-white text-lg mb-0.5">📞 সরাসরি যোগাযোগ করুন</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            অর্ডার, ডেলিভারি বা যেকোনো প্রশ্নে আমরা সবসময় প্রস্তুত
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="tel:+8801972312458"
            className="btn-accent inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-full text-sm"
            style={{ boxShadow: '0 4px 16px rgba(232,114,30,0.4)' }}
          >
            📱 কল করুন
          </a>
          <a
            href="https://wa.me/8801972312458"
            className="btn-whatsapp inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-full text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
