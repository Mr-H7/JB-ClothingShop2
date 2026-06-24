import { useState } from 'react'
import { Link } from 'react-router-dom'
import GoldDivider from './GoldDivider'
import { useLang } from '../contexts/LangContext'
import { api } from '../lib/api'
import { BUSINESS } from '../data/business'

export default function Footer() {
  const { t, lang } = useLang()
  const f = t.footer
  const year = new Date().getFullYear()
  const [nlEmail, setNlEmail] = useState('')
  const [nlDone,  setNlDone]  = useState(false)
  const [nlError, setNlError] = useState('')
  const [nlLoading, setNlLoading] = useState(false)

  const handleNewsletter = async e => {
    e.preventDefault()
    if (!nlEmail) return
    setNlError('')
    setNlLoading(true)
    try {
      await api.post('/newsletter', { email: nlEmail, language: lang })
      setNlDone(true)
      setNlEmail('')
    } catch {
      setNlError(lang === 'FR' ? 'Impossible de vous inscrire pour le moment.' : 'Unable to subscribe right now.')
    } finally {
      setNlLoading(false)
    }
  }

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
              <div className="flex-1 max-w-md w-full">
                <form
                  className="flex flex-col sm:flex-row gap-2 sm:gap-0"
                  onSubmit={handleNewsletter}
                >
                  <input
                    type="email" required
                    value={nlEmail}
                    onChange={e => setNlEmail(e.target.value)}
                    placeholder={lang === 'FR' ? 'Votre adresse email' : 'Your email address'}
                    className="input-luxury rounded-full sm:rounded-none sm:rounded-l-full flex-1 text-sm sm:border-r-0"
                  />
                  <button type="submit" disabled={nlLoading} className={`btn-gold-solid rounded-full sm:rounded-none sm:rounded-r-full px-6 text-[0.58rem] whitespace-nowrap ${nlLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    {nlLoading ? (lang === 'FR' ? 'Envoi...' : 'Sending...') : f.newsletterCta}
                  </button>
                </form>
                {nlError && (
                  <p className="text-red-400 text-xs tracking-wide mt-2">{nlError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img src={BUSINESS.logo} alt="JB Clothing" className="h-16 w-16 rounded-sm object-contain" />
              <span className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-white">JB</span>
                <span className="label-gold" style={{ fontSize: '0.52rem', letterSpacing: '0.38em' }}>CLOTHING</span>
              </span>
            </Link>
            <p className="text-[#4a4a4a] text-sm leading-relaxed font-light max-w-xs">
              {f.tagline}
            </p>
            <div className="flex gap-3 mt-8">
              {[
                { platform: 'instagram', href: BUSINESS.instagramUrl },
              ].map(({ platform, href }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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

          {/* Maison Column */}
          <div>
            <h4 className="label-gold mb-5">{f.colMaison}</h4>
            <ul className="space-y-3 text-[#4a4a4a] text-sm font-light">
              <li>{BUSINESS.addressLines[0]}</li>
              <li>{BUSINESS.addressLines[1]}</li>
              <li>{BUSINESS.addressLines[2]}</li>
              <li>
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300">
                  {lang === 'FR' ? 'Ouvrir Google Maps' : 'Open Google Maps'}
                </a>
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
            { label: 'Admin',     href: '/admin' },
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
  }
  return icons[name] || null
}
