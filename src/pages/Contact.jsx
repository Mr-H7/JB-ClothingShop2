import { useState } from 'react'
import GoldDivider from '../components/GoldDivider'
import { useLang } from '../contexts/LangContext'

export default function Contact() {
  const { lang, t }          = useLang()
  const tc                   = t.contact

  const [submitted,      setSubmitted]      = useState(false)
  const [newsletterDone, setNewsletterDone] = useState(false)
  const [nlEmail,        setNlEmail]        = useState('')
  const [openFaq,        setOpenFaq]        = useState(null)
  const [form, setForm] = useState({ email: '', phone: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ email: '', phone: '', message: '' })
  }

  const contactDetails = [
    {
      id: 'address',
      label: tc.visitLabel,
      value: '14 Savile Row, Mayfair\nLondon, W1S 3JN',
      sub:   tc.visitSub,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      id: 'phone',
      label: tc.callLabel,
      value: '+44 (0) 20 7946 0958',
      sub:   tc.callSub,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      id: 'email',
      label: tc.emailLabel,
      value: 'hello@jbclothing.co.uk',
      sub:   tc.emailSub,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.06) 0%, transparent 60%),
              linear-gradient(180deg, #0a0a0a 0%, #0f0d08 60%, #0a0a0a 100%)
            `,
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

        <div className="container-luxury relative z-10 text-center">
          <div className="animate-fade-up">
            <div className="flex items-center justify-center gap-5 mb-5">
              <span className="flex-1 max-w-[60px] h-px bg-gradient-to-r from-transparent to-gold/50" />
              <p className="label-gold tracking-[0.35em]">{tc.heroBadge}</p>
              <span className="flex-1 max-w-[60px] h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <h1 className="heading-luxury text-5xl sm:text-6xl md:text-7xl text-white leading-tight">
              {tc.heroH1a}<br />
              <span className="text-gradient-gold">{tc.heroH1b}</span>
            </h1>
            <GoldDivider variant="ornament" className="max-w-xs mx-auto mt-6" />
            <p className="text-[#5a5a5a] font-light max-w-md mx-auto text-sm md:text-base leading-relaxed">
              {tc.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CONTACT DETAIL CARDS
      ════════════════════════════════════════════════════════ */}
      <section className="border-y border-[#1a1a1a]">
        <div className="container-luxury py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactDetails.map(({ id, label, value, sub, icon }) => (
              <div key={id} className="luxury-card group p-8 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 border border-[#2a2a2a] group-hover:border-gold/40 flex items-center justify-center text-[#4a4a4a] group-hover:text-gold transition-all duration-300 rounded-full">
                  {icon}
                </div>
                <p className="label-gold">{label}</p>
                <p className="font-serif text-base text-white whitespace-pre-line leading-snug">{value}</p>
                <p className="text-[#3a3a3a] text-xs font-light">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          NEWSLETTER STRIP
      ════════════════════════════════════════════════════════ */}
      <section
        className="border-b border-[#1a1a1a]"
        style={{ background: 'linear-gradient(180deg, #0f0e09 0%, #0a0a0a 100%)' }}
      >
        <div className="container-luxury py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="label-gold mb-2">{tc.nlBadge}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-white">{tc.nlTitle}</h2>
              <p className="text-[#4a4a4a] text-sm font-light mt-2">{tc.nlSub}</p>
            </div>

            {newsletterDone ? (
              <div className="flex items-center gap-3 text-gold text-sm font-semibold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {tc.nlDone}
              </div>
            ) : (
              <form
                className="flex gap-0 flex-1 max-w-md"
                onSubmit={e => { e.preventDefault(); setNewsletterDone(true); setNlEmail('') }}
              >
                <input
                  type="email" required
                  value={nlEmail}
                  onChange={e => setNlEmail(e.target.value)}
                  placeholder={lang === 'FR' ? 'Votre adresse email' : 'Your email address'}
                  className="input-luxury rounded-none rounded-l-full flex-1 border-r-0 text-sm"
                />
                <button type="submit" className="btn-gold-solid rounded-none rounded-r-full px-7 text-[0.6rem] whitespace-nowrap">
                  {tc.nlCta}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FORM + MAP
      ════════════════════════════════════════════════════════ */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-gold mb-3">{tc.formBadge}</p>
            <h2 className="heading-luxury text-4xl md:text-5xl text-white">{tc.formTitle}</h2>
            <GoldDivider variant="ornament" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Contact Form ── */}
            <div>
              {submitted ? (
                <div className="luxury-card p-14 text-center border-gold/25 h-full flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-5 bg-gold/10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">{tc.formSentH}</h3>
                  <p className="text-[#5a5a5a] text-sm font-light max-w-xs mx-auto leading-relaxed">{tc.formSentP}</p>
                  <GoldDivider variant="ornament" className="max-w-[140px] mx-auto mt-6" />
                  <button onClick={() => setSubmitted(false)} className="btn-gold mt-5 py-2.5 px-8 text-[0.6rem]">
                    <span>{tc.formSentBtn}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="luxury-card p-8 md:p-10 space-y-5 h-full">
                  <div>
                    <label className="label-gold block mb-2">{tc.formEmail} <span className="text-gold/50">*</span></label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      className="input-luxury"
                      placeholder={lang === 'FR' ? 'votre@email.com' : 'your@email.com'}
                    />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">{tc.formPhone}</label>
                    <input
                      type="tel" name="phone"
                      value={form.phone} onChange={handleChange}
                      className="input-luxury"
                      placeholder="+44 7700 000000"
                    />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">{tc.formMsg} <span className="text-gold/50">*</span></label>
                    <textarea
                      name="message" required rows={6}
                      value={form.message} onChange={handleChange}
                      className="input-luxury resize-none"
                      placeholder={lang === 'FR' ? 'Comment pouvons-nous vous aider ?' : 'How can we assist you today?'}
                    />
                  </div>
                  <GoldDivider />
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[#3a3a3a] text-xs font-light">
                      {lang === 'FR' ? 'Réponse sous 24 heures.' : 'We reply within 24 hours.'}
                    </p>
                    <button type="submit" className="btn-gold-solid px-8">{tc.formSubmit}</button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Map Block ── */}
            <div className="flex flex-col gap-5">
              <div className="luxury-card overflow-hidden flex-1" style={{ minHeight: '400px' }}>
                {/* Gold frame header */}
                <div className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between bg-[#111111]">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-gold">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <p className="label-gold text-[0.52rem]">
                        {lang === 'FR' ? 'Notre Boutique' : 'Our Flagship'}
                      </p>
                      <p className="text-white text-xs font-light">14 Savile Row, Mayfair, London</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Savile+Row+Mayfair+London"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4a4a4a] hover:text-gold transition-colors text-[0.58rem] tracking-widest uppercase"
                  >
                    {tc.openMaps}
                  </a>
                </div>

                {/* Map iframe — dark CSS filter to match luxury dark aesthetic */}
                <div className="relative" style={{ height: 'calc(100% - 60px)', minHeight: '340px' }}>
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.25) 100%)',
                    }}
                  />
                  <iframe
                    title="JB Clothing — 14 Savile Row, Mayfair, London"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1435%2C51.5080%2C-0.1395%2C51.5110&layer=mapnik&marker=51.5095%2C-0.1415"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 0,
                      filter: 'invert(90%) hue-rotate(175deg) brightness(0.85) contrast(0.9)',
                    }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Store hours */}
              <div className="luxury-card p-6">
                <p className="label-gold mb-4">{tc.storeHoursBadge}</p>
                <div className="space-y-2">
                  {tc.hoursRows.map(({ days, hours }) => (
                    <div key={days} className="flex items-center justify-between">
                      <span className="text-[#5a5a5a] text-xs font-light">{days}</span>
                      <span className="text-gold text-xs font-semibold tracking-wider">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════ */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-gold mb-3">{tc.faqBadge}</p>
              <h2 className="heading-luxury text-4xl text-white">{tc.faqTitle}</h2>
              <GoldDivider variant="ornament" />
            </div>

            <div className="space-y-2">
              {tc.faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`luxury-card overflow-hidden transition-all duration-400 ${openFaq === i ? 'border-gold/30' : ''}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className={`font-serif text-base transition-colors duration-300 ${openFaq === i ? 'text-gold' : 'text-white'}`}>
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 ml-4 w-7 h-7 border flex items-center justify-center text-sm transition-all duration-300 ${
                      openFaq === i ? 'border-gold text-gold rotate-45' : 'border-[#2a2a2a] text-[#4a4a4a]'
                    }`}>
                      +
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="px-6 pb-6">
                      <div className="gold-divider mb-4" />
                      <p className="text-[#6a6a6a] text-sm font-light leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FLOATING WHATSAPP
      ════════════════════════════════════════════════════════ */}
      <a
        href="https://wa.me/447700900958"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group animate-float"
        aria-label={tc.whatsappTip}
      >
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#111111] border border-[#2a2a2a] text-white text-xs px-4 py-2 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {tc.whatsappTip}
          <span className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#111111] border-r border-b border-[#2a2a2a] rotate-45" />
        </span>

        {/* Button */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110"
          style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8D5A3 50%, #C9A84C 100%)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#0a0a0a">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </div>
        <span className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping" />
      </a>
    </div>
  )
}
