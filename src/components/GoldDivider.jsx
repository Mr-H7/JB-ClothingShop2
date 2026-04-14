export default function GoldDivider({ variant = 'full', className = '' }) {
  if (variant === 'short') {
    return (
      <div className={`flex items-center justify-center my-6 ${className}`}>
        <span className="block w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span className="mx-3 w-1 h-1 rounded-full bg-gold opacity-70" />
        <span className="block w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    )
  }

  if (variant === 'left') {
    return (
      <div className={`flex items-center gap-4 my-6 ${className}`}>
        <span className="block w-12 h-px bg-gradient-to-r from-gold to-transparent" />
      </div>
    )
  }

  if (variant === 'ornament') {
    return (
      <div className={`flex items-center gap-4 my-10 ${className}`}>
        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
        <span className="text-gold opacity-60 text-xs tracking-[0.3em] font-serif">✦</span>
        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
      </div>
    )
  }

  return (
    <div className={`gold-divider ${className}`} />
  )
}
