import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, phone = '', type, message } = req.body
    if (!name || !email || !type || !message) {
      return res.status(400).json({ error: 'name, email, type and message required' })
    }

    await prisma.collaborationSubmission.create({
      data: { name, email: email.toLowerCase(), phone, type, message },
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit' })
  }
})

export default router
