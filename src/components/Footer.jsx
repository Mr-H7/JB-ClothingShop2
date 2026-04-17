import { useState } from 'react'
import { Link } from 'react-router-dom'
import GoldDivider from './GoldDivider'
import { useLang } from '../contexts/LangContext'

export default function Footer() {
  const { t, lang } = useLang()
  const f = t.footer
  const year = new Date().getFullYear()
  const [nlEmail, setNlEmail] = useState('')
  const [nlDone,  setNlDone]  = useState(false)

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">

      {/* ── Newsletter Strip ── */}
      <div className="border-b border-[#1a1a1a]">
        <div className="container-luxury py-14">
          <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
            <div>
              <p className="label-gold mb-2">{f.newsletterBadge}</p>
              <h3 className="font-serif text-2xl font-semibold text-white">{f.newsletterHeading}</h3>
              <p className="text-[#5a5a5a] text-sm mt-1 font-light">{f.newsletterSub}</p>
            </div>
            {nlDone ? (
              <div className="flex items-center gap-3 text-gold text-sm font-semibold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {lang === 'FR' ? 'Merci pour votre inscription.' : 'Thank you for subscribing.'}
              </div>
            ) : (
              <form
                className="flex gap-0 flex-1 max-w-md"
                onSubmit={e => { e.preventDefault(); setNlDone(true); setNlEmail('') }}
              >
                <input
                  type="email" required
                  value={nlEmail}
                  onChange={e => setNlEmail(e.target.value)}
                  placeholder={lang === 'FR' ? 'Votre adresse email' : 'Your email address'}
                  className="input-luxury rounded-none rounded-l-full flex-1 text-sm border-r-0"
                />
                <button type="submit" className="btn-gold-solid rounded-none rounded-r-full px-6 text-[0.58rem] whitespace-nowrap">
                  {f.newsletterCta}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex flex-col mb-6">
              <span className="font-serif text-3xl font-bold tracking-wider text-white">JB</span>
              <span className="label-gold" style={{ fontSize: '0.52rem', letterSpacing: '0.38em' }}>CLOTHING</span>
            </Link>
            <p className="text-[#4a4a4a] text-sm leading-relaxed font-light max-w-xs">
              {f.tagline}
            </p>
            <div className="flex gap-3 mt-8">
              {['instagram', 'pinterest', 'tiktok'].map(platform => (
                <a
                  key={platform}
                  href="#"
                  className="w-9 h-9 border border-[#2a2a2a] rounded-full flex items-center justify-center text-[#4a4a4a] hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                  aria-label={platform}
                >
                  <SocialIcon name={platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="label-gold mb-5">{f.colBoutique}</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light">{f.newArrivals}</Link></li>
              <li><Link to="/shop" className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light">{f.collections}</Link></li>
              <li><Link to="/shop" className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light">{f.allProducts}</Link></li>
              <li><Link to="/shop" className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light">{f.sale}</Link></li>
            </ul>
          </div>

          {/* Maison Column — only "Notre Histoire" remains */}
          <div>
            <h4 className="label-gold mb-5">{f.colMaison}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/#story"
                  onClick={e => {
                    e.preventDefault()
                    const el = document.getElementById('story')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                    else window.location.href = '/'
                  }}
                  className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light"
                >
                  {f.story}
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Column — Size Guide removed */}
          <div>
            <h4 className="label-gold mb-5">{f.colService}</h4>
            <ul className="space-y-3">
              <li><Link to="/contact"      className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light">{f.contactUs}</Link></li>
              <li><Link to="/collaboration" className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light">{f.collab}</Link></li>
              <li><Link to="/contact"      className="text-[#4a4a4a] text-sm hover:text-gold transition-colors duration-300 font-light">{f.returns}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <GoldDivider />

      {/* ── Bottom Bar ── */}
      <div className="container-luxury py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#2a2a2a] text-xs tracking-widest uppercase">
          {f.rights.replace('{year}', year)}
        </p>
        <div className="flex gap-6">
          {[
            { label: f.privacy,  href: '/contact' },
            { label: f.terms,    href: '/contact' },
            { label: f.cookies,  href: '/contact' },
          ].map(({ label, href }) => (
            <Link key={label} to={href} className="text-[#2a2a2a] text-xs tracking-wide hover:text-gold transition-colors duration-300">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }) {
  const icons = {
    instagram: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
    pinterest: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.135-1.867 3.135-4.56 0-2.386-1.714-4.053-4.162-4.053-2.836 0-4.498 2.126-4.498 4.326 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.286c-.075.314-.243.995-.276 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
    tiktok: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  }
  return icons[name] || null
}
