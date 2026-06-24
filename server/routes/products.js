import { Router } from 'express'
import { products } from '../../src/data/catalog.js'

const router = Router()

router.get('/', (req, res) => {
  const { cat } = req.query
  const filtered = cat ? products.filter(product => product.cat === cat || product.catKey === cat) : products
  res.json(filtered)
})

router.get('/:id', (req, res) => {
  const product = products.find(item => String(item.id) === String(req.params.id) || item.slug === req.params.id)
  if (!product) return res.status(404).json({ error: 'Not found' })

  const related = products
    .filter(item => item.catKey === product.catKey && item.id !== product.id)
    .slice(0, 4)

  res.json({ product, related })
})

export default router
