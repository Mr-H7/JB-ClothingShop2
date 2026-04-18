import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import { useLang } from '../contexts/LangContext'
import { CAT_FR } from '../i18n/index.js'

/* ─── Product catalogue ─────────────────────────────────────────────────── */
export const products = [
  // Les Sacs
  {
    id: 1,
    slug: 'sac-noir-eclat',
    nameFR: 'Sac Noir Éclat',
    nameEN: 'Black Éclat Bag',
    price:  '£495',
    cat:    'Les Sacs',
    tag:    { FR: 'Nouveau', EN: 'New' },
    img:    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    descFR: "Sac en cuir pleine fleur noir mat aux lignes architecturales. Doublure en satin, fermoir magnétique doré et bandoulière amovible. Un indispensable intemporel.",
    descEN: "Matte black full-grain leather bag with architectural lines. Satin lining, gold magnetic clasp, and removable strap. A timeless essential.",
    material: { FR: 'Cuir pleine fleur', EN: 'Full-grain leather' },
    origin:   { FR: 'Fabriqué en Italie', EN: 'Made in Italy' },
    care:     { FR: 'Entretien avec crème cuir', EN: 'Condition with leather cream' },
  },
  {
    id: 2,
    slug: 'sac-bandouliere-bordeaux',
    nameFR: 'Sac Bandoulière Bordeaux',
    nameEN: 'Bordeaux Crossbody Bag',
    price:  '£385',
    cat:    'Les Sacs',
    tag:    { FR: 'Bestseller', EN: 'Bestseller' },
    img:    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    descFR: "Sac bandoulière en cuir bordeaux aux reflets profonds. Chaîne dorée, poche zippée intérieure et compartiments multiples pour une organisation parfaite.",
    descEN: "Bordeaux leather crossbody with deep undertones. Gold chain, interior zip pocket, and multiple compartments for effortless organisation.",
    material: { FR: 'Cuir vélin bordeaux', EN: 'Bordeaux vellum leather' },
    origin:   { FR: 'Fabriqué en Espagne', EN: 'Made in Spain' },
    care:     { FR: 'Entretien avec crème cuir', EN: 'Condition with leather cream' },
  },

  // Montres
  {
    id: 3,
    slug: 'montre-or-rose-imperial',
    nameFR: 'Montre Or Rose Impérial',
    nameEN: 'Imperial Rose Gold Watch',
    price:  '£890',
    cat:    'Montres',
    tag:    { FR: 'Exclusif', EN: 'Exclusive' },
    img:    'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=600&q=80',
    descFR: "Montre en or rose avec cadran guilloché et bracelet en cuir havane. Mouvement à quartz de précision suisse. Étanche à 30 mètres.",
    descEN: "Rose gold watch with guilloché dial and tan leather strap. Swiss precision quartz movement. Water-resistant to 30 metres.",
    material: { FR: 'Boîtier en acier or rose, cuir havane', EN: 'Rose gold steel case, tan leather' },
    origin:   { FR: 'Mouvement suisse', EN: 'Swiss movement' },
    care:     { FR: 'Révision recommandée tous les 3 ans', EN: 'Service recommended every 3 years' },
  },
  {
    id: 4,
    slug: 'montre-minimaliste-noire',
    nameFR: 'Montre Minimaliste Noire',
    nameEN: 'Black Minimalist Watch',
    price:  '£750',
    cat:    'Montres',
    tag:    null,
    img:    'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=600&q=80',
    descFR: "Montre minimaliste à cadran noir mat avec index dorés. Bracelet en cuir noir gaufré. L'élégance dans sa forme la plus pure.",
    descEN: "Minimalist watch with matte black dial and gold indices. Embossed black leather strap. Elegance in its purest form.",
    material: { FR: 'Boîtier en acier, cuir gaufré', EN: 'Steel case, embossed leather' },
    origin:   { FR: 'Mouvement japonais', EN: 'Japanese movement' },
    care:     { FR: 'Éviter l\'eau et les chocs', EN: 'Avoid water and impact' },
  },

  // Lunettes
  {
    id: 5,
    slug: 'lunettes-aviateur-dorees',
    nameFR: 'Lunettes Aviateur Dorées',
    nameEN: 'Gold Aviator Sunglasses',
    price:  '£180',
    cat:    'Lunettes',
    tag:    { FR: 'Nouveau', EN: 'New' },
    img:    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    descFR: "Lunettes de soleil aviateur à monture dorée et verres dégradés fumés. Protection UV 400. Livrées avec étui en cuir et chiffon en microfibre.",
    descEN: "Gold aviator sunglasses with gradient smoked lenses. UV 400 protection. Delivered with leather case and microfibre cloth.",
    material: { FR: 'Monture métal doré, verres polarisés', EN: 'Gold metal frame, polarised lenses' },
    origin:   { FR: 'Fabriqué en Italie', EN: 'Made in Italy' },
    care:     { FR: 'Nettoyer avec le chiffon fourni', EN: 'Clean with the included cloth' },
  },
  {
    id: 6,
    slug: 'lunettes-cat-eye-noires',
    nameFR: 'Lunettes Cat-Eye Noires',
    nameEN: 'Black Cat-Eye Sunglasses',
    price:  '£165',
    cat:    'Lunettes',
    tag:    { FR: 'Limité', EN: 'Limited' },
    img:    'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=600&q=80',
    descFR: "Lunettes cat-eye en acétate noir avec verres noirs intenses. Design iconique revisité avec une touche contemporaine dorée sur les charnières.",
    descEN: "Black acetate cat-eye sunglasses with intense black lenses. Iconic design revisited with a contemporary gold touch on hinges.",
    material: { FR: 'Acétate noir, charnières dorées', EN: 'Black acetate, gold hinges' },
    origin:   { FR: 'Fabriqué en France', EN: 'Made in France' },
    care:     { FR: 'Nettoyer avec le chiffon fourni', EN: 'Clean with the included cloth' },
  },

  // Châles
  {
    id: 7,
    slug: 'chale-cachemire-marine',
    nameFR: 'Châle Cachemire Marine',
    nameEN: 'Navy Cashmere Shawl',
    price:  '£220',
    cat:    'Châles',
    tag:    null,
    img:    'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?auto=format&fit=crop&w=600&q=80',
    descFR: "Châle en cachemire 100% d'une douceur incomparable. Coloris bleu marine profond avec finitions effilochées à la main. Dimensions 200 × 70 cm.",
    descEN: "100% cashmere shawl of incomparable softness. Deep navy blue with hand-frayed finishes. Dimensions 200 × 70 cm.",
    material: { FR: 'Cachemire 100% grade A', EN: '100% Grade A cashmere' },
    origin:   { FR: 'Fabriqué au Népal', EN: 'Made in Nepal' },
    care:     { FR: 'Lavage à la main à l\'eau froide', EN: 'Hand-wash in cold water' },
  },
  {
    id: 8,
    slug: 'chale-soie-ivoire',
    nameFR: 'Châle Soie Ivoire',
    nameEN: 'Ivory Silk Shawl',
    price:  '£195',
    cat:    'Châles',
    tag:    { FR: 'Bestseller', EN: 'Bestseller' },
    img:    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    descFR: "Châle en soie de mûrier ivoire à reflets nacrés. Léger et fluide, il s'adapte à toutes les occasions avec une grâce naturelle.",
    descEN: "Ivory mulberry silk shawl with pearlescent shimmer. Lightweight and fluid, it adapts to every occasion with effortless grace.",
    material: { FR: 'Soie de mûrier 100%', EN: '100% mulberry silk' },
    origin:   { FR: 'Fabriqué en Chine', EN: 'Made in China' },
    care:     { FR: 'Nettoyage à sec recommandé', EN: 'Dry clean recommended' },
  },

  // Parfum femme
  {
    id: 9,
    slug: 'essence-noire-edp',
    nameFR: 'Essence Noire EDP',
    nameEN: 'Essence Noire EDP',
    price:  '£145',
    cat:    'Parfum femme',
    tag:    { FR: 'Exclusif', EN: 'Exclusive' },
    img:    'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=600&q=80',
    descFR: "Un sillage profond et envoûtant composé de notes de oud, de patchouli et de rose absolue. Un parfum de caractère pour la femme qui s'affirme.",
    descEN: "A deep and captivating sillage of oud, patchouli, and rose absolute. A character fragrance for the woman who makes a statement.",
    material: { FR: 'Eau de Parfum, 50 ml', EN: 'Eau de Parfum, 50 ml' },
    origin:   { FR: 'Créé à Grasse, France', EN: 'Created in Grasse, France' },
    care:     { FR: 'Conserver à l\'abri de la lumière', EN: 'Store away from light and heat' },
  },
  {
    id: 10,
    slug: 'rose-imperiale-edp',
    nameFR: 'Rose Impériale EDP',
    nameEN: 'Rose Impériale EDP',
    price:  '£165',
    cat:    'Parfum femme',
    tag:    { FR: 'Nouveau', EN: 'New' },
    img:    'https://images.unsplash.com/photo-1588776814546-1ffbb172d3da?auto=format&fit=crop&w=600&q=80',
    descFR: "Une ode florale à la rose de Turquie, rehaussée de bergamote dorée et de musc blanc. Féminité et raffinement en un seul flacon.",
    descEN: "A floral ode to Turkish rose, enhanced with golden bergamot and white musk. Femininity and refinement in a single bottle.",
    material: { FR: 'Eau de Parfum, 50 ml', EN: 'Eau de Parfum, 50 ml' },
    origin:   { FR: 'Créé à Grasse, France', EN: 'Created in Grasse, France' },
    care:     { FR: 'Conserver à l\'abri de la lumière', EN: 'Store away from light and heat' },
  },

  // Porte M & accessoires
  {
    id: 11,
    slug: 'porte-monnaie-cuir-noir',
    nameFR: 'Porte-Monnaie Cuir Noir',
    nameEN: 'Black Leather Wallet',
    price:  '£85',
    cat:    'Porte M & accessoires',
    tag:    null,
    img:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    descFR: "Porte-monnaie compact en cuir de veau noir avec coutures dorées. Six emplacements cartes, un compartiment monnaie et une poche billet.",
    descEN: "Compact black calf leather wallet with gold stitching. Six card slots, coin compartment, and a note pocket.",
    material: { FR: 'Cuir de veau, coutures dorées', EN: 'Calf leather, gold stitching' },
    origin:   { FR: 'Fabriqué en Italie', EN: 'Made in Italy' },
    care:     { FR: 'Entretien avec crème cuir', EN: 'Condition with leather cream' },
  },
  {
    id: 12,
    slug: 'porte-cartes-dore',
    nameFR: 'Porte-Cartes Doré',
    nameEN: 'Gold Card Holder',
    price:  '£65',
    cat:    'Porte M & accessoires',
    tag:    { FR: 'Nouveau', EN: 'New' },
    img:    'https://images.unsplash.com/photo-1548171915-e1db7e4af8d3?auto=format&fit=crop&w=600&q=80',
    descFR: "Porte-cartes slim en cuir noir avec passepoil doré. Quatre emplacements cartes, finitions à la main. L'élégance dans votre poche.",
    descEN: "Slim black leather card holder with gold piping. Four card slots, hand-finished edges. Elegance in your pocket.",
    material: { FR: 'Cuir vachette, bords peints or', EN: 'Cowhide leather, gold-painted edges' },
    origin:   { FR: 'Fabriqué en France', EN: 'Made in France' },
    care:     { FR: 'Entretien avec crème cuir', EN: 'Condition with leather cream' },
  },

  // Voiles en soie
  {
    id: 13,
    slug: 'voile-soie-doree',
    nameFR: 'Voile Soie Dorée',
    nameEN: 'Gold Silk Veil',
    price:  '£125',
    cat:    'Voiles en soie',
    tag:    { FR: 'Limité', EN: 'Limited' },
    img:    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
    descFR: "Voile en soie naturelle aux reflets dorés. Ourlet roulé à la main, tissu fluide et léger idéal pour toutes occasions. Dimensions 180 × 90 cm.",
    descEN: "Natural silk veil with golden shimmer. Hand-rolled hem, fluid and lightweight fabric ideal for any occasion. 180 × 90 cm.",
    material: { FR: 'Soie naturelle 100%', EN: '100% natural silk' },
    origin:   { FR: 'Tissé en Inde', EN: 'Woven in India' },
    care:     { FR: 'Nettoyage à sec uniquement', EN: 'Dry clean only' },
  },
  {
    id: 14,
    slug: 'voile-soie-nuit',
    nameFR: 'Voile Soie Nuit',
    nameEN: 'Midnight Silk Veil',
    price:  '£115',
    cat:    'Voiles en soie',
    tag:    null,
    img:    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    descFR: "Voile en soie noir nuit, subtile et raffinée. La légèreté de la soie au service d'un style discret et élégant. Dimensions 180 × 90 cm.",
    descEN: "Midnight black silk veil, subtle and refined. The lightness of silk in service of a discreet and elegant style. 180 × 90 cm.",
    material: { FR: 'Soie naturelle 100%', EN: '100% natural silk' },
    origin:   { FR: 'Tissé en Inde', EN: 'Woven in India' },
    care:     { FR: 'Nettoyage à sec uniquement', EN: 'Dry clean only' },
  },
]

