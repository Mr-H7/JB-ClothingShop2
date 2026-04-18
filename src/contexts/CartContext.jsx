import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function itemKey(productId, variant) {
  return `${productId}::${variant || ''}`
}

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      add: (product, quantity = 1, variant = '') => {
        const key = itemKey(product.id, variant)
        const items = [...get().items]
        const existing = items.find(it => it.key === key)
        if (existing) {
          existing.quantity += quantity
        } else {
          items.push({
            key,
            productId: product.id,
            nameFR: product.nameFR,
            nameEN: product.nameEN,
            price: product.price,
            imgUrl: product.imgUrl || product.img || '',
            variant,
            quantity,
          })
        }
        set({ items })
      },

      updateQty: (key, quantity) => {
        if (quantity < 1) return get().remove(key)
        set({ items: get().items.map(it => it.key === key ? { ...it, quantity } : it) })
      },

      remove: (key) => set({ items: get().items.filter(it => it.key !== key) }),

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((n, it) => n + it.quantity, 0),
      subtotal: () => get().items.reduce((s, it) => s + it.price * it.quantity, 0),
    }),
    {
      name: 'jb-cart',
      version: 1,
    }
  )
)
