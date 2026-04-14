import { useState } from 'react'
import { Link } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'

const cartItems = [
  { id: 1, name: 'Midnight Noir Blazer',   price: 895,  size: 'M',  qty: 1 },
  { id: 2, name: 'Signature Silk Shirt',   price: 420,  size: 'L',  qty: 1 },
]

export default function Checkout() {
  const [step, setStep] = useState(1)

  const subtotal  = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping  = 0
  const total     = subtotal + shipping

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">

        <div className="text-center mb-12">
          <p className="label-gold mb-2">Checkout</p>
          <h1 className="heading-luxury text-4xl text-white">Complete Your Order</h1>
          <GoldDivider variant="ornament" />
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {['Delivery', 'Payment', 'Confirm'].map((label, i) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <form className="space-y-5" onSubmit={e => { e.preventDefault(); setStep(s => Math.min(s + 1, 3)) }}>
              <div className="luxury-card p-8">
                <h2 className="font-serif text-xl text-white mb-6">Delivery Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-gold block mb-2">First Name</label>
                    <input type="text" className="input-luxury" placeholder="James" />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">Last Name</label>
                    <input type="text" className="input-luxury" placeholder="Beaumont" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-gold block mb-2">Email Address</label>
                    <input type="email" className="input-luxury" placeholder="james@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-gold block mb-2">Delivery Address</label>
                    <input type="text" className="input-luxury" placeholder="10 Mayfair Street" />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">City</label>
                    <input type="text" className="input-luxury" placeholder="London" />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">Postcode</label>
                    <input type="text" className="input-luxury" placeholder="W1K 1AA" />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-gold-solid w-full py-4">
                Continue to Payment
              </button>
            </form>
          </div>

          {/* ── Order Summary ── */}
          <div className="luxury-card p-6 self-start sticky top-28">
            <h2 className="font-serif text-lg text-white mb-5">Order Summary</h2>
            <div className="space-y-4 mb-5">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div
                    className="w-16 h-20 flex-shrink-0 border border-[#2a2a2a]"
                    style={{ background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' }}
                  />
                  <div className="flex-1">
                    <p className="font-serif text-sm text-white leading-tight">{item.name}</p>
                    <p className="text-[#4a4a4a] text-[0.6rem] tracking-widest uppercase mt-1">Size: {item.size}</p>
                    <p className="text-gold text-sm font-semibold mt-1">£{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <GoldDivider />
            <div className="space-y-2 mt-4 text-sm">
              <div className="flex justify-between text-[#5a5a5a]">
                <span>Subtotal</span>
                <span>£{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#5a5a5a]">
                <span>Shipping</span>
                <span className="text-gold">Complimentary</span>
              </div>
            </div>
            <GoldDivider className="my-4" />
            <div className="flex justify-between text-white font-semibold">
              <span className="font-serif text-base">Total</span>
              <span className="text-gold text-lg">£{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
