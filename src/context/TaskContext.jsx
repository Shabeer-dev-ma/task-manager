import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// 1. Create the context
const TaskContext = createContext()

// 2. Create a custom hook for easy consumption
export function useTasks() {
  return useContext(TaskContext)
}

// 3. Create the provider — holds all state and logic
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', [
    { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', priority: 'Low', archived: false },
    { id: 2, title: 'Finish React tutorial', description: 'Complete steps 3 through 10', priority: 'High', archived: false },
    { id: 3, title: 'Call the bank', description: 'Ask about account fees', priority: 'Medium', archived: false },
  ])

  function addTask(newTask) {
    setTasks(prev => [...prev, { ...newTask, archived: false }])
  }

  function archiveTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, archived: true } : t))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function updateTask(id, changes) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, archiveTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  )
}
