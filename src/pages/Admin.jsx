import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GoldDivider from '../components/GoldDivider'
import { api } from '../lib/api'
import { BUSINESS } from '../data/business'
import { products } from '../data/catalog'

const L = {
  title: 'Luxury Admin',
  subtitle: 'JB Clothing back office',
  username: 'Username',
  password: 'Password',
  signIn: 'Sign in',
  signOut: 'Sign out',
  overview: 'Overview',
  catalog: 'Catalog',
  inbox: 'Inbox',
}

export default function Admin() {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [login, setLogin] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [summary, setSummary] = useState(null)
  const [inbox, setInbox] = useState({ contacts: [], collaborations: [], newsletter: [] })
  const [tab, setTab] = useState('overview')

  const categories = useMemo(() => {
    return products.reduce((acc, product) => {
      acc[product.cat] = (acc[product.cat] || 0) + 1
      return acc
    }, {})
  }, [])

  const loadDashboard = async () => {
    const [summaryData, inboxData] = await Promise.all([
      api.get('/admin/summary'),
      api.get('/admin/inbox'),
    ])
    setSummary(summaryData)
    setInbox(inboxData)
  }

  useEffect(() => {
    api.get('/admin/me')
      .then(() => {
        setAuthed(true)
        return loadDashboard()
      })
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/admin/login', login)
      setAuthed(true)
      await loadDashboard()
    } catch {
      setError('Invalid admin credentials.')
    }
  }

  const handleLogout = async () => {
    await api.post('/admin/logout', {})
    setAuthed(false)
    setLogin({ username: '', password: '' })
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container-luxury py-20 text-center text-[#5a5a5a]">Loading admin...</div>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container-luxury py-16">
          <form onSubmit={handleLogin} className="luxury-card mx-auto max-w-md p-8 md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <img src={BUSINESS.logo} alt="JB Clothing" className="h-16 w-16 rounded-sm object-contain" />
              <div>
                <p className="label-gold mb-1">{L.title}</p>
                <h1 className="font-serif text-2xl text-white">{L.subtitle}</h1>
              </div>
            </div>
            <div className="space-y-5">
              <label className="block">
                <span className="label-gold mb-2 block">{L.username}</span>
                <input className="input-luxury" value={login.username} onChange={e => setLogin(v => ({ ...v, username: e.target.value }))} autoComplete="username" required />
              </label>
              <label className="block">
                <span className="label-gold mb-2 block">{L.password}</span>
                <input className="input-luxury" type="password" value={login.password} onChange={e => setLogin(v => ({ ...v, password: e.target.value }))} autoComplete="current-password" required />
              </label>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button className="btn-gold-solid w-full" type="submit">{L.signIn}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-[#1a1a1a] bg-[#0d0d0d] p-7 md:flex md:flex-col">
        <Link to="/" className="mb-10 flex items-center gap-3">
          <img src={BUSINESS.logo} alt="JB Clothing" className="h-14 w-14 rounded-sm object-contain" />
          <div>
            <p className="font-serif text-xl text-white">JB</p>
            <p className="label-gold text-[0.48rem]">Admin</p>
          </div>
        </Link>
        <AdminNav tab={tab} setTab={setTab} />
        <button onClick={handleLogout} className="mt-auto text-left text-[0.6rem] uppercase tracking-[0.22em] text-[#4a4a4a] transition-colors hover:text-gold">
          {L.signOut}
        </button>
      </aside>

      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] px-6 py-4 md:hidden">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={BUSINESS.logo} alt="JB Clothing" className="h-11 w-11 rounded-sm object-contain" />
            <p className="label-gold">Admin</p>
          </div>
          <button onClick={handleLogout} className="text-[0.58rem] uppercase tracking-widest text-[#5a5a5a]">{L.signOut}</button>
        </div>
        <AdminNav tab={tab} setTab={setTab} compact />
      </div>

      <main className="md:pl-72">
        <div className="container-luxury py-10 md:py-14">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-gold mb-2">{L.title}</p>
              <h1 className="heading-luxury text-4xl text-white">{tab === 'overview' ? L.overview : tab === 'catalog' ? L.catalog : L.inbox}</h1>
            </div>
            <Link to="/shop" className="btn-gold py-2.5 px-6 text-[0.58rem]"><span>View Shop</span></Link>
          </div>

          {tab === 'overview' && <Overview summary={summary} catalogCount={products.length} />}
          {tab === 'catalog' && <Catalog categories={categories} />}
          {tab === 'inbox' && <Inbox inbox={inbox} />}
        </div>
      </main>
    </div>
  )
}

function AdminNav({ tab, setTab, compact = false }) {
  const items = [
    ['overview', L.overview],
    ['catalog', L.catalog],
    ['inbox', L.inbox],
  ]
  return (
    <nav className={compact ? 'flex gap-2 overflow-x-auto' : 'space-y-2'}>
      {items.map(([key, label]) => (
        <button
          key={key}
          onClick={() => setTab(key)}
          className={`${compact ? 'flex-shrink-0' : 'w-full'} rounded-full px-5 py-3 text-left text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-all ${
            tab === key ? 'bg-gold text-black' : 'text-[#5a5a5a] hover:bg-[#161616] hover:text-gold'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

function Overview({ summary, catalogCount }) {
  const cards = [
    ['Catalog structure', catalogCount],
    ['Database products', summary?.products ?? 0],
    ['Contact messages', summary?.contacts ?? 0],
    ['Collaborations', summary?.collaborations ?? 0],
    ['Newsletter leads', summary?.newsletter ?? 0],
  ]
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map(([label, value]) => (
        <div key={label} className="luxury-card p-6">
          <p className="label-gold mb-3 text-[0.5rem]">{label}</p>
          <p className="font-serif text-3xl text-white">{value}</p>
        </div>
      ))}
    </div>
  )
}

function Catalog({ categories }) {
  return (
    <div className="luxury-card p-6">
      <p className="label-gold mb-4">Prepared Inventory Structure</p>
      <div className="divide-y divide-[#242424]">
        {Object.entries(categories).map(([category, count]) => (
          <div key={category} className="flex items-center justify-between gap-4 py-4">
            <span className="font-serif text-lg text-white">{category}</span>
            <span className="text-sm font-semibold text-gold">{count} references</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Inbox({ inbox }) {
  const rows = [
    ...inbox.contacts.map(item => ({ type: 'Contact', title: item.email, body: item.message, date: item.createdAt })),
    ...inbox.collaborations.map(item => ({ type: 'Collab', title: item.name, body: item.message, date: item.createdAt })),
    ...inbox.newsletter.map(item => ({ type: 'Newsletter', title: item.email, body: item.language, date: item.createdAt })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 18)

  return (
    <div className="space-y-4">
      {rows.length === 0 ? (
        <div className="luxury-card p-10 text-center text-[#5a5a5a]">No messages yet.</div>
      ) : rows.map((row, index) => (
        <div key={`${row.type}-${index}`} className="luxury-card p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="label-gold text-[0.5rem]">{row.type}</p>
            <p className="text-[0.58rem] uppercase tracking-widest text-[#3a3a3a]">{new Date(row.date).toLocaleDateString()}</p>
          </div>
          <p className="font-serif text-lg text-white">{row.title}</p>
          <GoldDivider className="my-3" />
          <p className="line-clamp-3 text-sm font-light leading-relaxed text-[#6a6a6a]">{row.body}</p>
        </div>
      ))}
    </div>
  )
}
