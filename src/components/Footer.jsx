import { Link } from 'react-router-dom'
import GoldDivider from './GoldDivider'

const footerLinks = {
  Shop: [
    { label: 'New Arrivals',     path: '/shop?filter=new' },
    { label: 'Collections',      path: '/shop?filter=collections' },
    { label: 'Accessories',      path: '/shop?filter=accessories' },
    { label: 'Sale',             path: '/shop?filter=sale' },
  ],
  Company: [
    { label: 'Our Story',        path: '/#story' },
    { label: 'Sustainability',   path: '/#sustainability' },
    { label: 'Careers',          path: '/#careers' },
    { label: 'Press',            path: '/#press' },
  ],
  Support: [
    { label: 'Contact Us',       path: '/contact' },
    { label: 'Collaboration',    path: '/collaboration' },
    { label: 'Size Guide',       path: '/#size-guide' },
    { label: 'Returns & Refunds',path: '/#returns' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1e1e1e]">
      {/* ── Newsletter Strip ── */}
      <div className="border-b border-[#1e1e1e]">
        <div className="container-luxury py-14">
          <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
            <div>
              <p className="label-gold mb-2">Exclusive Access</p>
              <h3 className="font-serif text-2xl font-semibold text-white">
                Join the Inner Circle
              </h3>
              <p className="text-[#6a6a6a] text-sm mt-1 font-light">
                First access to new collections, private sales, and editorial stories.
              </p>
            </div>
            <form className="flex gap-0 flex-1 max-w-md" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="input-luxury rounded-none rounded-l-full flex-1 text-sm border-r-0"
              />
              <button type="submit" className="btn-gold-solid rounded-none rounded-r-full px-6 text-[0.6rem]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="group inline-flex flex-col mb-6">
              <span className="font-serif text-3xl font-bold tracking-wider text-white">JB</span>
              <span className="label-gold" style={{ fontSize: '0.55rem', letterSpacing: '0.35em' }}>CLOTHING</span>
            </Link>
            <p className="text-[#5a5a5a] text-sm leading-relaxed font-light max-w-xs">
              Curated luxury fashion for those who appreciate the art of dressing well. Each piece is selected with an uncompromising eye for quality and refinement.
            </p>
            <div className="flex gap-4 mt-8">
              {['instagram', 'twitter', 'pinterest', 'tiktok'].map(platform => (
                <a
                  key={platform}
                  href="#"
                  className="w-9 h-9 border border-[#2a2a2a] rounded-full flex items-center justify-center text-[#5a5a5a] hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                  aria-label={platform}
                >
                  <SocialIcon name={platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="label-gold mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-[#5a5a5a] text-sm hover:text-gold transition-colors duration-300 font-light"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <GoldDivider />

      {/* ── Bottom ── */}
      <div className="container-luxury py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#3a3a3a] text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} JB Clothing. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
            <a key={t} href="#" className="text-[#3a3a3a] text-xs tracking-wide hover:text-gold transition-colors duration-300">
              {t}
            </a>
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
    twitter: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
