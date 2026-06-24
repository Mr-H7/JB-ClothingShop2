import { Router } from 'express'
import { CATALOG_CATEGORIES } from '../../src/data/catalog.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(CATALOG_CATEGORIES.map((category, index) => ({
    id: category.key,
    slugFR: category.nameFR,
    slugEN: category.key,
    nameFR: category.nameFR,
    nameEN: category.nameEN,
    sortOrder: index + 1,
  })))
})

export default router
