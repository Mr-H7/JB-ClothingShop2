import { useState } from 'react'
import GoldDivider from '../components/GoldDivider'

/* ── Collaboration type cards ─────────────────────────────────────────────── */
const collabTypes = [
  {
    id: 'influencer',
    label: 'Influencer Collaboration',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    headline: 'Influencer Collaboration',
    desc: 'Partner with JB Clothing to co-create editorial content, exclusive capsule drops, or ambassador campaigns. We work with creators who embody the spirit of understated luxury.',
    badge: 'For Creators',
    highlights: ['Co-branded capsule collections', 'Exclusive gifting & allowances', 'Editorial content creation', 'Social media partnership'],
  },
  {
    id: 'boutique',
    label: 'Boutique Partnership',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    headline: 'Boutique Partnership',
    desc: 'Carry JB Clothing in your premium retail space. We offer curated wholesale programmes, exclusive regional arrangements, and in-store styling support for boutique partners who share our vision.',
    badge: 'For Retailers',
    highlights: ['Wholesale & consignment options', 'Regional exclusivity available', 'Dedicated account manager', 'In-store visual merchandising'],
  },
  {
    id: 'campaign',
    label: 'Fashion Campaign',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    headline: 'Fashion Campaign',
    desc: 'Collaborate on editorial shoots, runway presentations, fashion films, or digital campaigns. We welcome photographers, stylists, creative directors, and production houses.',
    badge: 'For Creatives',
    highlights: ['Editorial & campaign shoots', 'Runway show dressing', 'Fashion film production', 'Cross-brand storytelling'],
  },
  {
    id: 'brand',
    label: 'Brand Proposal',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    headline: 'Brand Proposal',
    desc: 'Have a unique partnership concept in mind? We welcome open proposals from luxury brands, hospitality groups, arts organisations, and aligned businesses looking to build something extraordinary.',
    badge: 'Open Proposals',
    highlights: ['Co-branding opportunities', 'Hospitality & events dressing', 'Licensing discussions', 'Strategic brand alliances'],
  },
]

/* ── Partnership stats ────────────────────────────────────────────────────── */
const stats = [
  { value: '120+', label: 'Partners Worldwide' },
  { value: '38',   label: 'Countries Present' },
  { value: '£2M+', label: 'Partner Revenue Generated' },
  { value: '94%',  label: 'Partner Retention Rate' },
]

