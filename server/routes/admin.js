import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAdmin } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = Router()
router.use(requireAdmin)

router.get('/dashboard', async (req, res) => {
  try {
    const [totalOrders, pendingOrders, totalRevenue, newLeads] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.newsletterLead.count({
        where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      }),
    ])
    res.json({ totalOrders, pendingOrders, totalRevenue: totalRevenue._sum.total || 0, newLeads })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard' })
  }
})

// Products
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, inventory: true },
      orderBy: { nameFR: 'asc' },
    })
    res.json(products)
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.post('/products', async (req, res) => {
  try {
    const { slug, nameFR, nameEN, descFR = '', descEN = '', price, categoryId,
      materialFR = '', materialEN = '', originFR = '', originEN = '', careFR = '', careEN = '',
      tagFR = '', tagEN = '', imgUrl = '', status = 'ACTIVE' } = req.body
    if (!slug || !nameFR || !nameEN || !price || !categoryId) {
      return res.status(400).json({ error: 'slug, nameFR, nameEN, price, categoryId required' })
    }
    const product = await prisma.product.create({
      data: {
        slug, nameFR, nameEN, descFR, descEN, price: parseInt(price), categoryId,
        materialFR, materialEN, originFR, originEN, careFR, careEN, tagFR, tagEN, imgUrl, status,
        inventory: { create: { stock: 999 } },
      },
      include: { category: true, inventory: true },
    })
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

router.patch('/products/:id', async (req, res) => {
  try {
    const data = { ...req.body }
    if (data.price) data.price = parseInt(data.price)
    delete data.id
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data,
      include: { category: true, inventory: true },
    })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

router.delete('/products/:id', async (req, res) => {
  try {
    await prisma.product.update({ where: { id: req.params.id }, data: { status: 'ARCHIVED' } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to archive product' })
  }
})

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const url = `/uploads/${req.file.filename}`
  res.json({ url })
})

// Orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } }, user: { include: { profile: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(orders)
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

router.patch('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' })
    const order = await prisma.order.update({ where: { id: req.params.id }, data: { status } })
    res.json(order)
  } catch {
    res.status(500).json({ error: 'Failed to update order' })
  }
})

// Customers
router.get('/customers', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true, _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(users.map(u => ({
      id: u.id, email: u.email, role: u.role, createdAt: u.createdAt,
      profile: u.profile, orderCount: u._count.orders,
    })))
  } catch {
    res.status(500).json({ error: 'Failed to fetch customers' })
  }
})

// Leads
router.get('/newsletter', async (req, res) => {
  try {
    const leads = await prisma.newsletterLead.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(leads)
  } catch {
    res.status(500).json({ error: 'Failed to fetch newsletter leads' })
  }
})

router.get('/contact', async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(submissions)
  } catch {
    res.status(500).json({ error: 'Failed to fetch contact submissions' })
  }
})

router.patch('/contact/:id/read', async (req, res) => {
  try {
    await prisma.contactSubmission.update({ where: { id: req.params.id }, data: { readAt: new Date() } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to mark as read' })
  }
})

router.get('/collaborations', async (req, res) => {
  try {
    const submissions = await prisma.collaborationSubmission.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(submissions)
  } catch {
    res.status(500).json({ error: 'Failed to fetch collaboration submissions' })
  }
})

router.patch('/collaborations/:id/read', async (req, res) => {
  try {
    await prisma.collaborationSubmission.update({ where: { id: req.params.id }, data: { readAt: new Date() } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to mark as read' })
  }
})

// Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
    res.json(categories)
  } catch {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

export default router
