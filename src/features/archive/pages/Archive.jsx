import { useTasksQuery, useDeleteTask } from '../../tasks/hooks/useTasksQuery'

const PRIORITY_BADGE = {
  High:   'bg-rose-50 text-rose-600 ring-1 ring-rose-200',
  Medium: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200',
  Low:    'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
}

function Archive() {
  const { data: tasks = [], isLoading } = useTasksQuery()
  const deleteTask = useDeleteTask()
  const archivedTasks = tasks.filter(t => t.archived)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading archive…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Archive</h1>
          <p className="text-slate-500 text-sm mt-1">
            {archivedTasks.length === 0
              ? 'No archived tasks'
              : `${archivedTasks.length} archived task${archivedTasks.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="flex items-center justify-center w-9 h-9 bg-slate-100 rounded-lg" aria-hidden="true">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
      </div>

      {/* Empty state */}
      {archivedTasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4" aria-hidden="true">
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500">No archived tasks yet.</p>
          <p className="text-xs text-slate-400 mt-1">Mark a task as done and archive it from the Home page.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {archivedTasks.map(task => (
            <article
              key={task.id}
              className="bg-white rounded-xl border border-slate-200 p-5 opacity-75 hover:opacity-100 transition-opacity duration-150"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-500 line-through leading-snug">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{task.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_BADGE[task.priority] ?? PRIORITY_BADGE.Medium}`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask.mutate(task.id)}
                    aria-label={`Delete archived task: ${task.title}`}
                    className="btn-danger-ghost p-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Archive
