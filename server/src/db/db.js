import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_FILE = join(__dirname, '../../../db.json')

const defaultData = {
  tasks: [
    { id: 1, title: 'Buy groceries',         description: 'Milk, eggs, bread',           priority: 'Low',    archived: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Finish React tutorial',  description: 'Complete steps 3 through 10', priority: 'High',   archived: false, createdAt: new Date().toISOString() },
    { id: 3, title: 'Call the bank',          description: 'Ask about account fees',       priority: 'Medium', archived: false, createdAt: new Date().toISOString() },
  ],
  nextId: 4,
  users: [],        // { id, email, passwordHash, createdAt }
  nextUserId: 1,
}

export function readDb() {
  if (!existsSync(DB_FILE)) {
    writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2))
    return structuredClone(defaultData)
  }
  // Merge defaults so new fields (e.g. users) always exist even in old db.json files
  const stored = JSON.parse(readFileSync(DB_FILE, 'utf-8'))
  return { ...defaultData, ...stored, users: stored.users ?? [], nextUserId: stored.nextUserId ?? 1 }
}

export function writeDb(data) {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