const sortOptionsFR = ['Vedettes', 'Nouveautés', 'Prix croissant', 'Prix décroissant']
const sortOptionsEN = ['Featured', 'Newest', 'Price: Low–High', 'Price: High–Low']

export default function Shop() {
  const { lang, t }       = useLang()
  const s                 = t.shop
  const [searchParams]    = useSearchParams()

  // Map EN display category to FR internal category key
  const enToFr = Object.fromEntries(
    t.categories.map((enCat, i) => [enCat, CAT_FR[i]])
  )

  const urlCat  = searchParams.get('cat') || ''
  const initCat = urlCat
    ? (CAT_FR.includes(urlCat) ? urlCat : CAT_FR[0])
    : CAT_FR[0]

  const [activeCatFR, setActiveCatFR] = useState(initCat)
  const [sort,        setSort]        = useState(0)

  // When URL param changes, update filter
  useEffect(() => {
    if (urlCat && CAT_FR.includes(urlCat)) setActiveCatFR(urlCat)
  }, [urlCat])

  const displayCategories = t.categories  // FR or EN display labels

  const filtered = products.filter(p =>
    activeCatFR === CAT_FR[0] || p.cat === activeCatFR
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 2) return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''))
    if (sort === 3) return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''))
    return 0
  })

  const sortOptions = lang === 'FR' ? sortOptionsFR : sortOptionsEN

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">

      {/* ── Page Header ── */}
      <section className="border-b border-[#1a1a1a] pb-14">
        <div className="container-luxury text-center">
          <p className="label-gold mb-3">{s.badge}</p>
          <h1 className="heading-luxury text-5xl md:text-6xl text-white">{s.heading}</h1>
          <GoldDivider variant="ornament" />
          <p className="text-[#5a5a5a] font-light max-w-md mx-auto text-sm">{s.sub}</p>
        </div>
      </section>

      {/* ── Category + Sort bar ── */}
      <section className="border-b border-[#1a1a1a] sticky top-[72px] z-40 bg-[#0a0a0a]/96 backdrop-blur-sm">
        <div className="container-luxury py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Category pills — scrollable on mobile */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 max-w-full">
            {displayCategories.map((label, i) => {
              const frKey   = CAT_FR[i]
              const isActive = activeCatFR === frKey
              return (
                <button
                  key={frKey}
                  onClick={() => setActiveCatFR(frKey)}
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

          {/* Sort */}
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
            {sortOptions.map((o, i) => (
              <option key={o} value={i} style={{ background: '#111111' }}>{o}</option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Product Grid ── */}
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
                const tag  = product.tag ? product.tag[lang] : null
                const catLabel = displayCategories[CAT_FR.indexOf(product.cat)] || product.cat
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`luxury-card group animate-fade-up delay-${(i % 6 + 1) * 100}`}
                  >
                    <div className="relative overflow-hidden bg-[#161616]" style={{ aspectRatio: '3/4' }}>
                      <img
                        src={product.img}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={e => { e.currentTarget.style.display = 'none' }}
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
                      <p className="text-gold font-semibold text-sm">{product.price}</p>
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
