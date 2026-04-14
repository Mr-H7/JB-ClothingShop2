import { Link } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'

const featuredProducts = [
  { id: 1, name: 'Midnight Noir Blazer',    price: '£895',  tag: 'New Arrival',   category: 'Outerwear' },
  { id: 2, name: 'Signature Silk Shirt',    price: '£420',  tag: 'Bestseller',    category: 'Tops' },
  { id: 3, name: 'Imperial Wool Trousers',  price: '£580',  tag: 'Limited',       category: 'Bottoms' },
  { id: 4, name: 'Obsidian Leather Jacket', price: '£1,290',tag: 'Exclusive',     category: 'Outerwear' },
]

const editorialStories = [
  { title: 'The Art of Refinement',       subtitle: 'AW 2025 Collection',   col: 'col-span-1 row-span-2' },
  { title: 'Dressed for the Night',       subtitle: 'Evening Essentials',    col: 'col-span-1' },
  { title: 'Power Dressing, Redefined',   subtitle: 'Executive Edit',        col: 'col-span-1' },
]

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 60%)`,
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container-luxury relative z-10 text-center">
          <div className="animate-fade-in">
            <p className="label-gold mb-6">New Collection 2025</p>
            <h1 className="heading-luxury text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-white leading-none mb-8">
              Dress{' '}
              <em className="text-gradient-gold not-italic">Beyond</em>
              <br />the Ordinary
            </h1>
            <p className="text-[#6a6a6a] text-base md:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed tracking-wide">
              Curated luxury fashion for those who understand that true elegance is never accidental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="btn-gold-solid">
                Explore Collection
              </Link>
              <Link to="/collaboration" className="btn-gold">
                <span>Collaborate With Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="label-gold" style={{ fontSize: '0.5rem' }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────────── */}
      <section className="border-y border-[#1e1e1e]">
        <div className="container-luxury py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2,400+', label: 'Premium Pieces' },
              { value: '38',     label: 'Countries Served' },
              { value: '12yrs',  label: 'Heritage' },
              { value: '99%',    label: 'Client Satisfaction' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-3xl md:text-4xl text-gold font-bold mb-1">{value}</p>
                <p className="text-[#4a4a4a] text-xs tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────────────── */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-gold mb-3">Curated Selection</p>
            <h2 className="heading-luxury text-4xl md:text-5xl text-white">Featured Pieces</h2>
            <GoldDivider variant="ornament" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`luxury-card group animate-fade-up delay-${i + 1}00`}
              >
                {/* Product image placeholder */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(145deg, #${['1a1a1a','161616','181818','141414'][i]} 0%, #${['2a2a2a','252525','232323','202020'][i]} 100%)`,
                    }}
                  />
                  {/* Gold shimmer overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[rgba(201,168,76,0.08)] to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="label-gold bg-[#0a0a0a]/80 px-3 py-1 rounded-full text-[0.55rem] border border-gold/30">
                      {product.tag}
                    </span>
                  </div>
                  {/* Quick add */}
                  <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                    <button className="btn-gold w-full py-2.5 text-[0.6rem]">
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>
                {/* Product info */}
                <div className="p-5">
                  <p className="text-[#4a4a4a] text-[0.6rem] tracking-widest uppercase mb-1">{product.category}</p>
                  <h3 className="font-serif text-base text-white group-hover:text-gold transition-colors duration-300 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gold font-semibold text-sm">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-gold">
              <span>View Full Collection</span>
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── Editorial Grid ────────────────────────────────────────── */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-gold mb-3">Editorial</p>
            <h2 className="heading-luxury text-4xl md:text-5xl text-white">Stories of Style</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="luxury-card group cursor-pointer relative overflow-hidden"
              style={{ minHeight: '480px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: 'linear-gradient(145deg, #1a1611 0%, #2a2218 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <p className="label-gold mb-2">AW 2025</p>
                <h3 className="font-serif text-2xl text-white mb-2">The Art of Refinement</h3>
                <p className="text-[#5a5a5a] text-sm font-light">Explore the season's most compelling editorial narrative</p>
                <div className="gold-divider-left mt-4" />
              </div>
            </div>

            <div className="grid grid-rows-2 gap-5">
              {[
                { title: 'Dressed for the Night', sub: 'Evening Essentials' },
                { title: 'Power Dressing, Redefined', sub: 'Executive Edit' },
              ].map(({ title, sub }) => (
                <div
                  key={title}
                  className="luxury-card group cursor-pointer relative overflow-hidden"
                  style={{ minHeight: '224px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: 'linear-gradient(145deg, #161414 0%, #242020 100%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <p className="label-gold mb-1 text-[0.55rem]">{sub}</p>
                    <h3 className="font-serif text-lg text-white">{title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Collaboration CTA ──────────────────────────────────────── */}
      <section className="section-luxury border-t border-[#1e1e1e]">
        <div className="container-luxury text-center">
          <div
            className="relative overflow-hidden rounded-sm py-20 px-8"
            style={{ background: 'linear-gradient(135deg, #111111 0%, #161408 50%, #111111 100%)' }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.5) 0%, transparent 70%)`,
              }}
            />
            <div className="relative z-10">
              <p className="label-gold mb-4">Partnerships</p>
              <h2 className="heading-luxury text-4xl md:text-5xl text-white mb-4">
                Build Something <em className="text-gradient-gold not-italic">Exceptional</em>
              </h2>
              <p className="text-[#6a6a6a] font-light max-w-lg mx-auto mb-10 leading-relaxed">
                We collaborate with influencers, boutiques, and brands who share our vision of uncompromising luxury.
              </p>
              <Link to="/collaboration" className="btn-gold-solid">
                Explore Collaboration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
