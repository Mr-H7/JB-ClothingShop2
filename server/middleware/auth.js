import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-secret'

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' })
  }
}

export function optionalAuth(req, res, next) {
  const token = req.cookies?.token
  if (token) {
    try { req.user = verifyToken(token) } catch {}
  }
  next()
}

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user?.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' })
    next()
  })
}
