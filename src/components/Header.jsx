import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home',          path: '/' },
  { label: 'Shop',          path: '/shop' },
  { label: 'Collaboration', path: '/collaboration' },
  { label: 'Contact',       path: '/contact' },
]

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [cartCount]                     = useState(2)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-luxury flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="group flex flex-col leading-none select-none">
          <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-gold transition-colors duration-300">
            JB
          </span>
          <span className="label-gold" style={{ fontSize: '0.55rem', letterSpacing: '0.35em' }}>
            CLOTHING
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, path }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`relative text-[0.65rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 group ${
                  active ? 'text-gold' : 'text-white/70 hover:text-gold'
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
        <div className="hidden md:flex items-center gap-6">
          <Link to="/account" className="text-white/60 hover:text-gold transition-colors duration-300" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>

          <button className="relative text-white/60 hover:text-gold transition-colors duration-300" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black text-[0.55rem] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <Link to="/shop" className="btn-gold py-2 px-5 text-[0.6rem]">
            <span>Shop Now</span>
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-4 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-[#2a2a2a] bg-[#0a0a0a]/98 backdrop-blur-xl px-8 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`text-[0.7rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
                location.pathname === path ? 'text-gold' : 'text-white/70 hover:text-gold'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="gold-divider mt-2" />
          <div className="flex gap-4 pt-2">
            <Link to="/account" className="text-[0.65rem] tracking-widest uppercase text-white/50 hover:text-gold transition-colors">
              Account
            </Link>
            <Link to="/shop" className="btn-gold-solid py-2 px-5 text-[0.6rem]">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
