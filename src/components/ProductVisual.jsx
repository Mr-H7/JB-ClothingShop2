import { CATALOG_CATEGORIES } from '../data/catalog'

export default function ProductVisual({ product, alt, className = '', imageClassName = '' }) {
  if (product?.img) {
    return (
      <img
        src={product.img}
        alt={alt || product.nameEN}
        className={imageClassName || className}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
    )
  }

  const category = CATALOG_CATEGORIES.find(cat => cat.key === product?.catKey)
  const initials = (product?.brand || product?.nameEN || 'JB')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#111111] ${className}`}
      aria-label={alt || product?.nameEN}
      role="img"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#101010_0%,#18140b_48%,#0d0d0d_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(201,168,76,.35) 1px, transparent 1px), linear-gradient(rgba(201,168,76,.22) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="relative z-10 flex h-28 w-28 items-center justify-center border border-gold/35 bg-black/35 shadow-[0_0_45px_rgba(201,168,76,0.12)]">
        <span className="font-serif text-4xl text-white">{initials}</span>
      </div>
      <div className="absolute bottom-5 left-5 right-5 z-10">
        <p className="label-gold text-[0.48rem]">{category?.nameEN || product?.cat}</p>
        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
          Image coming soon
        </p>
      </div>
    </div>
  )
}
