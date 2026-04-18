import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes         from './routes/auth.js'
import cartRoutes         from './routes/cart.js'
import orderRoutes        from './routes/orders.js'
import productRoutes      from './routes/products.js'
import categoryRoutes     from './routes/categories.js'
import newsletterRoutes   from './routes/newsletter.js'
import contactRoutes      from './routes/contact.js'
import collaborationRoutes from './routes/collaboration.js'
import profileRoutes      from './routes/profile.js'
import adminRoutes        from './routes/admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

app.use(cors({
  origin: isProd ? false : 'http://localhost:5173',
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

app.use('/api/auth',          authRoutes)
app.use('/api/cart',          cartRoutes)
app.use('/api/orders',        orderRoutes)
app.use('/api/products',      productRoutes)
app.use('/api/categories',    categoryRoutes)
app.use('/api/newsletter',    newsletterRoutes)
app.use('/api/contact',       contactRoutes)
app.use('/api/collaboration',  collaborationRoutes)
app.use('/api/profile',       profileRoutes)
app.use('/api/admin',         adminRoutes)

if (isProd) {
  const distPath = path.join(__dirname, '../dist')
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next()
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
