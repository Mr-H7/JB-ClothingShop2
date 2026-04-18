import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import { useLang } from '../contexts/LangContext'
import { useCart } from '../contexts/CartContext'
import { products } from './Shop'
import { CAT_FR } from '../i18n/index.js'

/* Volume/option definitions per category */
const OPTIONS = {
  'Parfum femme': { FR: ['30 ml', '50 ml', '100 ml'], EN: ['30 ml', '50 ml', '100 ml'] },
  'Châles':       { FR: ['Unique (200×70 cm)'],        EN: ['One size (200×70 cm)'] },
  'Voiles en soie':{ FR: ['Unique (180×90 cm)'],       EN: ['One size (180×90 cm)'] },
}

export default function Product() {
  const { id }         = useParams()
  const { lang, t }    = useLang()
  const navigate       = useNavigate()
  const p              = t.product

  // Find product from shared catalogue
  const product = products.find(pr => pr.id === Number(id)) || products[0]

  const name    = lang === 'FR' ? product.nameFR : product.nameEN
  const desc    = lang === 'FR' ? product.descFR : product.descEN
  const opts    = OPTIONS[product.cat]
  const tag     = product.tag ? product.tag[lang] : null
  const catLabel = t.categories[CAT_FR.indexOf(product.cat)] || product.cat

  const [selected, setSelected] = useState(null)
  const [added,    setAdded]    = useState(false)
  const [qty,      setQty]      = useState(1)
  const addToCart = useCart(s => s.add)

  const handleAdd = () => {
    if (opts && !selected) return
    const priceNumber = parseInt(String(product.price).replace(/\D/g, ''), 10) * 100
    addToCart(
      {
        id: product.slug || String(product.id),
        nameFR: product.nameFR,
        nameEN: product.nameEN,
        price: priceNumber,
        imgUrl: product.img,
      },
      opts ? 1 : qty,
      selected || ''
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  // Nearby products (same category, different id)
  const related = products.filter(pr => pr.cat === product.cat && pr.id !== product.id).slice(0, 4)

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.58rem] tracking-widest uppercase mb-10">
          <Link to="/" className="text-[#3a3a3a] hover:text-gold transition-colors">{p.breadHome}</Link>
          <span className="text-[#1e1e1e]">/</span>
          <Link to="/shop" className="text-[#3a3a3a] hover:text-gold transition-colors">{p.breadShop}</Link>
          <span className="text-[#1e1e1e]">/</span>
          <span className="text-gold truncate max-w-[180px]">{name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* ── Images ── */}
          <div className="space-y-3">
            <div
              className="luxury-card overflow-hidden relative bg-[#161616]"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={product.img}
                alt={name}
                className="w-full h-full object-cover"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              {tag && (
                <div className="absolute top-5 left-5">
                  <span className="label-gold bg-[#0a0a0a]/85 px-4 py-1.5 rounded-full text-[0.5rem] border border-gold/30">
                    {tag}
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnail row */}
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map(n => (
                <div
                  key={n}
                  className={`luxury-card overflow-hidden cursor-pointer bg-[#161616] ${n === 0 ? 'border-gold/40' : ''}`}
                  style={{ aspectRatio: '1' }}
                >
                  <img
                    src={`${product.img.split('?')[0]}?auto=format&fit=crop&w=200&q=70`}
                    alt=""
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="label-gold mb-2">{catLabel}</p>
              <h1 className="heading-luxury text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">{name}</h1>
              <p className="text-3xl text-gold font-serif font-semibold">{product.price}</p>
            </div>

            <GoldDivider />

            <p className="text-[#6a6a6a] text-sm font-light leading-relaxed">{desc}</p>

            {/* Options selector — only shown for relevant categories */}
            {opts ? (
              <div>
                <p className="label-gold mb-3">{product.cat === 'Parfum femme' ? p.volumeLabel : p.sizeLabel} <span className="text-gold/40">*</span></p>
                <div className="flex gap-2 flex-wrap">
                  {opts[lang]?.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSelected(opt)}
                      className={`px-4 py-2.5 border text-xs font-semibold tracking-wider transition-all duration-300 ${
                        selected === opt
                          ? 'border-gold bg-gold text-black'
                          : 'border-[#2a2a2a] text-[#4a4a4a] hover:border-gold hover:text-gold'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Quantity selector for items without variants */
              <div>
                <p className="label-gold mb-3">{lang === 'FR' ? 'Quantité' : 'Quantity'}</p>
                <div className="flex items-center gap-0 border border-[#2a2a2a] w-fit">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#5a5a5a] hover:text-gold transition-colors border-r border-[#2a2a2a] text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-white text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#5a5a5a] hover:text-gold transition-colors border-l border-[#2a2a2a] text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleAdd}
                className={`flex-1 btn-gold-solid py-4 text-[0.62rem] ${opts && !selected ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {added ? p.added : p.addToCart}
              </button>
              <button
                className="w-14 h-14 border border-[#2a2a2a] hover:border-gold transition-colors flex items-center justify-center text-[#4a4a4a] hover:text-gold"
                aria-label={p.wishlist}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Details table */}
            <div className="border border-[#1a1a1a] divide-y divide-[#1a1a1a] mt-1">
              {[
                { label: p.material, value: lang === 'FR' ? product.material?.FR : product.material?.EN },
                { label: p.origin,   value: lang === 'FR' ? product.origin?.FR   : product.origin?.EN   },
                { label: p.care,     value: lang === 'FR' ? product.care?.FR     : product.care?.EN     },
                {
                  label: p.delivery,
                  value: lang === 'FR' ? 'Express 1–2 jours, Standard 3–5 jours. Offerte dès £150.' : 'Express 1–2 days, Standard 3–5 days. Free from £150.'
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between py-4 px-5 gap-4">
                  <span className="label-gold text-[0.52rem] flex-shrink-0">{label}</span>
                  <span className="text-[#5a5a5a] text-xs text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Back to shop */}
            <button
              onClick={() => navigate('/shop')}
              className="text-[#3a3a3a] text-[0.6rem] tracking-widest uppercase hover:text-gold transition-colors mt-1 text-left"
            >
              ← {lang === 'FR' ? 'Retour à la boutique' : 'Back to the boutique'}
            </button>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-20">
            <GoldDivider />
            <div className="mt-12 text-center mb-10">
              <p className="label-gold mb-2">{lang === 'FR' ? 'Dans la même catégorie' : 'Same Category'}</p>
              <h2 className="heading-luxury text-3xl text-white">
                {lang === 'FR' ? 'Vous Aimerez Aussi' : 'You May Also Like'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(rel => (
                <Link key={rel.id} to={`/product/${rel.id}`} className="luxury-card group">
                  <div className="relative overflow-hidden bg-[#161616]" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={rel.img}
                      alt={lang === 'FR' ? rel.nameFR : rel.nameEN}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[rgba(201,168,76,0.06)] to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm text-white group-hover:text-gold transition-colors duration-300 mb-1.5">
                      {lang === 'FR' ? rel.nameFR : rel.nameEN}
                    </h3>
                    <p className="text-gold font-semibold text-sm">{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
