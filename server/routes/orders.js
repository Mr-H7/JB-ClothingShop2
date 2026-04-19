import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { optionalAuth, requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', optionalAuth, async (req, res) => {
  try {
    const { shippingAddress, cartItems, lang = 'FR' } = req.body
    if (!shippingAddress || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'shippingAddress and cartItems required' })
    }

    const slugs = cartItems.map(i => i.productSlug || i.productId).filter(Boolean)
    const products = await prisma.product.findMany({
      where: { OR: [{ slug: { in: slugs } }, { id: { in: slugs } }] },
    })
    const bySlug = Object.fromEntries(products.map(p => [p.slug, p]))
    const byId   = Object.fromEntries(products.map(p => [p.id, p]))

    let total = 0
    const orderItems = cartItems.map(item => {
      const ref = item.productSlug || item.productId
      const product = bySlug[ref] || byId[ref]
      if (!product) throw new Error(`Product ${ref} not found`)
      const line = product.price * item.quantity
      total += line
      return {
        productId: product.id,
        nameSnapshot: lang === 'FR' ? product.nameFR : product.nameEN,
        priceSnapshot: product.price,
        quantity: item.quantity,
        variant: item.variant || '',
      }
    })

    const order = await prisma.$transaction(async tx => {
      const created = await tx.order.create({
        data: {
          userId: req.user?.id || null,
          total,
          paymentMethod: 'COD',
          shippingAddress: JSON.stringify(shippingAddress),
          items: { create: orderItems },
        },
        include: { items: true },
      })

      const userId = req.user?.id
      const sessionId = req.cookies?.sessionId
      if (userId || sessionId) {
        const cart = await tx.cart.findFirst({ where: userId ? { userId } : { sessionId } })
        if (cart) await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
      }

      return created
    })

    res.status(201).json({ orderId: order.id, total: order.total, status: order.status })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || 'Failed to create order' })
  }
})

router.get('/mine', requireAuth, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(orders)
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

export default router
