import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import AdminProductForm from './AdminProductForm'

function formatPrice(pence) {
  return '£' + (pence / 100).toFixed(0)
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | 'new' | product

  const load = () => {
    setLoading(true)
    Promise.all([api.get('/admin/products'), api.get('/admin/categories')])
      .then(([p, c]) => { setProducts(p); setCategories(c) })
      .catch(err => setError(err?.data?.error || 'Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleArchive = async (id) => {
    if (!confirm('Archive this product?')) return
    try {
      await api.del(`/admin/products/${id}`)
      load()
    } catch (err) { alert(err?.data?.error || 'Failed') }
  }

  if (editing) {
    return (
      <AdminProductForm
        product={editing === 'new' ? null : editing}
        categories={categories}
        onDone={() => { setEditing(null); load() }}
        onCancel={() => setEditing(null)}
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="heading-luxury text-2xl text-white">Products</h2>
        <button onClick={() => setEditing('new')} className="btn-gold-solid px-6 text-[0.6rem]">+ New Product</button>
      </div>

      {error && <div className="luxury-card p-4 text-red-400 text-xs mb-4">{error}</div>}
      {loading && <div className="luxury-card p-8 text-[#4a4a4a] text-xs tracking-widest uppercase">Loading…</div>}

      {!loading && (
        <div className="luxury-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#111111]">
                <th className="text-left px-4 py-3 label-gold">Name</th>
                <th className="text-left px-4 py-3 label-gold">Category</th>
                <th className="text-left px-4 py-3 label-gold">Price</th>
                <th className="text-left px-4 py-3 label-gold">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white font-serif">{p.nameFR}</td>
                  <td className="px-4 py-3 text-[#6a6a6a]">{p.category?.nameFR || '—'}</td>
                  <td className="px-4 py-3 text-gold">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-[0.6rem] tracking-widest uppercase">
                    <span className={p.status === 'ACTIVE' ? 'text-green-400' : 'text-[#4a4a4a]'}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold transition-colors mr-4">Edit</button>
                    <button onClick={() => handleArchive(p.id)} className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-red-400 transition-colors">Archive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
