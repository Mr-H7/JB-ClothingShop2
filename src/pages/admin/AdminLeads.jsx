import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

const TABS = ['Newsletter', 'Contact', 'Collaborations']

function formatDate(iso) { try { return new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) } catch { return iso } }

export default function AdminLeads() {
  const [tab, setTab] = useState('Newsletter')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true); setError('')
    const path = tab === 'Newsletter' ? '/admin/newsletter' : tab === 'Contact' ? '/admin/contact' : '/admin/collaborations'
    api.get(path)
      .then(setRows)
      .catch(err => setError(err?.data?.error || 'Failed to load'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [tab])

  const markRead = async (id) => {
    const path = tab === 'Contact' ? `/admin/contact/${id}/read` : `/admin/collaborations/${id}/read`
    try { await api.patch(path, {}); load() } catch (err) { alert(err?.data?.error || 'Failed') }
  }

  return (
    <div>
      <h2 className="heading-luxury text-2xl text-white mb-6">Leads</h2>

      <div className="flex gap-0 border-b border-[#1e1e1e] mb-5">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-colors ${
              tab === t ? 'text-gold border-b-2 border-gold' : 'text-[#4a4a4a] hover:text-gold'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && <div className="luxury-card p-4 text-red-400 text-xs mb-4">{error}</div>}
      {loading && <div className="luxury-card p-8 text-[#4a4a4a] text-xs tracking-widest uppercase">Loading…</div>}
      {!loading && rows.length === 0 && <div className="luxury-card p-16 text-center text-[#4a4a4a]">No entries yet.</div>}

      <div className="space-y-3">
        {!loading && tab === 'Newsletter' && rows.map(r => (
          <div key={r.id} className="luxury-card p-4 flex items-center justify-between">
            <div>
              <p className="font-serif text-sm text-white">{r.email}</p>
              <p className="text-[#4a4a4a] text-xs mt-1">{r.language} · {formatDate(r.createdAt)}</p>
            </div>
          </div>
        ))}

        {!loading && tab === 'Contact' && rows.map(r => (
          <div key={r.id} className="luxury-card p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-serif text-sm text-white">{r.email}</p>
                <p className="text-[#4a4a4a] text-xs mt-1">{r.phone || '—'} · {formatDate(r.createdAt)}</p>
              </div>
              {r.readAt ? (
                <span className="text-[0.6rem] tracking-widest uppercase text-green-400">Read</span>
              ) : (
                <button onClick={() => markRead(r.id)} className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold">Mark read</button>
              )}
            </div>
            <p className="text-[#6a6a6a] text-sm whitespace-pre-line">{r.message}</p>
          </div>
        ))}

        {!loading && tab === 'Collaborations' && rows.map(r => (
          <div key={r.id} className="luxury-card p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-serif text-sm text-white">{r.name} — <span className="text-[#6a6a6a]">{r.email}</span></p>
                <p className="text-[#4a4a4a] text-xs mt-1">{r.type} · {r.phone || '—'} · {formatDate(r.createdAt)}</p>
              </div>
              {r.readAt ? (
                <span className="text-[0.6rem] tracking-widest uppercase text-green-400">Read</span>
              ) : (
                <button onClick={() => markRead(r.id)} className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold">Mark read</button>
              )}
            </div>
            <p className="text-[#6a6a6a] text-sm whitespace-pre-line">{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
