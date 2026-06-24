import { Link } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import { useCart } from '../contexts/CartContext'
import { useLang } from '../contexts/LangContext'
import { openWhatsapp, buildCartMessage } from '../lib/whatsapp'

export default function Cart() {
  const { lang }   = useLang()
  const items      = useCart(s => s.items)
  const updateQty  = useCart(s => s.updateQty)
  const remove     = useCart(s => s.remove)
  const subtotal   = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const L = lang === 'FR' ? {
    badge: 'Votre Panier', h1: 'Panier',
    empty: 'Votre panier est vide.',
    backToShop: 'Retour à la boutique',
    subtotal: 'Sous-total',
    total: 'Total',
    sendViaWa: 'Envoyer la Commande via WhatsApp',
    remove: 'Retirer',
    qty: 'Quantité',
    note: 'La finalisation se fait par WhatsApp avec notre équipe.',
  } : {
    badge: 'Your Cart', h1: 'Cart',
    empty: 'Your cart is empty.',
    backToShop: 'Back to the boutique',
    subtotal: 'Subtotal',
    total: 'Total',
    sendViaWa: 'Send Order via WhatsApp',
    remove: 'Remove',
    qty: 'Quantity',
    note: 'Orders are finalised on WhatsApp with our team.',
  }

  const money = pence => {
    const v = (pence / 100).toLocaleString(lang === 'FR' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 2 })
    return lang === 'FR' ? `${v} £` : `£${v}`
  }

  const handleSend = () => {
    if (!items.length) return
    openWhatsapp(buildCartMessage(items, lang))
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">

        <div className="text-center mb-12">
          <p className="label-gold mb-2">{L.badge}</p>
          <h1 className="heading-luxury text-4xl text-white">{L.h1}</h1>
          <GoldDivider variant="ornament" />
        </div>

        {items.length === 0 ? (
          <div className="luxury-card p-14 text-center max-w-lg mx-auto">
            <p className="label-gold mb-4">{L.empty}</p>
            <Link to="/shop" className="btn-gold-solid inline-block mt-4">{L.backToShop}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Items ── */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.key} className="luxury-card p-5 flex gap-5">
                  <div
                    className="w-24 h-28 flex-shrink-0 border border-[#2a2a2a] bg-cover bg-center"
                    style={{ backgroundImage: item.imgUrl ? `url(${item.imgUrl})` : 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="font-serif text-base text-white leading-tight">
                        {lang === 'FR' ? item.nameFR : item.nameEN}
                      </p>
                      {item.variant && (
                        <p className="text-[#4a4a4a] text-[0.6rem] tracking-widest uppercase mt-1">{item.variant}</p>
                      )}
                      <p className="text-gold text-sm font-semibold mt-2">{money(item.price)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
                      <div className="flex items-center border border-[#2a2a2a] w-fit">
                        <button
                          onClick={() => updateQty(item.key, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-[#5a5a5a] hover:text-gold border-r border-[#2a2a2a] text-lg"
                          aria-label="-"
                        >−</button>
                        <span className="w-10 text-center text-white text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.key, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-[#5a5a5a] hover:text-gold border-l border-[#2a2a2a] text-lg"
                          aria-label="+"
                        >+</button>
                      </div>
                      <button
                        onClick={() => remove(item.key)}
                        className="text-[#4a4a4a] hover:text-red-400 text-[0.6rem] tracking-widest uppercase transition-colors"
                      >
                        {L.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Summary ── */}
            <div className="luxury-card p-6 self-start sticky top-28">
              <h2 className="font-serif text-lg text-white mb-5">{L.total}</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#5a5a5a]">
                  <span>{L.subtotal}</span>
                  <span>{money(subtotal)}</span>
                </div>
              </div>
              <GoldDivider className="my-4" />
              <div className="flex justify-between text-white font-semibold mb-6">
                <span className="font-serif text-base">{L.total}</span>
                <span className="text-gold text-lg">{money(subtotal)}</span>
              </div>

              <button
                onClick={handleSend}
                className="btn-gold-solid w-full py-4 flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                </svg>
                {L.sendViaWa}
              </button>
              <p className="text-[#3a3a3a] text-[0.6rem] tracking-wide mt-4 text-center">
                {L.note}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
