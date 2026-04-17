import { useState } from 'react'
import GoldDivider from '../components/GoldDivider'
import { useLang } from '../contexts/LangContext'

/* ── Bilingual collaboration type cards ───────────────────────────────────── */
const collabTypes = [
  {
    id: 'influencer',
    badge:     { FR: 'Pour les Créateurs',   EN: 'For Creators' },
    headline:  { FR: 'Collaboration Influenceurs', EN: 'Influencer Collaboration' },
    desc: {
      FR: "Partenariat avec JB Clothing pour co-créer du contenu éditorial, des collections capsule exclusives ou des campagnes ambassadrices. Nous travaillons avec des créateurs qui incarnent l'esprit du luxe discret.",
      EN: "Partner with JB Clothing to co-create editorial content, exclusive capsule drops, or ambassador campaigns. We work with creators who embody the spirit of understated luxury.",
    },
    highlights: {
      FR: ['Collections capsule en co-branding', 'Dotations & allocations exclusives', 'Création de contenus éditoriaux', 'Partenariat réseaux sociaux'],
      EN: ['Co-branded capsule collections', 'Exclusive gifting & allowances', 'Editorial content creation', 'Social media partnership'],
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'boutique',
    badge:     { FR: 'Pour les Détaillants', EN: 'For Retailers' },
    headline:  { FR: 'Partenariat Boutique',  EN: 'Boutique Partnership' },
    desc: {
      FR: "Portez JB Clothing dans votre espace de vente premium. Nous proposons des programmes de distribution sélective, des arrangements régionaux exclusifs et un accompagnement visuel en boutique.",
      EN: "Carry JB Clothing in your premium retail space. We offer curated wholesale programmes, exclusive regional arrangements, and in-store styling support for boutique partners.",
    },
    highlights: {
      FR: ['Options wholesale & consignation', 'Exclusivité régionale possible', 'Responsable de compte dédié', 'Merchandising visuel en boutique'],
      EN: ['Wholesale & consignment options', 'Regional exclusivity available', 'Dedicated account manager', 'In-store visual merchandising'],
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'campaign',
    badge:     { FR: 'Pour les Créatifs', EN: 'For Creatives' },
    headline:  { FR: 'Campagne Mode',      EN: 'Fashion Campaign' },
    desc: {
      FR: "Collaborez sur des shootings éditoriaux, des films de mode ou des campagnes digitales. Nous accueillons photographes, stylistes, directeurs artistiques et studios de production.",
      EN: "Collaborate on editorial shoots, fashion films, or digital campaigns. We welcome photographers, stylists, creative directors, and production studios.",
    },
    highlights: {
      FR: ['Shootings éditoriaux & campagnes', 'Habillage défilés', 'Production film de mode', 'Storytelling cross-marques'],
      EN: ['Editorial & campaign shoots', 'Runway show dressing', 'Fashion film production', 'Cross-brand storytelling'],
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    id: 'brand',
    badge:     { FR: 'Propositions Ouvertes', EN: 'Open Proposals' },
    headline:  { FR: 'Proposition de Marque', EN: 'Brand Proposal' },
    desc: {
      FR: "Vous avez une idée de partenariat unique ? Nous accueillons des propositions ouvertes de maisons de luxe, groupes hôteliers, organisations artistiques et entreprises alignées avec notre vision.",
      EN: "Have a unique partnership concept? We welcome open proposals from luxury houses, hospitality groups, arts organisations, and aligned businesses.",
    },
    highlights: {
      FR: ['Opportunités de co-branding', 'Habillage hôtellerie & événements', 'Discussions de licence', 'Alliances stratégiques de marque'],
      EN: ['Co-branding opportunities', 'Hospitality & events dressing', 'Licensing discussions', 'Strategic brand alliances'],
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
]

/* ── Stats ─────────────────────────────────────────────────────────────────── */
const stats = [
  { value: '120+', labelFR: 'Partenaires Mondiaux',        labelEN: 'Partners Worldwide' },
  { value: '38',   labelFR: 'Pays Présents',                labelEN: 'Countries Present' },
  { value: '£2M+', labelFR: 'Revenus Partenaires Générés',  labelEN: 'Partner Revenue Generated' },
  { value: '94%',  labelFR: 'Taux de Fidélisation',         labelEN: 'Partner Retention Rate' },
]

/* ── Testimonials ──────────────────────────────────────────────────────────── */
const testimonials = [
  {
    quoteFR: "Travailler avec JB Clothing a élevé toute la perception de notre boutique. Leur approche du partenariat est véritablement collaborative — jamais transactionnelle.",
    quoteEN: "Working with JB Clothing elevated the entire perception of our boutique. Their approach to partnership is genuinely collaborative — not transactional.",
    author: 'Isabelle Fontaine',
    title:  'Propriétaire, Maison Fontaine — Paris',
  },
  {
    quoteFR: "La collection capsule que nous avons créée ensemble s'est vendue en 48 heures. JB Clothing comprend le public du luxe à un niveau que peu de maisons atteignent.",
    quoteEN: "The capsule collection we created together sold out within 48 hours. JB Clothing understands the luxury audience at a level few brands do.",
    author: 'Marcus Webb',
    title:  'Directeur Créatif & Influenceur, 1.2M followers',
  },
]

export default function Collaboration() {
  const { lang, t }   = useLang()
  const tc            = t.collab

  const [selected,  setSelected]  = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', type: '', message: '' })
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 65%),
              linear-gradient(180deg, #0a0a0a 0%, #0f0e09 50%, #0a0a0a 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,76,0.6) 40px, rgba(201,168,76,0.6) 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,76,0.6) 40px, rgba(201,168,76,0.6) 41px)
            `,
          }}
        />
        {/* Corner brackets */}
        <div className="absolute top-28 left-8 w-16 h-16 border-t border-l border-gold/20" />
        <div className="absolute top-28 right-8 w-16 h-16 border-t border-r border-gold/20" />
        <div className="absolute bottom-10 left-8 w-16 h-16 border-b border-l border-gold/20" />
        <div className="absolute bottom-10 right-8 w-16 h-16 border-b border-r border-gold/20" />

        <div className="container-luxury relative z-10 text-center">
          <div className="animate-fade-up">
            <div className="flex items-center justify-center gap-5 mb-6">
              <span className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-gold/60" />
              <p className="label-gold tracking-[0.35em]">{tc.heroBadge}</p>
              <span className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>

            <h1 className="heading-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6">
              {tc.heroH1a}
              <br />
              <span className="text-gradient-gold">{tc.heroH1b}</span>
            </h1>

            <p className="font-display text-xl md:text-2xl text-[#9a8a6a] font-light tracking-wide mt-6 mb-3">
              {tc.heroSub}
            </p>
            <p className="text-[#4a4a4a] font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed mt-4 mb-12">
              {tc.heroBody}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#collab-form" className="btn-gold-solid">{tc.cta1}</a>
              <a href="#collab-types" className="btn-gold"><span>{tc.cta2}</span></a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 pointer-events-none">
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════════ */}
      <section className="border-y border-[#1a1a1a]">
        <div className="container-luxury py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(s => (
              <div key={s.value}>
                <p className="font-serif text-3xl md:text-4xl text-gradient-gold font-bold mb-1">{s.value}</p>
                <p className="text-[#3a3a3a] text-[0.6rem] tracking-[0.25em] uppercase">
                  {lang === 'FR' ? s.labelFR : s.labelEN}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          COLLAB TYPE CARDS
      ════════════════════════════════════════════════════════ */}
      <section id="collab-types" className="section-luxury">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-gold mb-3">{tc.typeBadge}</p>
            <h2 className="heading-luxury text-4xl md:text-5xl text-white">{tc.typeTitle}</h2>
            <GoldDivider variant="ornament" />
            <p className="text-[#5a5a5a] font-light max-w-lg mx-auto text-sm leading-relaxed">{tc.typeSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {collabTypes.map((type, i) => (
              <div
                key={type.id}
                onClick={() => setSelected(selected === type.id ? null : type.id)}
                className={`luxury-card group cursor-pointer p-8 transition-all duration-500 animate-fade-up delay-${(i + 1) * 100} ${
                  selected === type.id ? 'border-gold/50 bg-[#161408] shadow-[0_0_40px_rgba(201,168,76,0.12)]' : ''
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
                        {type.badge[lang]}
                      </span>
                      <span className={`text-lg transition-all duration-300 ${
                        selected === type.id ? 'text-gold rotate-45' : 'text-[#3a3a3a] group-hover:text-gold/40'
                      }`}>+</span>
                    </div>
                    <h3 className={`font-serif text-xl mb-2 transition-colors duration-300 ${
                      selected === type.id ? 'text-gold' : 'text-white group-hover:text-gold'
                    }`}>
                      {type.headline[lang]}
                    </h3>
                    <p className="text-[#5a5a5a] text-sm font-light leading-relaxed">
                      {type.desc[lang]}
                    </p>
                  </div>
                </div>

                {/* Expanded highlights */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  selected === type.id ? 'max-h-48 opacity-100 mt-6' : 'max-h-0 opacity-0'
                }`}>
                  <div className="gold-divider mb-5" />
                  <ul className="grid grid-cols-2 gap-2">
                    {type.highlights[lang].map(h => (
                      <li key={h} className="flex items-center gap-2 text-[#6a6a6a] text-xs">
                        <span className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-5 btn-gold py-2 px-6 text-[0.58rem]"
                    onClick={e => {
                      e.stopPropagation()
                      document.getElementById('collab-form')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span>{lang === 'FR' ? 'Postuler pour ce format' : 'Apply for This Type'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════════════════════════════════════════════
          PHILOSOPHY QUOTE BLOCK
      ════════════════════════════════════════════════════════ */}
      <section className="section-luxury overflow-hidden">
        <div className="container-luxury">
          <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
            <div
              className="absolute inset-0 rounded-sm"
              style={{ background: 'linear-gradient(135deg, #121008 0%, #1a1608 50%, #0e0d08 100%)' }}
            />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, rgba(201,168,76,1) 0px, rgba(201,168,76,1) 1px, transparent 1px, transparent 48px),
                  repeating-linear-gradient(0deg, rgba(201,168,76,1) 0px, rgba(201,168,76,1) 1px, transparent 1px, transparent 48px)
                `,
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 50%, rgba(201,168,76,0.3) 0%, transparent 70%)' }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full py-20 px-8 text-center">
              <p className="label-gold mb-4 tracking-[0.4em]">
                {lang === 'FR' ? 'Notre Philosophie' : 'Our Philosophy'}
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-white font-light tracking-wide leading-relaxed">
                {tc.quoteBlock}
              </h2>
              <GoldDivider variant="ornament" className="max-w-xs mx-auto" />
              <p className="text-[#5a5a5a] text-sm font-light max-w-md">{tc.quoteSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════ */}
      <section className="section-luxury border-t border-[#1a1a1a]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="label-gold mb-3">{tc.testimonialBadge}</p>
            <h2 className="heading-luxury text-4xl text-white">{tc.testimonialTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ quoteFR, quoteEN, author, title }) => (
              <div key={author} className="luxury-card p-10">
                <div className="font-serif text-6xl text-gold/20 leading-none mb-4" style={{ fontFamily: 'Georgia', lineHeight: 0.8 }}>
                  &ldquo;
                </div>
                <p className="font-display text-lg md:text-xl text-[#c0a870] font-light italic leading-relaxed mb-8">
                  {lang === 'FR' ? quoteFR : quoteEN}
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

      {/* ════════════════════════════════════════════════════════
          FORM
      ════════════════════════════════════════════════════════ */}
      <section id="collab-form" className="section-luxury">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-gold mb-3">{tc.formBadge}</p>
              <h2 className="heading-luxury text-4xl md:text-5xl text-white">{tc.formTitle}</h2>
              <GoldDivider variant="ornament" />
              <p className="text-[#5a5a5a] font-light text-sm max-w-md mx-auto">{tc.formSub}</p>
            </div>

            {submitted ? (
              <div className="luxury-card p-16 text-center border-gold/30">
                <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6 bg-gold/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">{tc.successH}</h3>
                <p className="text-[#5a5a5a] font-light text-sm max-w-sm mx-auto leading-relaxed">{tc.successP}</p>
                <GoldDivider variant="ornament" className="max-w-xs mx-auto mt-6" />
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold mt-6 py-2.5 px-8 text-[0.6rem]"
                >
                  <span>{tc.successBtn}</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="luxury-card p-8 md:p-12 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="label-gold block mb-2">{tc.formName} <span className="text-gold/50">*</span></label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      className="input-luxury"
                      placeholder={lang === 'FR' ? 'Votre nom complet' : 'Your full name'}
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="label-gold block mb-2">{tc.formEmail} <span className="text-gold/50">*</span></label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      className="input-luxury"
                      placeholder="contact@example.com"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="label-gold block mb-2">{tc.formPhone}</label>
                    <input
                      type="tel" name="phone"
                      value={form.phone} onChange={handleChange}
                      className="input-luxury"
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>
                  {/* Type */}
                  <div>
                    <label className="label-gold block mb-2">{tc.formType} <span className="text-gold/50">*</span></label>
                    <select
                      name="type" required
                      value={form.type} onChange={handleChange}
                      className="input-luxury appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A84C' stroke-width='1.5'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1.2rem center',
                      }}
                    >
                      <option value="" disabled style={{ background: '#111111' }}>
                        {lang === 'FR' ? 'Sélectionner un type' : 'Select type'}
                      </option>
                      {collabTypes.map(tp => (
                        <option key={tp.id} value={tp.id} style={{ background: '#111111' }}>
                          {tp.headline[lang]}
                        </option>
                      ))}
                      <option value="other" style={{ background: '#111111' }}>{tc.typeOther}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="label-gold block mb-2">{tc.formMsg} <span className="text-gold/50">*</span></label>
                  <textarea
                    name="message" required rows={6}
                    value={form.message} onChange={handleChange}
                    className="input-luxury resize-none"
                    placeholder={tc.formMsgPh}
                  />
                  <p className="text-[#3a3a3a] text-[0.6rem] mt-1.5 tracking-wide">
                    {lang === 'FR' ? 'Plus vous partagez de détails, mieux nous pouvons évaluer l\'alignement.' : 'The more detail you share, the better we can assess alignment.'}
                  </p>
                </div>

                <GoldDivider />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-[#3a3a3a] text-xs font-light">{tc.formPrivacy}</p>
                  <button type="submit" className="btn-gold-solid whitespace-nowrap px-10">
                    {tc.formSubmit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BOTTOM SEPARATOR
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-luxury text-center">
          <p className="label-gold mb-3 tracking-[0.4em]">{tc.bottomTag}</p>
          <p className="font-display text-2xl md:text-3xl text-[#3a3a3a] font-light tracking-wider">
            {tc.bottomSub}
          </p>
          <GoldDivider variant="ornament" className="max-w-xs mx-auto mt-6" />
        </div>
      </section>
    </div>
  )
}
