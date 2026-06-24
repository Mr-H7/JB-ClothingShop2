import { Router } from 'express'
import crypto from 'crypto'
import { supabase } from '../lib/supabase.js'
import { products as catalogProducts } from '../../src/data/catalog.js'

const router = Router()
const COOKIE_NAME = 'jb_admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 8
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'ayoubjb'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jbayoub1@'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex')

function sign(value) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('base64url')
}

function readCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || '')
      .split(';')
      .map(cookie => cookie.trim())
      .filter(Boolean)
      .map(cookie => {
        const index = cookie.indexOf('=')
        return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))]
      })
  )
}

function sessionCookie(token, req) {
  const secure = req.secure || req.headers['x-forwarded-proto'] === 'https'
  return [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
    secure ? 'Secure' : '',
  ].filter(Boolean).join('; ')
}

function clearCookie() {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
}

function createToken() {
  const payload = Buffer.from(JSON.stringify({
    sub: ADMIN_USERNAME,
    exp: Date.now() + SESSION_TTL_MS,
  })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return false
  const [payload, signature] = token.split('.')
  const expected = sign(payload)
  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) return false

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return data.sub === ADMIN_USERNAME && data.exp > Date.now()
  } catch {
    return false
  }
}

function checkPassword(candidate) {
  const salt = 'jb-clothing-admin-v1'
  const expected = crypto.scryptSync(ADMIN_PASSWORD, salt, 32)
  const received = crypto.scryptSync(String(candidate || ''), salt, 32)
  return crypto.timingSafeEqual(expected, received)
}

function requireAdmin(req, res, next) {
  const token = readCookies(req)[COOKIE_NAME]
  if (!verifyToken(token)) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

function normalizeSubmission(row) {
  if (!row) return row
  return {
    ...row,
    createdAt: row.created_at,
    readAt: row.read_at,
  }
}

router.post('/login', (req, res) => {
  const { username, password } = req.body || {}
  if (username !== ADMIN_USERNAME || !checkPassword(password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = createToken()
  res.setHeader('Set-Cookie', sessionCookie(token, req))
  res.json({ user: { username: ADMIN_USERNAME } })
})

router.post('/logout', (req, res) => {
  res.setHeader('Set-Cookie', clearCookie())
  res.json({ ok: true })
})

router.get('/me', requireAdmin, (req, res) => {
  res.json({ user: { username: ADMIN_USERNAME } })
})

router.get('/summary', requireAdmin, async (req, res) => {
  const [contacts, collaborations, newsletter, products] = await Promise.all([
    supabase.count('contact_submissions'),
    supabase.count('collaboration_submissions'),
    supabase.count('newsletter_leads'),
    Promise.resolve(catalogProducts.length),
  ])
  res.json({ contacts, collaborations, newsletter, products })
})

router.get('/inbox', requireAdmin, async (req, res) => {
  const [contacts, collaborations, newsletter] = await Promise.all([
    supabase.list('contact_submissions', 10),
    supabase.list('collaboration_submissions', 10),
    supabase.list('newsletter_leads', 10),
  ])
  res.json({
    contacts: contacts.map(normalizeSubmission),
    collaborations: collaborations.map(normalizeSubmission),
    newsletter: newsletter.map(normalizeSubmission),
  })
})

export default router
