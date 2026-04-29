// Real REST API — talks to the Express server via Axios
import api from './axiosInstance'

export async function fetchTasks() {
  const { data } = await api.get('/tasks')
  return data
}

export async function createTask(newTask) {
  const { data } = await api.post('/tasks', newTask)
  return data
}

export async function archiveTask(id) {
  const { data } = await api.patch(`/tasks/${id}`, { archived: true })
  return data
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`)
}

export async function updateTask(id, changes) {
  const { data } = await api.patch(`/tasks/${id}`, changes)
  return data
}
