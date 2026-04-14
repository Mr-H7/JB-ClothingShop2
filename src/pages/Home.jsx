import { Link } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import { useLang } from '../contexts/LangContext'

/* ── Featured products (IDs reference Shop data) ─────────────────── */
const featured = [
  {
    id: 1,
    nameFR: 'Sac Noir Éclat',
    nameEN: 'Black Éclat Bag',
    price:  '£495',
    tag:    { FR: 'Nouveau', EN: 'New' },
    cat:    { FR: 'Les Sacs', EN: 'Bags' },
    img:    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    nameFR: 'Montre Or Rose Impérial',
    nameEN: 'Imperial Rose Gold Watch',
    price:  '£890',
    tag:    { FR: 'Exclusif', EN: 'Exclusive' },
    cat:    { FR: 'Montres', EN: 'Watches' },
    img:    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    nameFR: 'Lunettes Aviateur Dorées',
    nameEN: 'Gold Aviator Sunglasses',
    price:  '£180',
    tag:    { FR: 'Nouveau', EN: 'New' },
    cat:    { FR: 'Lunettes', EN: 'Sunglasses' },
    img:    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 9,
    nameFR: 'Essence Noire EDP',
    nameEN: 'Essence Noire EDP',
    price:  '£145',
    tag:    { FR: 'Exclusif', EN: 'Exclusive' },
    cat:    { FR: 'Parfum femme', EN: "Women's Perfume" },
    img:    'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=600&q=80',
  },
]

