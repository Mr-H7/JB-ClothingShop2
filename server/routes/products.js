import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { cat } = req.query
    const where = { status: 'ACTIVE' }
    if (cat) {
      const category = await prisma.category.findFirst({
        where: { OR: [{ slugFR: cat }, { slugEN: cat }] },
      })
      if (category) where.categoryId = category.id
    }
    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { nameFR: 'asc' },
    })
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    })
    if (!product || product.status === 'ARCHIVED') return res.status(404).json({ error: 'Not found' })

    const related = await prisma.product.findMany({
      where: { categoryId: product.categoryId, id: { not: product.id }, status: 'ACTIVE' },
      take: 4,
      include: { category: true },
    })
    res.json({ product, related })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

export default router
