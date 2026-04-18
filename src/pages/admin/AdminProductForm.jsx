import { useState } from 'react'
import { api, apiFetch } from '../../lib/api'

function emptyForm() {
  return {
    slug: '', nameFR: '', nameEN: '', descFR: '', descEN: '',
    price: '', categoryId: '',
    materialFR: '', materialEN: '', originFR: '', originEN: '',
    careFR: '', careEN: '', tagFR: '', tagEN: '',
    imgUrl: '', status: 'ACTIVE',
  }
}

export default function AdminProductForm({ product, categories, onDone, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!product) return emptyForm()
    const base = emptyForm()
    for (const k of Object.keys(base)) if (product[k] != null) base[k] = product[k]
    base.price = String(product.price || '')
    return base
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await apiFetch('/admin/upload', { method: 'POST', body: fd })
      set('imgUrl', res.url)
    } catch (err) {
      setError(err?.data?.error || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = { ...form, price: parseInt(form.price, 10) }
      if (product) await api.patch(`/admin/products/${product.id}`, payload)
      else         await api.post('/admin/products', payload)
      onDone()
    } catch (err) {
      setError(err?.data?.error || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-card p-8 space-y-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="heading-luxury text-2xl text-white">{product ? 'Edit Product' : 'New Product'}</h2>
        <button type="button" onClick={onCancel} className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold">← Back</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label-gold block mb-2">Slug</label>
          <input value={form.slug} onChange={e => set('slug', e.target.value)} className="input-luxury" required />
        </div>
        <div>
          <label className="label-gold block mb-2">Category</label>
          <select value={form.categoryId} onChange={e => set('categoryId', e.target.value)} className="input-luxury" required>
            <option value="" style={{ background: '#111' }}>—</option>
            {categories.map(c => (
              <option key={c.id} value={c.id} style={{ background: '#111' }}>{c.nameFR}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-gold block mb-2">Name (FR)</label>
          <input value={form.nameFR} onChange={e => set('nameFR', e.target.value)} className="input-luxury" required />
        </div>
        <div>
          <label className="label-gold block mb-2">Name (EN)</label>
          <input value={form.nameEN} onChange={e => set('nameEN', e.target.value)} className="input-luxury" required />
        </div>
        <div className="sm:col-span-2">
          <label className="label-gold block mb-2">Description (FR)</label>
          <textarea rows={2} value={form.descFR} onChange={e => set('descFR', e.target.value)} className="input-luxury resize-none" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-gold block mb-2">Description (EN)</label>
          <textarea rows={2} value={form.descEN} onChange={e => set('descEN', e.target.value)} className="input-luxury resize-none" />
        </div>
        <div>
          <label className="label-gold block mb-2">Price (pence)</label>
          <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className="input-luxury" required />
        </div>
        <div>
          <label className="label-gold block mb-2">Status</label>
          <select value={form.status} onChange={e => set('status', e.target.value)} className="input-luxury">
            <option value="ACTIVE"   style={{ background: '#111' }}>Active</option>
            <option value="ARCHIVED" style={{ background: '#111' }}>Archived</option>
          </select>
        </div>
        <div>
          <label className="label-gold block mb-2">Material (FR)</label>
          <input value={form.materialFR} onChange={e => set('materialFR', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-gold block mb-2">Material (EN)</label>
          <input value={form.materialEN} onChange={e => set('materialEN', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-gold block mb-2">Origin (FR)</label>
          <input value={form.originFR} onChange={e => set('originFR', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-gold block mb-2">Origin (EN)</label>
          <input value={form.originEN} onChange={e => set('originEN', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-gold block mb-2">Care (FR)</label>
          <input value={form.careFR} onChange={e => set('careFR', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-gold block mb-2">Care (EN)</label>
          <input value={form.careEN} onChange={e => set('careEN', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-gold block mb-2">Tag (FR)</label>
          <input value={form.tagFR} onChange={e => set('tagFR', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-gold block mb-2">Tag (EN)</label>
          <input value={form.tagEN} onChange={e => set('tagEN', e.target.value)} className="input-luxury" />
        </div>

        <div className="sm:col-span-2">
          <label className="label-gold block mb-2">Image URL</label>
          <input value={form.imgUrl} onChange={e => set('imgUrl', e.target.value)} className="input-luxury" placeholder="/uploads/... or https://..." />
          <div className="mt-3 flex items-center gap-4">
            <label className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold cursor-pointer">
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              {uploading ? 'Uploading…' : 'Upload image'}
            </label>
            {form.imgUrl && (
              <img src={form.imgUrl} alt="" className="w-16 h-16 object-cover border border-[#2a2a2a]" />
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs tracking-wider">{error}</p>}

      <div className="flex justify-end gap-4 pt-2">
        <button type="button" onClick={onCancel} className="text-[0.6rem] tracking-widest uppercase text-[#4a4a4a] hover:text-gold">Cancel</button>
        <button type="submit" disabled={saving} className={`btn-gold-solid px-8 ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}>
          {saving ? 'Saving…' : (product ? 'Save' : 'Create')}
        </button>
      </div>
    </form>
  )
}
