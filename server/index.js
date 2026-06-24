import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { getSupabaseEnvStatus } from './lib/supabase.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
dotenv.config({ path: path.join(projectRoot, '.env') })

const productRoutes = (await import('./routes/products.js')).default
const categoryRoutes = (await import('./routes/categories.js')).default
const newsletterRoutes = (await import('./routes/newsletter.js')).default
const contactRoutes = (await import('./routes/contact.js')).default
const collaborationRoutes = (await import('./routes/collaboration.js')).default
const adminRoutes = (await import('./routes/admin.js')).default

const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'PORT',
  'NODE_ENV',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'ADMIN_SESSION_SECRET',
]

const envStatus = requiredEnvVars.reduce((acc, key) => {
  const value = process.env[key]
  acc[key] = value && value.trim() !== '' ? 'set' : 'missing'
  return acc
}, {})

console.log('Environment variable status:')
requiredEnvVars.forEach((key) => {
  console.log(`  ${key}=${envStatus[key]}`)
})

const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'
const supabaseEnv = getSupabaseEnvStatus()

console.log(`Supabase env: SUPABASE_URL=${supabaseEnv.hasUrl ? 'set' : 'missing'}, SUPABASE_SERVICE_ROLE_KEY=${supabaseEnv.hasServiceRoleKey ? 'set' : 'missing'}`)

app.use(cors({
  origin: isProd ? false : 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products',      productRoutes)
app.use('/api/categories',    categoryRoutes)
app.use('/api/newsletter',    newsletterRoutes)
app.use('/api/contact',       contactRoutes)
app.use('/api/collaboration', collaborationRoutes)
app.use('/api/admin',         adminRoutes)

if (isProd) {
  const distPath = path.join(__dirname, '../dist')
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} [${isProd ? 'production' : 'development'}]`)
})
