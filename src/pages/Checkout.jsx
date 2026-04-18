import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import { useCart } from '../contexts/CartContext'
import { useLang } from '../contexts/LangContext'
import { api } from '../lib/api'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const { lang }        = useLang()
  const navigate        = useNavigate()

  const items    = useCart(s => s.items)
  const clear    = useCart(s => s.clear)
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const shipping = 0
  const total    = subtotal + shipping

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    line1: '', city: '', postcode: '', phone: '',
  })
  const [error, setError] = useState('')
  const [busy,  setBusy]  = useState(false)
  const [confirmed, setConfirmed] = useState(null)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onDeliverySubmit = e => {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.line1 || !form.city || !form.postcode) {
      setError(lang === 'FR' ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill all required fields.')
      return
    }
    setError('')
    setStep(2)
  }

  const onPayAndConfirm = async () => {
    if (items.length === 0) {
      setError(lang === 'FR' ? 'Votre panier est vide.' : 'Your cart is empty.')
      return
    }
    setError('')
    setBusy(true)
    try {
      const res = await api.post('/orders', {
        lang,
        shippingAddress: {
          firstName: form.firstName,
          lastName:  form.lastName,
          email:     form.email,
          line1:     form.line1,
          city:      form.city,
          postcode:  form.postcode,
          phone:     form.phone,
          country:   'GB',
        },
        cartItems: items.map(it => ({
          productSlug: it.productId,
          quantity:    it.quantity,
          variant:     it.variant,
        })),
      })
      clear()
      setConfirmed(res)
      setStep(3)
    } catch (err) {
      setError(err.message || 'Order failed')
    } finally {
      setBusy(false)
    }
  }

  const L = lang === 'FR' ? {
    badge: 'Paiement', h1: 'Finaliser votre Commande',
    stepLabels: ['Livraison', 'Paiement', 'Confirmation'],
    deliveryTitle: 'Informations de Livraison',
    firstName: 'Prénom', lastName: 'Nom', email: 'Email',
    address: 'Adresse', city: 'Ville', postcode: 'Code Postal', phone: 'Téléphone',
    continuePay: 'Continuer vers le paiement',
    paymentTitle: 'Méthode de Paiement',
    codLabel: 'Paiement à la livraison (COD)',
    codDesc: 'Vous paierez en espèces ou par carte à la réception de votre colis.',
    back: '← Retour',
    confirmPay: 'Confirmer la Commande',
    summary: 'Récapitulatif', subtotal: 'Sous-total', shipping: 'Livraison',
    complimentary: 'Offerte', total: 'Total',
    emptyCart: 'Votre panier est vide.',
    backToShop: 'Retour à la boutique',
    confirmedH: 'Commande confirmée',
    confirmedP: 'Merci pour votre commande. Vous recevrez une confirmation par email.',
    orderRef: 'Référence',
    viewAccount: 'Voir mes commandes',
  } : {
    badge: 'Checkout', h1: 'Complete Your Order',
    stepLabels: ['Delivery', 'Payment', 'Confirm'],
    deliveryTitle: 'Delivery Information',
    firstName: 'First Name', lastName: 'Last Name', email: 'Email Address',
    address: 'Delivery Address', city: 'City', postcode: 'Postcode', phone: 'Phone',
    continuePay: 'Continue to Payment',
    paymentTitle: 'Payment Method',
    codLabel: 'Cash on Delivery (COD)',
    codDesc: 'Pay with cash or card upon delivery of your parcel.',
    back: '← Back',
    confirmPay: 'Confirm Order',
    summary: 'Order Summary', subtotal: 'Subtotal', shipping: 'Shipping',
    complimentary: 'Complimentary', total: 'Total',
    emptyCart: 'Your cart is empty.',
    backToShop: 'Back to the boutique',
    confirmedH: 'Order Confirmed',
    confirmedP: 'Thank you for your order. You will receive an email confirmation shortly.',
    orderRef: 'Reference',
    viewAccount: 'View my orders',
  }

  const money = pence => `£${(pence / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">

        <div className="text-center mb-12">
          <p className="label-gold mb-2">{L.badge}</p>
          <h1 className="heading-luxury text-4xl text-white">{L.h1}</h1>
          <GoldDivider variant="ornament" />
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {L.stepLabels.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step > i + 1 ? 'bg-gold text-black'
                  : step === i + 1 ? 'bg-gold text-black'
                  : 'border border-[#2a2a2a] text-[#3a3a3a]'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-[0.6rem] tracking-widest uppercase mt-1.5 ${step === i + 1 ? 'text-gold' : 'text-[#3a3a3a]'}`}>
                  {label}
                </span>
              </div>
              {i < 2 && <div className={`w-16 sm:w-24 h-px mx-3 mb-5 ${step > i + 1 ? 'bg-gold' : 'bg-[#2a2a2a]'}`} />}
            </div>
          ))}
        </div>

        {items.length === 0 && step !== 3 ? (
          <div className="luxury-card p-14 text-center max-w-lg mx-auto">
            <p className="label-gold mb-4">{L.emptyCart}</p>
            <Link to="/shop" className="btn-gold-solid inline-block mt-4">{L.backToShop}</Link>
          </div>
        ) : step === 3 ? (
          <div className="luxury-card p-14 text-center max-w-xl mx-auto border-gold/30">
            <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6 bg-gold/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-white mb-3">{L.confirmedH}</h2>
            <p className="text-[#5a5a5a] font-light text-sm max-w-sm mx-auto leading-relaxed mb-4">{L.confirmedP}</p>
            {confirmed?.orderId && (
              <p className="label-gold text-[0.6rem]">{L.orderRef}: <span className="text-gold">{confirmed.orderId.slice(-10).toUpperCase()}</span></p>
            )}
            <GoldDivider variant="ornament" className="max-w-xs mx-auto mt-6" />
            <div className="flex gap-3 justify-center flex-wrap mt-6">
              <button onClick={() => navigate('/account')} className="btn-gold-solid px-6">{L.viewAccount}</button>
              <button onClick={() => navigate('/shop')} className="btn-gold px-6"><span>{L.backToShop}</span></button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Form ── */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <form className="space-y-5" onSubmit={onDeliverySubmit}>
                  <div className="luxury-card p-8">
                    <h2 className="font-serif text-xl text-white mb-6">{L.deliveryTitle}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label-gold block mb-2">{L.firstName}</label>
                        <input name="firstName" value={form.firstName} onChange={onChange} type="text" className="input-luxury" placeholder="James" />
                      </div>
                      <div>
                        <label className="label-gold block mb-2">{L.lastName}</label>
                        <input name="lastName" value={form.lastName} onChange={onChange} type="text" className="input-luxury" placeholder="Beaumont" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label-gold block mb-2">{L.email}</label>
                        <input name="email" value={form.email} onChange={onChange} type="email" className="input-luxury" placeholder="james@example.com" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label-gold block mb-2">{L.address}</label>
                        <input name="line1" value={form.line1} onChange={onChange} type="text" className="input-luxury" placeholder="10 Mayfair Street" />
                      </div>
                      <div>
                        <label className="label-gold block mb-2">{L.city}</label>
                        <input name="city" value={form.city} onChange={onChange} type="text" className="input-luxury" placeholder="London" />
                      </div>
                      <div>
                        <label className="label-gold block mb-2">{L.postcode}</label>
                        <input name="postcode" value={form.postcode} onChange={onChange} type="text" className="input-luxury" placeholder="W1K 1AA" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label-gold block mb-2">{L.phone}</label>
                        <input name="phone" value={form.phone} onChange={onChange} type="tel" className="input-luxury" placeholder="+44 7700 000000" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="border border-red-400/30 bg-red-400/5 px-4 py-3 text-red-400 text-xs">
                      {error}
                    </div>
                  )}

                  <button type="submit" className="btn-gold-solid w-full py-4">
                    {L.continuePay}
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="luxury-card p-8">
                    <h2 className="font-serif text-xl text-white mb-6">{L.paymentTitle}</h2>
                    <div className="border border-gold/30 bg-[#161408] px-5 py-5 rounded-sm">
                      <p className="label-gold mb-2">{L.codLabel}</p>
                      <p className="text-[#6a6a6a] text-sm font-light leading-relaxed">{L.codDesc}</p>
                    </div>
                  </div>

                  {error && (
                    <div className="border border-red-400/30 bg-red-400/5 px-4 py-3 text-red-400 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-gold flex-1 py-4"><span>{L.back}</span></button>
                    <button onClick={onPayAndConfirm} disabled={busy} className="btn-gold-solid flex-[2] py-4 disabled:opacity-50">
                      {busy ? '…' : L.confirmPay}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Order Summary ── */}
            <div className="luxury-card p-6 self-start sticky top-28">
              <h2 className="font-serif text-lg text-white mb-5">{L.summary}</h2>
              <div className="space-y-4 mb-5">
                {items.map(item => (
                  <div key={item.key} className="flex gap-4">
                    <div
                      className="w-16 h-20 flex-shrink-0 border border-[#2a2a2a] bg-cover bg-center"
                      style={{ backgroundImage: item.imgUrl ? `url(${item.imgUrl})` : 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' }}
                    />
                    <div className="flex-1">
                      <p className="font-serif text-sm text-white leading-tight">
                        {lang === 'FR' ? item.nameFR : item.nameEN}
                      </p>
                      {item.variant && (
                        <p className="text-[#4a4a4a] text-[0.6rem] tracking-widest uppercase mt-1">{item.variant}</p>
                      )}
                      <p className="text-[#4a4a4a] text-[0.6rem] tracking-widest uppercase mt-1">× {item.quantity}</p>
                      <p className="text-gold text-sm font-semibold mt-1">{money(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <GoldDivider />
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex justify-between text-[#5a5a5a]">
                  <span>{L.subtotal}</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5a5a5a]">
                  <span>{L.shipping}</span>
                  <span className="text-gold">{L.complimentary}</span>
                </div>
              </div>
              <GoldDivider className="my-4" />
              <div className="flex justify-between text-white font-semibold">
                <span className="font-serif text-base">{L.total}</span>
                <span className="text-gold text-lg">{money(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
