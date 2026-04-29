import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import tasksRouter from './routes/tasks.js'
import authRouter from './routes/auth.js'
import { requireAuth } from './middleware/auth.js'

const app = express()

// Security: set safe HTTP response headers
app.use(helmet())

// Security: rate-limit all requests (100 per 15 min per IP)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
}))

// Tighter limit specifically on auth endpoints (10 per 15 min) — stops brute-forcing passwords
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again later' },
})

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

// Public routes — no token needed
app.use('/api/auth', authLimiter, authRouter)

// Protected routes — requireAuth runs before every tasks handler
app.use('/api/tasks', requireAuth, tasksRouter)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
