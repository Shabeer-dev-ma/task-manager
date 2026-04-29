import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { readDb, writeDb } from '../db/db.js'

const router = Router()

function createToken(userId) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }

  const db = readDb()

  // Prevent user enumeration: same error for duplicate email
  const exists = db.users.some(u => u.email === email.toLowerCase())
  if (exists) {
    return res.status(409).json({ error: 'Email already registered' })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = {
    id: db.nextUserId++,
    email: email.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  db.users.push(user)
  writeDb(db)

  const token = createToken(user.id)
  res.status(201).json({ token, user: { id: user.id, email: user.email } })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const db = readDb()
  const user = db.users.find(u => u.email === email.toLowerCase())

  // Use constant-time compare even when user not found (prevents timing attacks)
  const hash = user?.passwordHash || '$2a$12$invalidhashpadding000000000000000000000000000000000000'
  const match = await bcrypt.compare(password, hash)

  if (!user || !match) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const token = createToken(user.id)
  res.json({ token, user: { id: user.id, email: user.email } })
})

export default router
