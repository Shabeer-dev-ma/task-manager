import { useTasksQuery, useCreateTask, useArchiveTask, useDeleteTask, useUpdateTask } from '../hooks/useTasksQuery'
import useTaskFilters from '../hooks/useTaskFilters'
import useFilterStore from '../store/ui/useFilterStore'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'

function StatCard({ label, value, colorClass }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <p className={`text-2xl font-bold tabular-nums ${colorClass}`}>{value}</p>
      <p className="text-xs font-medium text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

function Home() {
  const { data: tasks = [], isLoading, isError } = useTasksQuery()
  const createTask  = useCreateTask()
  const archiveTask = useArchiveTask()
  const deleteTask  = useDeleteTask()
  const updateTask  = useUpdateTask()

  const { filtered, search, setSearch, filterPriority, setFilterPriority } = useTaskFilters(tasks)
  const resetFilters = useFilterStore(s => s.resetFilters)

  const activeTasks   = tasks.filter(t => !t.archived)
  const highPriority  = activeTasks.filter(t => t.priority === 'High').length
  const archivedCount = tasks.filter(t => t.archived).length
  const filtersActive = search || filterPriority !== 'All'

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading tasks…</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-sm text-red-700 font-medium">Failed to load tasks. Please refresh the page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Tasks</h1>
        <p className="text-slate-500 text-sm mt-1">
          {activeTasks.length === 0
            ? 'No active tasks — add one below'
            : `${activeTasks.length} active task${activeTasks.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        <StatCard label="Active"       value={activeTasks.length}  colorClass="text-indigo-600" />
        <StatCard label="High Priority" value={highPriority}         colorClass="text-rose-500"   />
        <StatCard label="Archived"     value={archivedCount}        colorClass="text-slate-500"  />
      </div>

      {/* Add task form */}
      <TaskForm onAddTask={task => createTask.mutate(task)} />

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
          </svg>
          <input
            type="search"
            aria-label="Search tasks"
            placeholder="Search tasks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>

        <select
          aria-label="Filter by priority"
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
          className="form-select"
        >
          <option value="All">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {filtersActive && (
          <button
            onClick={resetFilters}
            className="btn-secondary shrink-0 text-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reset
          </button>
        )}
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4" aria-hidden="true">
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {filtersActive ? 'No tasks match your filters.' : 'No tasks yet. Add your first one above!'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
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
        </div>
      )}
    </div>
  )
}

export default Home
