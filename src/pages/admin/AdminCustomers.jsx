import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

function formatDate(iso) { try { return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) } catch { return iso } }

export default function AdminCustomers() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/admin/customers')
      .then(setRows)
      .catch(err => setError(err?.data?.error || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="heading-luxury text-2xl text-white mb-6">Customers</h2>
      {error && <div className="luxury-card p-4 text-red-400 text-xs mb-4">{error}</div>}
      {loading && <div className="luxury-card p-8 text-[#4a4a4a] text-xs tracking-widest uppercase">Loading…</div>}
      {!loading && (
        <div className="luxury-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#111111]">
                <th className="text-left px-4 py-3 label-gold">Email</th>
                <th className="text-left px-4 py-3 label-gold">Name</th>
                <th className="text-left px-4 py-3 label-gold">Role</th>
                <th className="text-left px-4 py-3 label-gold">Orders</th>
                <th className="text-left px-4 py-3 label-gold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(u => (
                <tr key={u.id} className="border-b border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white font-serif">{u.email}</td>
                  <td className="px-4 py-3 text-[#6a6a6a]">{[u.profile?.firstName, u.profile?.lastName].filter(Boolean).join(' ') || '—'}</td>
                  <td className="px-4 py-3 text-[0.6rem] tracking-widest uppercase text-gold">{u.role}</td>
                  <td className="px-4 py-3 text-[#6a6a6a]">{u.orderCount}</td>
                  <td className="px-4 py-3 text-[#6a6a6a]">{formatDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
