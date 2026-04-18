import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/', async (req, res) => {
  try {
    const profile = await prisma.customerProfile.findUnique({ where: { userId: req.user.id } })
    const addresses = await prisma.address.findMany({ where: { userId: req.user.id } })
    res.json({ profile, addresses })
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

router.patch('/', async (req, res) => {
  try {
    const { firstName, lastName, phone, language } = req.body
    const profile = await prisma.customerProfile.upsert({
      where: { userId: req.user.id },
      update: { firstName, lastName, phone, language },
      create: { userId: req.user.id, firstName: firstName || '', lastName: lastName || '', phone: phone || '', language: language || 'FR' },
    })
    res.json(profile)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

router.post('/addresses', async (req, res) => {
  try {
    const { label, line1, line2 = '', city, postcode, country = 'GB', isDefault = false } = req.body
    if (!line1 || !city || !postcode) return res.status(400).json({ error: 'line1, city, postcode required' })

    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } })
    }
    const address = await prisma.address.create({
      data: { userId: req.user.id, label: label || 'Home', line1, line2, city, postcode, country, isDefault },
    })
    res.status(201).json(address)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save address' })
  }
})

router.patch('/addresses/:id', async (req, res) => {
  try {
    const { label, line1, line2, city, postcode, country, isDefault } = req.body
    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } })
    }
    const address = await prisma.address.update({
      where: { id: req.params.id },
      data: { label, line1, line2, city, postcode, country, isDefault },
    })
    res.json(address)
  } catch {
    res.status(500).json({ error: 'Failed to update address' })
  }
})

export default router
