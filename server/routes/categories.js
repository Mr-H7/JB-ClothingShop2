import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

export default router
