import { useTasksQuery, useCreateTask, useArchiveTask, useDeleteTask, useUpdateTask } from '../hooks/useTasksQuery'
import useTaskFilters from '../hooks/useTaskFilters'
import useFilterStore from '../store/ui/useFilterStore'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'

function Home() {
  // Server state — React Query owns this
  const { data: tasks = [], isLoading, isError } = useTasksQuery()
  const createTask = useCreateTask()
  const archiveTask = useArchiveTask()
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()

  // UI state — Zustand owns this (persists across navigations)
  const { filtered, search, setSearch, filterPriority, setFilterPriority } = useTaskFilters(tasks)
  const resetFilters = useFilterStore(s => s.resetFilters)

  if (isLoading) return <p className="empty">Loading tasks...</p>
  if (isError) return <p className="empty">Failed to load tasks. Please try again.</p>

  return (
    <main>
      <TaskForm onAddTask={task => createTask.mutate(task)} />

      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        {(search || filterPriority !== 'All') && (
          <button onClick={resetFilters}>Reset</button>
        )}
      </div>

      {filtered.length === 0 && <p className="empty">No tasks match your filters.</p>}
      {filtered.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          onArchive={() => archiveTask.mutate(task.id)}
          onDelete={() => deleteTask.mutate(task.id)}
          onUpdate={(changes) => updateTask.mutate({ id: task.id, changes })}
        />
      ))}
    </main>
  )
}

export default Home
