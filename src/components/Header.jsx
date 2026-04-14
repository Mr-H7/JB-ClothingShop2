import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [cartCount]               = useState(2)
  const { lang, setLang, t }      = useLang()
  const location  = useLocation()
  const navigate  = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const navLinks = [
    { label: t.nav.home,   path: '/' },
    { label: t.nav.shop,   path: '/shop' },
    { label: t.nav.collab, path: '/collaboration' },
    { label: t.nav.contact,path: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/96 backdrop-blur-md border-b border-[#1e1e1e] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-luxury flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link to="/" className="group flex flex-col leading-none select-none flex-shrink-0">
          <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-gold transition-colors duration-300">
            JB
          </span>
          <span className="label-gold" style={{ fontSize: '0.52rem', letterSpacing: '0.38em' }}>
            CLOTHING
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map(({ label, path }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`relative text-[0.62rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 group ${
                  active ? 'text-gold' : 'text-white/65 hover:text-gold'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* ── Right Actions ── */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language Switcher */}
          <div className="flex items-center border border-[#2a2a2a] rounded-full p-0.5 gap-0.5">
            {['FR', 'EN'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-[0.52rem] font-bold tracking-[0.15em] rounded-full transition-all duration-300 ${
                  lang === l
                    ? 'bg-gold text-black'
                    : 'text-[#5a5a5a] hover:text-gold'
                }`}
                aria-label={`Switch to ${l}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Account */}
          <Link
            to="/account"
            className="text-white/55 hover:text-gold transition-colors duration-300"
            aria-label={t.nav.account}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>

          {/* Cart — navigates to checkout */}
          <button
            className="relative text-white/55 hover:text-gold transition-colors duration-300"
            aria-label="Panier"
            onClick={() => navigate('/checkout')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black text-[0.5rem] font-bold rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>

          <Link to="/shop" className="btn-gold py-2 px-5 text-[0.58rem]">
            <span>{t.nav.shopNow}</span>
          </Link>
        </div>

        {/* ── Mobile Right ── */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile lang toggle */}
          <div className="flex items-center border border-[#2a2a2a] rounded-full p-0.5">
            {['FR', 'EN'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-[0.5rem] font-bold tracking-wider rounded-full transition-all duration-300 ${
                  lang === l ? 'bg-gold text-black' : 'text-[#4a4a4a] hover:text-gold'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-1 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-[#1e1e1e] bg-[#0a0a0a]/98 backdrop-blur-xl px-8 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`text-[0.68rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
                location.pathname === path ? 'text-gold' : 'text-white/65 hover:text-gold'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="gold-divider mt-1" />
          <div className="flex items-center gap-4 pt-1">
            <Link to="/account" className="text-[0.62rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold transition-colors">
              {t.nav.account}
            </Link>
            <button onClick={() => navigate('/checkout')} className="text-[#4a4a4a] hover:text-gold transition-colors text-[0.62rem] tracking-widest uppercase">
              Panier ({cartCount})
            </button>
            <Link to="/shop" className="btn-gold-solid py-2 px-5 text-[0.58rem] ml-auto">
              {t.nav.shopNow}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
