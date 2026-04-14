import { useState } from 'react'
import GoldDivider from '../components/GoldDivider'

const orders = [
  { id: 'JB-4291', date: 'March 24, 2025', status: 'Delivered',    total: '£895',   items: 1 },
  { id: 'JB-3887', date: 'February 8, 2025', status: 'Delivered',   total: '£1,710', items: 3 },
  { id: 'JB-3401', date: 'December 15, 2024', status: 'Delivered',  total: '£420',   items: 1 },
]

const tabs = ['Profile', 'Orders', 'Wishlist', 'Preferences']

export default function Account() {
  const [activeTab, setActiveTab] = useState('Profile')

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">

        <div className="text-center mb-12">
          <p className="label-gold mb-2">My Account</p>
          <h1 className="heading-luxury text-4xl text-white">Welcome Back</h1>
          <GoldDivider variant="ornament" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="luxury-card p-6 mb-5 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-4 bg-[#1a1a1a]">
                <span className="font-serif text-2xl text-gold font-bold">JB</span>
              </div>
              <h3 className="font-serif text-lg text-white">James Beaumont</h3>
              <p className="text-[#4a4a4a] text-xs mt-1">Member since 2023</p>
              <span className="inline-block mt-3 label-gold border border-gold/30 px-3 py-1 rounded-full text-[0.5rem]">
                Gold Member
              </span>
            </div>

            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeTab === tab
                      ? 'text-gold bg-[#161616] border-l-2 border-gold'
                      : 'text-[#5a5a5a] hover:text-gold hover:bg-[#111111] border-l-2 border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button className="w-full text-left px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#3a3a3a] hover:text-red-400 transition-colors mt-4 border-t border-[#1e1e1e]">
                Sign Out
              </button>
            </nav>
          </div>

          {/* ── Main Content ── */}
          <div className="lg:col-span-3">
            {activeTab === 'Profile' && (
              <div className="luxury-card p-8">
                <h2 className="font-serif text-2xl text-white mb-6">Personal Information</h2>
                <GoldDivider className="mb-8" />
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-5" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="label-gold block mb-2">First Name</label>
                    <input type="text" defaultValue="James" className="input-luxury" />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">Last Name</label>
                    <input type="text" defaultValue="Beaumont" className="input-luxury" />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">Email</label>
                    <input type="email" defaultValue="james@example.com" className="input-luxury" />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">Phone</label>
                    <input type="tel" defaultValue="+44 7700 900000" className="input-luxury" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-gold block mb-2">Address</label>
                    <input type="text" defaultValue="10 Mayfair Street, London, W1K 1AA" className="input-luxury" />
                  </div>
                  <div className="sm:col-span-2 flex justify-end mt-2">
                    <button type="submit" className="btn-gold-solid">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'Orders' && (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="luxury-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div>
                      <p className="font-serif text-base text-white">{order.id}</p>
                      <p className="text-[#4a4a4a] text-xs mt-1">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-[0.6rem] tracking-widest uppercase text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                        {order.status}
                      </span>
                      <p className="text-gold font-semibold">{order.total}</p>
                      <button className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold transition-colors">
                        Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(activeTab === 'Wishlist' || activeTab === 'Preferences') && (
              <div className="luxury-card p-16 text-center">
                <p className="label-gold mb-4">{activeTab}</p>
                <p className="text-[#4a4a4a] font-light">This section is being curated for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
