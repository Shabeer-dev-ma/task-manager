import express from 'express'
import cors from 'cors'
import tasksRouter from './routes/tasks.js'
import authRouter from './routes/auth.js'
import { requireAuth } from './middleware/auth.js'

const app = express()

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }))  // only allow our Vite dev server
app.use(express.json())                              // parse JSON request bodies

// Public routes — no token needed
app.use('/api/auth', authRouter)

// Protected routes — requireAuth runs before every tasks handler
app.use('/api/tasks', requireAuth, tasksRouter)

// Health check — useful for monitoring and deployment checks
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// 404 handler for unknown routes
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

// Global error handler — catches any unhandled errors in route handlers
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
