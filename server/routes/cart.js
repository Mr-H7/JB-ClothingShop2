import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { optionalAuth } from '../middleware/auth.js'

const router = Router()

async function getOrCreateCart(userId, sessionId) {
  if (userId) {
    let cart = await prisma.cart.findFirst({ where: { userId }, include: { items: { include: { product: true } } } })
    if (!cart) cart = await prisma.cart.create({ data: { userId }, include: { items: { include: { product: true } } } })
    return cart
  }
  if (sessionId) {
    let cart = await prisma.cart.findFirst({ where: { sessionId }, include: { items: { include: { product: true } } } })
    if (!cart) cart = await prisma.cart.create({ data: { sessionId }, include: { items: { include: { product: true } } } })
    return cart
  }
  return null
}

router.use(optionalAuth)

router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id
    const sessionId = req.cookies?.sessionId
    const cart = await getOrCreateCart(userId, sessionId)
    if (!cart) return res.json({ items: [] })
    res.json({ id: cart.id, items: cart.items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch cart' })
  }
})

router.post('/items', async (req, res) => {
  try {
    const userId = req.user?.id
    const sessionId = req.cookies?.sessionId
    const { productId, quantity = 1, variant = '' } = req.body
    if (!productId) return res.status(400).json({ error: 'productId required' })

    const cart = await getOrCreateCart(userId, sessionId)
    if (!cart) return res.status(400).json({ error: 'No cart session' })

    const existing = cart.items.find(i => i.productId === productId && i.variant === variant)
    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true },
      })
      return res.json(updated)
    }
    const item = await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity, variant },
      include: { product: true },
    })
    res.status(201).json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add item' })
  }
})

router.patch('/items/:id', async (req, res) => {
  try {
    const { quantity } = req.body
    if (!quantity || quantity < 1) return res.status(400).json({ error: 'quantity must be >= 1' })
    const item = await prisma.cartItem.update({
      where: { id: req.params.id },
      data: { quantity },
      include: { product: true },
    })
    res.json(item)
  } catch {
    res.status(500).json({ error: 'Failed to update item' })
  }
})

router.delete('/items/:id', async (req, res) => {
  try {
    await prisma.cartItem.delete({ where: { id: req.params.id } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to remove item' })
  }
})

router.delete('/', async (req, res) => {
  try {
    const userId = req.user?.id
    const sessionId = req.cookies?.sessionId
    const cart = await getOrCreateCart(userId, sessionId)
    if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to clear cart' })
  }
})

router.post('/merge', async (req, res) => {
  try {
    const userId = req.user?.id
    const { sessionId } = req.body
    if (!userId || !sessionId) return res.status(400).json({ error: 'userId and sessionId required' })

    const guestCart = await prisma.cart.findFirst({ where: { sessionId }, include: { items: true } })
    if (!guestCart || guestCart.items.length === 0) return res.json({ ok: true })

    const userCart = await getOrCreateCart(userId, null)

    for (const item of guestCart.items) {
      const existing = await prisma.cartItem.findFirst({
        where: { cartId: userCart.id, productId: item.productId, variant: item.variant },
      })
      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + item.quantity },
        })
      } else {
        await prisma.cartItem.create({
          data: { cartId: userCart.id, productId: item.productId, quantity: item.quantity, variant: item.variant },
        })
      }
    }

    await prisma.cart.delete({ where: { id: guestCart.id } })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to merge cart' })
  }
})

export default router
