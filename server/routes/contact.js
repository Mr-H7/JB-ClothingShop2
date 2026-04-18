import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { email, phone = '', message } = req.body
    if (!email || !message) return res.status(400).json({ error: 'Email and message required' })

    await prisma.contactSubmission.create({
      data: { email: email.toLowerCase(), phone, message },
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit' })
  }
})

export default router
