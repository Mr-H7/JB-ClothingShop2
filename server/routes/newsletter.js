import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { email, language = 'FR' } = req.body
    if (!email) return res.status(400).json({ error: 'Email required' })

    await prisma.newsletterLead.upsert({
      where: { email: email.toLowerCase() },
      update: { language },
      create: { email: email.toLowerCase(), language },
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to subscribe' })
  }
})

export default router