export default function Home() {
  const { lang, t } = useLang()
  const h  = t.hero
  const f  = t.featured
  const ed = t.editorial
  const cc = t.collabCta
  const st = t.stats

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-18"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 65%)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container-luxury relative z-10 text-center">
          <div className="animate-fade-in">
            <p className="label-gold mb-6">{h.badge}</p>
            <h1 className="heading-luxury text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] text-white leading-none mb-6">
              {h.h1a}{' '}
              <em className="text-gradient-gold not-italic block sm:inline">{h.h1b}</em>
            </h1>
            <p className="text-[#6a6a6a] text-base md:text-lg font-light max-w-lg mx-auto mb-12 leading-relaxed tracking-wide">
              {h.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="btn-gold-solid">
                {h.cta1}
              </Link>
              <Link to="/collaboration" className="btn-gold">
                <span>{h.cta2}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 pointer-events-none">
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════════════ */}
      <section className="border-y border-[#1a1a1a]">
        <div className="container-luxury py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {st.map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-3xl md:text-4xl text-gold font-bold mb-1">{value}</p>
                <p className="text-[#3a3a3a] text-[0.6rem] tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ════════════════════════════════════════════════════ */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-gold mb-3">{f.badge}</p>
            <h2 className="heading-luxury text-4xl md:text-5xl text-white">{f.heading}</h2>
            <GoldDivider variant="ornament" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`luxury-card group animate-fade-up delay-${(i + 1) * 100}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-[#161616]" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={product.img}
                    alt={lang === 'FR' ? product.nameFR : product.nameEN}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[rgba(201,168,76,0.07)] to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="label-gold bg-[#0a0a0a]/85 px-3 py-1 rounded-full text-[0.5rem] border border-gold/30">
                      {product.tag[lang]}
                    </span>
                  </div>
                  {/* Quick view overlay */}
                  <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                    <span className="btn-gold w-full py-2.5 text-[0.58rem] text-center">
                      <span>{lang === 'FR' ? 'Voir la pièce' : 'View item'}</span>
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-[#3a3a3a] text-[0.55rem] tracking-widest uppercase mb-1">{product.cat[lang]}</p>
                  <h3 className="font-serif text-base text-white group-hover:text-gold transition-colors duration-300 mb-2">
                    {lang === 'FR' ? product.nameFR : product.nameEN}
                  </h3>
                  <p className="text-gold font-semibold text-sm">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-gold">
              <span>{f.cta}</span>
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ════════════════════════════════════════════════════
          EDITORIAL GRID
      ════════════════════════════════════════════════════ */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-gold mb-3">{ed.badge}</p>
            <h2 className="heading-luxury text-4xl md:text-5xl text-white">{ed.heading}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Large editorial card */}
            <Link
              to="/shop"
              className="luxury-card group relative overflow-hidden block"
              style={{ minHeight: '480px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                onError={e => { e.currentTarget.style.opacity = '0' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <p className="label-gold mb-2 text-[0.55rem]">{ed.story1.sub}</p>
                <h3 className="font-serif text-2xl text-white">{ed.story1.title}</h3>
                <p className="text-[#5a5a5a] text-sm font-light mt-1">
                  {lang === 'FR' ? "Explorez le récit éditorial de la saison" : "Explore the season's most compelling editorial narrative"}
                </p>
                <div className="gold-divider-left mt-4" />
              </div>
            </Link>

            <div className="grid grid-rows-2 gap-5">
              {/* Watches card */}
              <Link
                to="/shop?cat=Montres"
                className="luxury-card group relative overflow-hidden block"
                style={{ minHeight: '224px' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
                  onError={e => { e.currentTarget.style.opacity = '0' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p className="label-gold mb-1 text-[0.5rem]">{ed.story2.sub}</p>
                  <h3 className="font-serif text-lg text-white">{ed.story2.title}</h3>
                </div>
              </Link>

              {/* Bags + silk card */}
              <Link
                to="/shop?cat=Les+Sacs"
                className="luxury-card group relative overflow-hidden block"
                style={{ minHeight: '224px' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
                  onError={e => { e.currentTarget.style.opacity = '0' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p className="label-gold mb-1 text-[0.5rem]">{ed.story3.sub}</p>
                  <h3 className="font-serif text-lg text-white">{ed.story3.title}</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          OUR STORY (anchor target for footer link)
      ════════════════════════════════════════════════════ */}
      <section id="story" className="section-luxury border-t border-[#1a1a1a]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="label-gold mb-4">{lang === 'FR' ? 'Notre Histoire' : 'Our Story'}</p>
              <h2 className="heading-luxury text-4xl md:text-5xl text-white mb-6">
                {lang === 'FR' ? 'L\'Excellence au Cœur de Chaque Pièce' : 'Excellence at the Heart of Every Piece'}
              </h2>
              <GoldDivider variant="left" />
              <p className="text-[#5a5a5a] text-sm font-light leading-relaxed mt-4 mb-4">
                {lang === 'FR'
                  ? "Fondée sur une passion pour les accessoires d'exception, JB Clothing sélectionne des pièces qui transcendent les saisons. Chaque sac, montre, châle ou flacon de parfum est choisi pour son excellence artisanale et son élégance intemporelle."
                  : "Founded on a passion for exceptional accessories, JB Clothing curates pieces that transcend seasons. Every bag, watch, shawl, or perfume bottle is chosen for its artisanal excellence and timeless elegance."}
              </p>
              <p className="text-[#5a5a5a] text-sm font-light leading-relaxed mb-8">
                {lang === 'FR'
                  ? "Depuis plus de 12 ans, nous guidons une clientèle exigeante vers des accessoires qui enrichissent leur quotidien et affirment leur sens du style."
                  : "For over 12 years, we have guided a discerning clientele toward accessories that enrich their everyday and affirm their sense of style."}
              </p>
              <Link to="/shop" className="btn-gold">
                <span>{lang === 'FR' ? 'Découvrir la Boutique' : 'Discover the Boutique'}</span>
              </Link>
            </div>
            {/* Visual */}
            <div className="grid grid-cols-2 gap-4">
              <div className="luxury-card overflow-hidden" style={{ aspectRatio: '2/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80"
                  alt=""
                  className="w-full h-full object-cover opacity-70"
                  onError={e => { e.currentTarget.style.opacity = '0' }}
                />
              </div>
              <div className="grid grid-rows-2 gap-4 mt-8">
                <div className="luxury-card overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=400&q=80"
                    alt=""
                    className="w-full h-full object-cover opacity-70"
                    onError={e => { e.currentTarget.style.opacity = '0' }}
                  />
                </div>
                <div className="luxury-card overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
                    alt=""
                    className="w-full h-full object-cover opacity-70"
                    onError={e => { e.currentTarget.style.opacity = '0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          COLLABORATION CTA
      ════════════════════════════════════════════════════ */}
      <section className="section-luxury border-t border-[#1a1a1a]">
        <div className="container-luxury text-center">
          <div
            className="relative overflow-hidden rounded-sm py-20 px-8"
            style={{ background: 'linear-gradient(135deg, #111111 0%, #161408 50%, #111111 100%)' }}
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.5) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <p className="label-gold mb-4">{cc.badge}</p>
              <h2 className="heading-luxury text-4xl md:text-5xl text-white mb-4">
                {cc.h2a}
                <em className="text-gradient-gold not-italic">{cc.h2gold}</em>
              </h2>
              <p className="text-[#5a5a5a] font-light max-w-lg mx-auto mb-10 leading-relaxed text-sm">
                {cc.sub}
              </p>
              <Link to="/collaboration" className="btn-gold-solid">
                {cc.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
