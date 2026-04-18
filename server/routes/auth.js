import { Router } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma.js'
import { signToken, requireAuth } from '../middleware/auth.js'

const router = Router()

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName = '', lastName = '' } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) return res.status(409).json({ error: 'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        profile: { create: { firstName, lastName } },
      },
      include: { profile: true },
    })

    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.cookie('token', token, COOKIE_OPTS)
    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      profile: user.profile,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true },
    })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.cookie('token', token, COOKIE_OPTS)
    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      profile: user.profile,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' })
  res.json({ ok: true })
})

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { profile: true },
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      profile: user.profile,
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

export default router
