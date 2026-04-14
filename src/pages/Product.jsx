import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'

const products = {
  1:  { name: 'Midnight Noir Blazer',    price: '£895',   category: 'Outerwear', tag: 'New Arrival',  desc: 'An impeccably tailored blazer in midnight noir, crafted from premium wool-blend fabric. The silhouette is architectural yet refined, with structured shoulders and a single-button closure finished with hand-stitching detail.' },
  2:  { name: 'Signature Silk Shirt',    price: '£420',   category: 'Tops',      tag: 'Bestseller',   desc: 'Luxuriously soft mulberry silk shirt in a classic cut. The fabric drapes beautifully and catches light with an effortless elegance. Mother-of-pearl buttons add a timeless finishing touch.' },
  3:  { name: 'Imperial Wool Trousers',  price: '£580',   category: 'Bottoms',   tag: 'Limited',      desc: 'Exquisitely tailored from Super 120s Italian wool. The slim, tapered silhouette flatters while maintaining comfort throughout the day. Side adjusters and a clean front offer a modern sophistication.' },
  4:  { name: 'Obsidian Leather Jacket', price: '£1,290', category: 'Outerwear', tag: 'Exclusive',    desc: 'Hand-crafted from full-grain Italian calf leather, the Obsidian Jacket represents the pinnacle of outerwear luxury. Minimalist hardware, satin lining, and an immaculate fit define this statement piece.' },
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function Product() {
  const { id } = useParams()
  const product = products[id] || products[1]
  const [selectedSize, setSelectedSize] = useState(null)
  const [added,        setAdded]        = useState(false)

  const handleAdd = () => {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.6rem] tracking-widest uppercase mb-10">
          <Link to="/" className="text-[#4a4a4a] hover:text-gold transition-colors">Home</Link>
          <span className="text-[#2a2a2a]">/</span>
          <Link to="/shop" className="text-[#4a4a4a] hover:text-gold transition-colors">Shop</Link>
          <span className="text-[#2a2a2a]">/</span>
          <span className="text-gold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Product Image ── */}
          <div className="space-y-3">
            <div
              className="luxury-card overflow-hidden"
              style={{ aspectRatio: '3/4', background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)' }}
            >
              <div className="w-full h-full flex items-end justify-start p-8">
                <span className="label-gold border border-gold/40 px-4 py-2 rounded-full">{product.tag}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map(n => (
                <div
                  key={n}
                  className={`luxury-card overflow-hidden cursor-pointer ${n === 0 ? 'border-gold/40' : ''}`}
                  style={{ aspectRatio: '1', background: `linear-gradient(${135 + n * 20}deg, #161616 0%, #252525 100%)` }}
                />
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="label-gold mb-2">{product.category}</p>
              <h1 className="heading-luxury text-4xl md:text-5xl text-white mb-4">{product.name}</h1>
              <p className="text-3xl text-gold font-serif font-semibold">{product.price}</p>
            </div>

            <GoldDivider />

            <p className="text-[#6a6a6a] text-sm font-light leading-relaxed">{product.desc}</p>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="label-gold">Select Size</p>
                <button className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-xs font-semibold tracking-wider transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-black'
                        : 'border-[#2a2a2a] text-[#5a5a5a] hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleAdd}
                className={`flex-1 btn-gold-solid py-4 text-[0.65rem] ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button className="w-14 h-14 border border-[#2a2a2a] hover:border-gold transition-colors flex items-center justify-center text-[#5a5a5a] hover:text-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Details */}
            <div className="border border-[#1e1e1e] divide-y divide-[#1e1e1e] mt-2">
              {[
                { label: 'Material',   value: 'Premium Italian Wool Blend' },
                { label: 'Origin',     value: 'Crafted in Italy' },
                { label: 'Care',       value: 'Dry clean only' },
                { label: 'Delivery',   value: 'Express 1-2 days, Standard 3-5 days' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-4 px-5">
                  <span className="label-gold text-[0.55rem]">{label}</span>
                  <span className="text-[#5a5a5a] text-xs">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
