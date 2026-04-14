import { useState } from 'react'
import { Link } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'

const products = [
  { id: 1,  name: 'Midnight Noir Blazer',      price: '£895',   category: 'Outerwear',   tag: 'New' },
  { id: 2,  name: 'Signature Silk Shirt',       price: '£420',   category: 'Tops',        tag: 'Bestseller' },
  { id: 3,  name: 'Imperial Wool Trousers',     price: '£580',   category: 'Bottoms',     tag: 'Limited' },
  { id: 4,  name: 'Obsidian Leather Jacket',    price: '£1,290', category: 'Outerwear',   tag: 'Exclusive' },
  { id: 5,  name: 'Cashmere Turtleneck',        price: '£650',   category: 'Tops',        tag: 'New' },
  { id: 6,  name: 'Slim-Cut Formal Trousers',   price: '£460',   category: 'Bottoms',     tag: null },
  { id: 7,  name: 'Overcoat in Midnight Navy',  price: '£1,100', category: 'Outerwear',   tag: 'New' },
  { id: 8,  name: 'Structured Linen Shirt',     price: '£340',   category: 'Tops',        tag: null },
  { id: 9,  name: 'Tailored Shorts',            price: '£280',   category: 'Bottoms',     tag: null },
  { id: 10, name: 'Gold-Button Suit Jacket',    price: '£1,450', category: 'Outerwear',   tag: 'Limited' },
  { id: 11, name: 'Premium Cotton Polo',        price: '£195',   category: 'Tops',        tag: null },
  { id: 12, name: 'Heritage Chino',             price: '£320',   category: 'Bottoms',     tag: null },
]

const categories = ['All', 'Outerwear', 'Tops', 'Bottoms']
const sortOptions = ['Featured', 'Newest', 'Price: Low–High', 'Price: High–Low']

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort,           setSort]           = useState('Featured')

  const filtered = products.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  )

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">

      {/* ── Page Header ── */}
      <section className="border-b border-[#1e1e1e] pb-16">
        <div className="container-luxury text-center">
          <p className="label-gold mb-3">Our Collection</p>
          <h1 className="heading-luxury text-5xl md:text-6xl text-white">The Shop</h1>
          <GoldDivider variant="ornament" />
          <p className="text-[#5a5a5a] font-light max-w-md mx-auto">
            Each piece is selected for its exceptional quality, craftsmanship, and enduring elegance.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="border-b border-[#1e1e1e] sticky top-[72px] z-40 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="container-luxury py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category tabs */}
          <div className="flex gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-[0.6rem] font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold text-black'
                    : 'text-[#5a5a5a] hover:text-gold border border-transparent hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-luxury w-auto text-xs py-2 px-4 pr-8 appearance-none cursor-pointer rounded-full"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A84C' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
          >
            {sortOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`luxury-card group animate-fade-up delay-${(i % 6) + 1}00`}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(${145 + i * 8}deg, #1${i % 3 === 0 ? '8' : '6'}181${i % 2 === 0 ? '8' : '6'} 0%, #2a2a2a 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[rgba(201,168,76,0.06)] to-transparent" />
                  {product.tag && (
                    <div className="absolute top-4 left-4">
                      <span className="label-gold bg-[#0a0a0a]/80 px-3 py-1 rounded-full text-[0.5rem] border border-gold/30">
                        {product.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                    <button className="btn-gold w-full py-2 text-[0.58rem]">
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[#3a3a3a] text-[0.55rem] tracking-widest uppercase mb-1">{product.category}</p>
                  <h3 className="font-serif text-sm text-white group-hover:text-gold transition-colors duration-300 mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-gold font-semibold text-sm">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
