import { Router } from 'express'
import { readDb, writeDb } from '../db/db.js'

const router = Router()

// Validation helper
function validateTask(body) {
  const { title, priority } = body
  if (!title || typeof title !== 'string' || !title.trim()) {
    return 'Title is required'
  }
  if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
    return 'Priority must be Low, Medium, or High'
  }
  return null
}

// GET /api/tasks — list all tasks
router.get('/', (req, res) => {
  const { tasks } = readDb()
  res.json(tasks)
})

// GET /api/tasks/:id — get one task
router.get('/:id', (req, res) => {
  const db = readDb()
  const task = db.tasks.find(t => t.id === Number(req.params.id))
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
})

// POST /api/tasks — create a task
router.post('/', (req, res) => {
  const error = validateTask(req.body)
  if (error) return res.status(400).json({ error })

  const db = readDb()
  const task = {
    id: db.nextId++,
    title: req.body.title.trim(),
    description: (req.body.description || '').trim(),
    priority: req.body.priority || 'Medium',
    archived: false,
    createdAt: new Date().toISOString(),
  }
  db.tasks.push(task)
  writeDb(db)

  res.status(201).json(task)
})

// PATCH /api/tasks/:id — update fields on a task
router.patch('/:id', (req, res) => {
  const db = readDb()
  const index = db.tasks.findIndex(t => t.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Task not found' })

  const allowed = ['title', 'description', 'priority', 'archived']
  const changes = {}
  for (const key of allowed) {
    if (key in req.body) changes[key] = req.body[key]
  }

  if (changes.priority) {
    const error = validateTask({ title: db.tasks[index].title, priority: changes.priority })
    if (error) return res.status(400).json({ error })
  }

  db.tasks[index] = { ...db.tasks[index], ...changes }
  writeDb(db)

  res.json(db.tasks[index])
})

// DELETE /api/tasks/:id — delete a task
router.delete('/:id', (req, res) => {
  const db = readDb()
  const index = db.tasks.findIndex(t => t.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Task not found' })

  db.tasks.splice(index, 1)
  writeDb(db)

  res.status(204).send()
})

export default router
