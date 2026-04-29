// Mock API — simulates a real REST backend with network latency.
// In production, replace `delay()` calls with `fetch('/api/tasks', ...)`

const STORAGE_KEY = 'tasks-api'

const defaultTasks = [
  { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', priority: 'Low', archived: false },
  { id: 2, title: 'Finish React tutorial', description: 'Complete steps 3 through 10', priority: 'High', archived: false },
  { id: 3, title: 'Call the bank', description: 'Ask about account fees', priority: 'Medium', archived: false },
]

// Simulates network latency
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory DB backed by localStorage
function getDb() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : defaultTasks
}

function saveDb(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

// --- API methods (mimic REST endpoints) ---

export async function fetchTasks() {
  await delay()
  return getDb()
}

export async function createTask(newTask) {
  await delay()
  const tasks = getDb()
  const task = { ...newTask, id: Date.now(), archived: false }
  saveDb([...tasks, task])
  return task
}

export async function archiveTask(id) {
  await delay()
  const tasks = getDb().map(t => t.id === id ? { ...t, archived: true } : t)
  saveDb(tasks)
  return tasks.find(t => t.id === id)
}

export async function deleteTask(id) {
  await delay()
  saveDb(getDb().filter(t => t.id !== id))
}

export async function updateTask(id, changes) {
  await delay()
  const tasks = getDb().map(t => t.id === id ? { ...t, ...changes } : t)
  saveDb(tasks)
  return tasks.find(t => t.id === id)
}
