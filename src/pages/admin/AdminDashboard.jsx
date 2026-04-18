import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

function formatPrice(pence) {
  return '£' + (pence / 100).toFixed(0)
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(setStats)
      .catch(err => setError(err?.data?.error || 'Failed to load'))
  }, [])

  if (error) return <div className="luxury-card p-8 text-red-400 text-xs tracking-wider">{error}</div>
  if (!stats) return <div className="luxury-card p-8 text-[#4a4a4a] text-xs tracking-widest uppercase">Loading…</div>

  const cards = [
    { label: 'Total Orders',    value: stats.totalOrders },
    { label: 'Pending Orders',  value: stats.pendingOrders },
    { label: 'Revenue',         value: formatPrice(stats.totalRevenue) },
    { label: 'New Leads (24h)', value: stats.newLeads },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map(c => (
        <div key={c.label} className="luxury-card p-6 text-center">
          <p className="label-gold mb-2">{c.label}</p>
          <p className="font-serif text-3xl text-white">{c.value}</p>
        </div>
      ))}
    </div>
  )
}
