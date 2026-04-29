import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../../../shared/api/tasksApi'

// Query key — a stable identifier for this data in the cache
export const TASKS_KEY = ['tasks']

// --- Query: fetch all tasks ---
export function useTasksQuery() {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: api.fetchTasks,
    staleTime: 30_000, // treat data as fresh for 30s — no refetch during that window
  })
}

// --- Mutations: modify tasks ---
// Each mutation invalidates the cache so the list refetches automatically

export function useCreateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useArchiveTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.archiveTask,
    // Optimistic update — update UI instantly, roll back on error
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY })
      const previous = queryClient.getQueryData(TASKS_KEY)
      queryClient.setQueryData(TASKS_KEY, old =>
        old.map(t => t.id === id ? { ...t, archived: true } : t)
      )
      return { previous } // returned as context for onError
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(TASKS_KEY, context.previous) // rollback
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY })
      const previous = queryClient.getQueryData(TASKS_KEY)
      queryClient.setQueryData(TASKS_KEY, old => old.filter(t => t.id !== id))
      return { previous }
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(TASKS_KEY, context.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, changes }) => api.updateTask(id, changes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
