import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import { useAuth } from '../contexts/AuthContext'
import { useLang } from '../contexts/LangContext'
import { api } from '../lib/api'

function formatPrice(pence, lang) {
  const v = (pence / 100).toFixed(0)
  return lang === 'FR' ? `${v} £` : `£${v}`
}

function formatDate(iso, lang) {
  try {
    return new Date(iso).toLocaleDateString(lang === 'FR' ? 'fr-FR' : 'en-GB', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch { return iso }
}

const STATUS_COLORS = {
  PENDING:   'text-yellow-400 bg-yellow-400/10',
  CONFIRMED: 'text-blue-400 bg-blue-400/10',
  SHIPPED:   'text-indigo-300 bg-indigo-300/10',
  DELIVERED: 'text-green-400 bg-green-400/10',
  CANCELLED: 'text-red-400 bg-red-400/10',
}

export default function Account() {
  const { user, loading, logout, refresh } = useAuth()
  const { lang, t } = useLang()
  const a = t.account
  const navigate = useNavigate()

  const TAB_KEYS = ['Profile', 'Orders', 'Wishlist', 'Preferences']
  const [activeTab, setActiveTab] = useState('Profile')

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [formError, setFormError] = useState('')

  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [primaryAddress, setPrimaryAddress] = useState(null)

  useEffect(() => {
    if (!user) return
    const prof = user.profile || {}
    setForm(f => ({
      ...f,
      firstName: prof.firstName || '',
      lastName:  prof.lastName  || '',
      email:     user.email     || '',
      phone:     prof.phone     || '',
    }))
  }, [user])

  useEffect(() => {
    if (!user) return
    api.get('/profile').then(({ addresses }) => {
      const def = addresses.find(x => x.isDefault) || addresses[0]
      if (def) {
        setPrimaryAddress(def)
        setForm(f => ({ ...f, address: [def.line1, def.city, def.postcode].filter(Boolean).join(', ') }))
      }
    }).catch(() => {})
  }, [user])

  useEffect(() => {
    if (!user || activeTab !== 'Orders') return
    setOrdersLoading(true)
    api.get('/orders/mine')
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false))
  }, [user, activeTab])

  const memberSince = useMemo(() => {
    if (!user?.createdAt) return ''
    try { return new Date(user.createdAt).getFullYear() } catch { return '' }
  }, [user])

  const initials = useMemo(() => {
    const f = (form.firstName || '').trim()[0] || ''
    const l = (form.lastName || '').trim()[0] || ''
    return (f + l).toUpperCase() || 'JB'
  }, [form.firstName, form.lastName])

  const displayName = [form.firstName, form.lastName].filter(Boolean).join(' ') || user?.email || ''

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen pt-28">
        <div className="container-luxury py-24 text-center text-[#4a4a4a] text-xs tracking-widest uppercase">
          {lang === 'FR' ? 'Chargement…' : 'Loading…'}
        </div>
      </div>
    )
  }
  if (!user) return <Navigate to="/login?next=/account" replace />

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      await api.patch('/profile', {
        firstName: form.firstName,
        lastName:  form.lastName,
        phone:     form.phone,
        language:  lang,
      })
      if (form.address && form.address.trim()) {
        const parts = form.address.split(',').map(s => s.trim()).filter(Boolean)
        const [line1 = form.address.trim(), city = '', postcode = ''] = parts
        if (primaryAddress) {
          await api.patch(`/profile/addresses/${primaryAddress.id}`, {
            line1, city, postcode, isDefault: true,
          })
        } else {
          const created = await api.post('/profile/addresses', {
            label: 'Home', line1, city, postcode, country: 'GB', isDefault: true,
          })
          setPrimaryAddress(created)
        }
      }
      await refresh()
      setSaved(true)
      setTimeout(() => setSaved(false), 2200)
    } catch (err) {
      setFormError(err?.data?.error || (lang === 'FR' ? 'Échec de l\'enregistrement.' : 'Save failed.'))
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">

        <div className="text-center mb-12">
          <p className="label-gold mb-2">{t.nav.account}</p>
          <h1 className="heading-luxury text-4xl text-white">{a.welcome}</h1>
          <GoldDivider variant="ornament" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="luxury-card p-6 mb-5 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-4 bg-[#1a1a1a]">
                <span className="font-serif text-2xl text-gold font-bold">{initials}</span>
              </div>
              <h3 className="font-serif text-lg text-white">{displayName}</h3>
              <p className="text-[#4a4a4a] text-xs mt-1">{a.since} {memberSince}</p>
              <span className="inline-block mt-3 label-gold border border-gold/30 px-3 py-1 rounded-full text-[0.5rem]">
                {a.goldMember}
              </span>
            </div>

            <nav className="space-y-1">
              {TAB_KEYS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeTab === tab
                      ? 'text-gold bg-[#161616] border-l-2 border-gold'
                      : 'text-[#5a5a5a] hover:text-gold hover:bg-[#111111] border-l-2 border-transparent'
                  }`}
                >
                  {a.tabs[i]}
                </button>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#3a3a3a] hover:text-red-400 transition-colors mt-4 border-t border-[#1e1e1e]"
              >
                {a.signOut}
              </button>
            </nav>
          </div>

          {/* ── Main Content ── */}
          <div className="lg:col-span-3">
            {activeTab === 'Profile' && (
              <div className="luxury-card p-8">
                <h2 className="font-serif text-2xl text-white mb-6">{a.personal}</h2>
                <GoldDivider className="mb-8" />
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-5" onSubmit={handleSaveProfile}>
                  <div>
                    <label className="label-gold block mb-2">{a.firstName}</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">{a.lastName}</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">{a.email}</label>
                    <input
                      type="email"
                      value={form.email}
                      readOnly
                      className="input-luxury opacity-70"
                    />
                  </div>
                  <div>
                    <label className="label-gold block mb-2">{a.phone}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="input-luxury"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-gold block mb-2">{a.address}</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                      placeholder={lang === 'FR' ? '10 Rue de Rivoli, Paris, 75001' : '10 Mayfair Street, London, W1K 1AA'}
                      className="input-luxury"
                    />
                  </div>
                  {formError && (
                    <div className="sm:col-span-2 text-red-400 text-xs tracking-wider">{formError}</div>
                  )}
                  <div className="sm:col-span-2 flex items-center justify-end gap-4 mt-2">
                    {saved && (
                      <span className="text-gold text-[0.6rem] tracking-widest uppercase">
                        {lang === 'FR' ? 'Enregistré' : 'Saved'}
                      </span>
                    )}
                    <button type="submit" disabled={saving} className={`btn-gold-solid ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}>
                      {saving ? (lang === 'FR' ? 'Enregistrement…' : 'Saving…') : a.save}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'Orders' && (
              <div className="space-y-4">
                {ordersLoading && (
                  <div className="luxury-card p-8 text-center text-[#4a4a4a] text-xs tracking-widest uppercase">
                    {lang === 'FR' ? 'Chargement…' : 'Loading…'}
                  </div>
                )}
                {!ordersLoading && orders.length === 0 && (
                  <div className="luxury-card p-16 text-center">
                    <p className="label-gold mb-4">{a.orders}</p>
                    <p className="text-[#4a4a4a] font-light">
                      {lang === 'FR' ? 'Vous n\'avez pas encore passé de commande.' : 'You have not placed any orders yet.'}
                    </p>
                  </div>
                )}
                {!ordersLoading && orders.map(order => {
                  const itemCount = order.items?.reduce((n, it) => n + it.quantity, 0) || 0
                  const ref = 'JB-' + String(order.id).slice(-6).toUpperCase()
                  const color = STATUS_COLORS[order.status] || 'text-[#6a6a6a] bg-[#161616]'
                  return (
                    <div key={order.id} className="luxury-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                      <div>
                        <p className="font-serif text-base text-white">{ref}</p>
                        <p className="text-[#4a4a4a] text-xs mt-1">
                          {formatDate(order.createdAt, lang)} · {itemCount} {itemCount > 1 ? (lang === 'FR' ? 'articles' : 'items') : (lang === 'FR' ? 'article' : 'item')}
                        </p>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className={`text-[0.6rem] tracking-widest uppercase px-3 py-1 rounded-full ${color}`}>
                          {order.status}
                        </span>
                        <p className="text-gold font-semibold">{formatPrice(order.total, lang)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {(activeTab === 'Wishlist' || activeTab === 'Preferences') && (
              <div className="luxury-card p-16 text-center">
                <p className="label-gold mb-4">{a.tabs[TAB_KEYS.indexOf(activeTab)]}</p>
                <p className="text-[#4a4a4a] font-light">
                  {lang === 'FR' ? 'Cette section est en cours de préparation pour vous.' : 'This section is being curated for you.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