/* ── Testimonials ─────────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote: 'Working with JB Clothing elevated the entire perception of our boutique. Their approach to partnership is genuinely collaborative — not transactional.',
    author: 'Isabelle Fontaine',
    title: 'Owner, Maison Fontaine — Paris',
  },
  {
    quote: 'The capsule collection we created together sold out within 48 hours. JB Clothing understands the luxury audience at a level few brands do.',
    author: 'Marcus Webb',
    title: 'Creative Director & Influencer, 1.2M followers',
  },
]

export default function Collaboration() {
  const [selected,  setSelected]  = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', type: '', message: '',
  })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Deep radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 65%),
              linear-gradient(180deg, #0a0a0a 0%, #0f0e09 50%, #0a0a0a 100%)
            `,
          }}
        />
        {/* Fine texture lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,76,0.6) 40px, rgba(201,168,76,0.6) 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,76,0.6) 40px, rgba(201,168,76,0.6) 41px)
            `,
          }}
        />

        {/* Decorative corner brackets */}
        <div className="absolute top-28 left-8 w-16 h-16 border-t border-l border-gold/20" />
        <div className="absolute top-28 right-8 w-16 h-16 border-t border-r border-gold/20" />
        <div className="absolute bottom-10 left-8 w-16 h-16 border-b border-l border-gold/20" />
        <div className="absolute bottom-10 right-8 w-16 h-16 border-b border-r border-gold/20" />

        <div className="container-luxury relative z-10 text-center">
          <div className="animate-fade-up">
            <div className="flex items-center justify-center gap-5 mb-6">
              <span className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-gold/60" />
              <p className="label-gold tracking-[0.35em]">Partnerships &amp; Collaboration</p>
              <span className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>

            <h1 className="heading-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6">
              Interested in
              <br />
              <span className="text-gradient-gold">Collaboration?</span>
            </h1>

            <p className="font-display text-xl md:text-2xl text-[#9a8a6a] font-light tracking-wide mt-6 mb-3">
              Let&apos;s build something exceptional together.
            </p>
            <p className="text-[#4a4a4a] font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed mt-4 mb-12">
              We forge meaningful partnerships with creators, boutiques, and brands who share our
              dedication to craft, refinement, and the art of luxury dressing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#collab-form" className="btn-gold-solid">
                Submit a Proposal
              </a>
              <a href="#collab-types" className="btn-gold">
                <span>Explore Partnership Types</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════════════════════ */}
      <section className="border-y border-[#1e1e1e]">
        <div className="container-luxury py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-3xl md:text-4xl text-gradient-gold font-bold mb-1">{value}</p>
                <p className="text-[#3a3a3a] text-[0.6rem] tracking-[0.25em] uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          COLLABORATION TYPE CARDS
      ════════════════════════════════════════════════════════════ */}
      <section id="collab-types" className="section-luxury">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-gold mb-3">Partnership Formats</p>
            <h2 className="heading-luxury text-4xl md:text-5xl text-white">
              How We Collaborate
            </h2>
            <GoldDivider variant="ornament" />
            <p className="text-[#5a5a5a] font-light max-w-lg mx-auto text-sm leading-relaxed">
              Choose the format that aligns with your vision — or propose something entirely original.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {collabTypes.map((type, i) => (
              <div
                key={type.id}
                onClick={() => setSelected(selected === type.id ? null : type.id)}
                className={`luxury-card group cursor-pointer p-8 transition-all duration-500 animate-fade-up delay-${(i + 1) * 100} ${
                  selected === type.id
                    ? 'border-gold/50 bg-[#161408] shadow-[0_0_40px_rgba(201,168,76,0.12)]'
                    : ''
                }`}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                    selected === type.id
                      ? 'border-gold text-gold bg-gold/10'
                      : 'border-[#2a2a2a] text-[#4a4a4a] group-hover:border-gold/40 group-hover:text-gold/60'
                  }`}>
                    {type.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`label-gold text-[0.5rem] border px-2.5 py-1 rounded-full transition-colors duration-300 ${
                        selected === type.id ? 'border-gold/50 bg-gold/10' : 'border-[#2a2a2a]'
                      }`}>
                        {type.badge}
                      </span>
                      <span className={`text-lg transition-all duration-300 ${
                        selected === type.id ? 'text-gold rotate-45' : 'text-[#3a3a3a] group-hover:text-gold/40'
                      }`}>+</span>
                    </div>
                    <h3 className={`font-serif text-xl mb-2 transition-colors duration-300 ${
                      selected === type.id ? 'text-gold' : 'text-white group-hover:text-gold'
                    }`}>
                      {type.headline}
                    </h3>
                    <p className="text-[#5a5a5a] text-sm font-light leading-relaxed">{type.desc}</p>
                  </div>
                </div>

                {/* Expanded highlights */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    selected === type.id ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="gold-divider mb-5" />
                  <ul className="grid grid-cols-2 gap-2">
                    {type.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-[#6a6a6a] text-xs">
                        <span className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-5 btn-gold py-2 px-6 text-[0.58rem]"
                    onClick={e => { e.stopPropagation(); document.getElementById('collab-form').scrollIntoView({ behavior: 'smooth' }) }}
                  >
                    <span>Apply for This Type</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════════════════════════════════════════════════
          EDITORIAL VISUAL STRIP
      ════════════════════════════════════════════════════════════ */}
      <section className="section-luxury overflow-hidden">
        <div className="container-luxury">
          <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
            {/* Textured dark block */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background: `linear-gradient(135deg, #121008 0%, #1a1608 50%, #0e0d08 100%)`,
              }}
            />
            {/* Gold line grid */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, rgba(201,168,76,1) 0px, rgba(201,168,76,1) 1px, transparent 1px, transparent 48px),
                  repeating-linear-gradient(0deg, rgba(201,168,76,1) 0px, rgba(201,168,76,1) 1px, transparent 1px, transparent 48px)
                `,
              }}
            />
            {/* Central radial */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(ellipse 50% 80% at 50% 50%, rgba(201,168,76,0.3) 0%, transparent 70%)',
              }}
            />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full py-20 px-8 text-center">
              <p className="label-gold mb-4 tracking-[0.4em]">Our Philosophy</p>
              <h2 className="font-display text-3xl md:text-5xl text-white font-light tracking-wide leading-relaxed">
                &ldquo;True partnership is built on<br />
                <em className="text-gradient-gold">shared values</em>, not just shared visibility.&rdquo;
              </h2>
              <GoldDivider variant="ornament" className="max-w-xs mx-auto" />
              <p className="text-[#5a5a5a] text-sm font-light max-w-md">
                We only enter collaborations where both parties are genuinely invested in creating something of lasting quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════════ */}
      <section className="section-luxury border-t border-[#1e1e1e]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="label-gold mb-3">Partner Voices</p>
            <h2 className="heading-luxury text-4xl text-white">What Partners Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ quote, author, title }) => (
              <div key={author} className="luxury-card p-10">
                {/* Large quote mark */}
                <div
                  className="font-serif text-6xl text-gold/20 leading-none mb-4"
                  style={{ fontFamily: 'Georgia', lineHeight: 0.8 }}
                >
                  &ldquo;
                </div>
                <p className="font-display text-lg md:text-xl text-[#c0a870] font-light italic leading-relaxed mb-8">
                  {quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-gold/20 flex items-center justify-center">
                    <span className="text-gold text-xs font-serif font-bold">{author[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold font-serif">{author}</p>
                    <p className="text-[#4a4a4a] text-xs">{title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════════════════════════════════════════════════
          COLLABORATION FORM
      ════════════════════════════════════════════════════════════ */}
      <section id="collab-form" className="section-luxury">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-14">
              <p className="label-gold mb-3">Ready to Begin?</p>
              <h2 className="heading-luxury text-4xl md:text-5xl text-white">Submit Your Request</h2>
              <GoldDivider variant="ornament" />
              <p className="text-[#5a5a5a] font-light text-sm max-w-md mx-auto">
                Tell us about your vision. Our partnerships team will respond within 2 business days.
              </p>
            </div>

            {submitted ? (
              <div className="luxury-card p-16 text-center border-gold/30">
                <div
                  className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6 bg-gold/10"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">Request Received</h3>
                <p className="text-[#5a5a5a] font-light text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Our partnerships team will review your proposal and respond within 2 business days.
                </p>
                <GoldDivider variant="ornament" className="max-w-xs mx-auto mt-6" />
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold mt-6 py-2.5 px-8 text-[0.6rem]"
                >
                  <span>Submit Another</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="luxury-card p-8 md:p-12 space-y-6"
              >
                {/* Decorative inner border */}
                <div className="absolute inset-3 border border-gold/5 pointer-events-none rounded-sm" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="label-gold block mb-2">Full Name <span className="text-gold/50">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="input-luxury"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="label-gold block mb-2">Email Address <span className="text-gold/50">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="input-luxury"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="label-gold block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="input-luxury"
                      placeholder="+44 7700 000000"
                    />
                  </div>

                  {/* Collaboration Type */}
                  <div>
                    <label className="label-gold block mb-2">Collaboration Type <span className="text-gold/50">*</span></label>
                    <select
                      name="type"
                      required
                      value={form.type}
                      onChange={handleChange}
                      className="input-luxury appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A84C' stroke-width='1.5'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1.2rem center',
                      }}
                    >
                      <option value="" disabled>Select type</option>
                      {collabTypes.map(t => (
                        <option key={t.id} value={t.id} style={{ background: '#111111' }}>
                          {t.headline}
                        </option>
                      ))}
                      <option value="other" style={{ background: '#111111' }}>Other / Open Proposal</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="label-gold block mb-2">Your Message <span className="text-gold/50">*</span></label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="input-luxury resize-none"
                    placeholder="Tell us about your idea, audience, brand, and what you envision achieving through this collaboration..."
                  />
                  <p className="text-[#3a3a3a] text-[0.6rem] mt-1.5 tracking-wide">
                    The more detail you share, the better we can assess alignment.
                  </p>
                </div>

                {/* Divider */}
                <GoldDivider />

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-[#3a3a3a] text-xs font-light">
                    We respect your privacy. Your details will never be shared with third parties.
                  </p>
                  <button type="submit" className="btn-gold-solid whitespace-nowrap px-10">
                    Submit Collaboration Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BOTTOM ELEGANT SEPARATOR
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-luxury text-center">
          <p className="label-gold mb-3 tracking-[0.4em]">JB Clothing</p>
          <p className="font-display text-2xl md:text-3xl text-[#3a3a3a] font-light tracking-wider">
            Crafted for the Discerning Few
          </p>
          <GoldDivider variant="ornament" className="max-w-xs mx-auto mt-6" />
        </div>
      </section>
    </div>
  )
}
