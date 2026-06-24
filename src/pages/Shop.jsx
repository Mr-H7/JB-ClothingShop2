import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import ProductVisual from '../components/ProductVisual'
import { useLang } from '../contexts/LangContext'
import { CAT_FR } from '../i18n/index.js'
import { products, formatProductPrice } from '../data/catalog'

const sortOptionsFR = ['Vedettes', 'Nouveautés', 'Prix croissant', 'Prix décroissant']
const sortOptionsEN = ['Featured', 'Newest', 'Price: Low-High', 'Price: High-Low']

export default function Shop() {
  const { lang, t } = useLang()
  const s = t.shop
  const [searchParams, setSearchParams] = useSearchParams()

  const enToFr = Object.fromEntries(t.categories.map((enCat, i) => [enCat, CAT_FR[i]]))
  const urlCat = searchParams.get('cat') || ''

  const resolveCat = rawCat => {
    if (!rawCat) return CAT_FR[0]
    if (CAT_FR.includes(rawCat)) return rawCat
    return enToFr[rawCat] || CAT_FR[0]
  }

  const [activeCatFR, setActiveCatFR] = useState(resolveCat(urlCat))
  const [sort, setSort] = useState(0)

  useEffect(() => {
    setActiveCatFR(resolveCat(urlCat))
  }, [urlCat, lang])

  const displayCategories = t.categories
  const filtered = products.filter(product => activeCatFR === CAT_FR[0] || product.cat === activeCatFR)

  const sorted = [...filtered].sort((a, b) => {
    const aPrice = a.priceValue ?? Number.POSITIVE_INFINITY
    const bPrice = b.priceValue ?? Number.POSITIVE_INFINITY
    if (sort === 2) return aPrice - bPrice
    if (sort === 3) return bPrice - aPrice
    return a.id - b.id
  })

  const sortOptions = lang === 'FR' ? sortOptionsFR : sortOptionsEN

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <section className="border-b border-[#1a1a1a] pb-14">
        <div className="container-luxury text-center">
          <p className="label-gold mb-3">{s.badge}</p>
          <h1 className="heading-luxury text-5xl md:text-6xl text-white">{s.heading}</h1>
          <GoldDivider variant="ornament" />
          <p className="text-[#5a5a5a] font-light max-w-md mx-auto text-sm">{s.sub}</p>
        </div>
      </section>

      <section className="border-b border-[#1a1a1a] sticky top-[72px] z-40 bg-[#0a0a0a]/96 backdrop-blur-sm">
        <div className="container-luxury py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 max-w-full">
            {displayCategories.map((label, i) => {
              const frKey = CAT_FR[i]
              const isActive = activeCatFR === frKey
              return (
                <button
                  key={frKey}
                  onClick={() => {
                    setActiveCatFR(frKey)
                    if (frKey === CAT_FR[0]) setSearchParams({})
                    else setSearchParams({ cat: frKey })
                  }}
                  className={`flex-shrink-0 px-4 py-1.5 text-[0.58rem] font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gold text-black'
                      : 'text-[#4a4a4a] hover:text-gold border border-transparent hover:border-gold/25'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <select
            value={sort}
            onChange={e => setSort(Number(e.target.value))}
            className="input-luxury w-auto text-[0.7rem] py-2 px-4 pr-8 appearance-none cursor-pointer rounded-full flex-shrink-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A84C' stroke-width='1.5'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
            }}
          >
            {sortOptions.map((option, i) => (
              <option key={option} value={i} style={{ background: '#111111' }}>{option}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="section-luxury">
        <div className="container-luxury">
          {sorted.length === 0 ? (
            <div className="text-center py-24 text-[#3a3a3a]">
              <p className="font-serif text-xl">{lang === 'FR' ? 'Aucun produit trouvé' : 'No products found'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sorted.map((product, i) => {
                const name = lang === 'FR' ? product.nameFR : product.nameEN
                const tag = product.tag ? product.tag[lang] : null
                const catLabel = displayCategories[CAT_FR.indexOf(product.cat)] || product.cat
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`luxury-card group animate-fade-up delay-${(i % 6 + 1) * 100}`}
                  >
                    <div className="relative overflow-hidden bg-[#161616]" style={{ aspectRatio: '3/4' }}>
                      <ProductVisual
                        product={product}
                        alt={name}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        imageClassName="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[rgba(201,168,76,0.06)] to-transparent" />
                      {tag && (
                        <div className="absolute top-4 left-4">
                          <span className="label-gold bg-[#0a0a0a]/85 px-3 py-1 rounded-full text-[0.5rem] border border-gold/30">
                            {tag}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                        <span className="btn-gold w-full py-2 text-[0.56rem] text-center cursor-pointer">
                          <span>{s.viewItem}</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[#3a3a3a] text-[0.52rem] tracking-widest uppercase mb-1">{catLabel}</p>
                      <h3 className="font-serif text-sm text-white group-hover:text-gold transition-colors duration-300 mb-1.5 leading-snug">
                        {name}
                      </h3>
                      <p className="text-gold font-semibold text-sm">{formatProductPrice(product, lang)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
