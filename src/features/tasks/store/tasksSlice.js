import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', priority: 'Low', archived: false },
  { id: 2, title: 'Finish React tutorial', description: 'Complete steps 3 through 10', priority: 'High', archived: false },
  { id: 3, title: 'Call the bank', description: 'Ask about account fees', priority: 'Medium', archived: false },
]

// Load persisted state from localStorage if it exists
const persisted = localStorage.getItem('tasks-redux')
const preloadedState = persisted ? JSON.parse(persisted) : initialState

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: preloadedState,

  // Each key becomes an action creator + a reducer case automatically
  reducers: {
    addTask(state, action) {
      // Redux Toolkit uses Immer under the hood — direct mutation is safe here
      state.push({ ...action.payload, archived: false })
    },
    archiveTask(state, action) {
      const task = state.find(t => t.id === action.payload)
      if (task) task.archived = true
    },
    deleteTask(state, action) {
      return state.filter(t => t.id !== action.payload)
    },
    updateTask(state, action) {
      const { id, changes } = action.payload
      const task = state.find(t => t.id === id)
      if (task) Object.assign(task, changes)
    },
  },
})

// Named action creators — imported by components to dispatch
export const { addTask, archiveTask, deleteTask, updateTask } = tasksSlice.actions

// Selectors — components use these to read from the store
export const selectAllTasks = state => state.tasks
export const selectActiveTasks = state => state.tasks.filter(t => !t.archived)
export const selectArchivedTasks = state => state.tasks.filter(t => t.archived)

export default tasksSlice.reducer
