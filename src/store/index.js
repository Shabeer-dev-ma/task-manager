import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/store/tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,  // state.tasks will hold all task data
  },
})

// Persist store to localStorage on every state change
store.subscribe(() => {
  localStorage.setItem('tasks-redux', JSON.stringify(store.getState().tasks))
})

// Infer types for TypeScript (used when we add typed hooks)
export default store
