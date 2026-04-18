import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

function formatPrice(pence) { return '£' + (pence / 100).toFixed(0) }
function formatDate(iso) { try { return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) } catch { return iso } }

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    api.get('/admin/orders')
      .then(setOrders)
      .catch(err => setError(err?.data?.error || 'Failed to load'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    try { await api.patch(`/admin/orders/${id}`, { status }); load() }
    catch (err) { alert(err?.data?.error || 'Failed') }
  }

  return (
    <div>
      <h2 className="heading-luxury text-2xl text-white mb-6">Orders</h2>
      {error && <div className="luxury-card p-4 text-red-400 text-xs mb-4">{error}</div>}
      {loading && <div className="luxury-card p-8 text-[#4a4a4a] text-xs tracking-widest uppercase">Loading…</div>}
      {!loading && orders.length === 0 && (
        <div className="luxury-card p-16 text-center text-[#4a4a4a]">No orders yet.</div>
      )}
      <div className="space-y-3">
        {orders.map(order => {
          const itemCount = order.items?.reduce((n, it) => n + it.quantity, 0) || 0
          const ref = 'JB-' + String(order.id).slice(-6).toUpperCase()
          const customerName = [order.user?.profile?.firstName, order.user?.profile?.lastName].filter(Boolean).join(' ') || order.user?.email || 'Guest'
          return (
            <div key={order.id} className="luxury-card p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div>
                <p className="font-serif text-base text-white">{ref}</p>
                <p className="text-[#4a4a4a] text-xs mt-1">{formatDate(order.createdAt)} · {itemCount} items · {customerName}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-gold font-semibold">{formatPrice(order.total)}</p>
                <select
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className="input-luxury py-2 px-3 text-[0.65rem] tracking-widest uppercase w-44"
                >
                  {STATUSES.map(s => <option key={s} value={s} style={{ background: '#111' }}>{s}</option>)}
                </select>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
