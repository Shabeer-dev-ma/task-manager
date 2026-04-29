import { useState } from 'react'

// Full class strings in static maps so Tailwind JIT includes them
const PRIORITY_SELECTED = {
  Low:    'bg-emerald-500 border-emerald-500 text-white shadow-sm',
  Medium: 'bg-amber-500 border-amber-500 text-white shadow-sm',
  High:   'bg-rose-500 border-rose-500 text-white shadow-sm',
}
const PRIORITY_IDLE = {
  Low:    'bg-white border-slate-300 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50',
  Medium: 'bg-white border-slate-300 text-slate-600 hover:border-amber-300 hover:bg-amber-50',
  High:   'bg-white border-slate-300 text-slate-600 hover:border-rose-300 hover:bg-rose-50',
}

function TaskForm({ onAddTask }) {
  const [title, setTitle]             = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority]       = useState('Medium')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAddTask({ id: Date.now(), title: title.trim(), description: description.trim(), priority })
    setTitle('')
    setDescription('')
    setPriority('Medium')
  }

  return (
    <div className="card p-5 mb-6">
      <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-1.5">
        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add new task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="task-title" className="form-label">Title <span className="text-red-400" aria-hidden="true">*</span></label>
          <input
            id="task-title"
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="task-desc" className="form-label">
            Description <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            id="task-desc"
            type="text"
            placeholder="Add more context…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <p className="form-label" id="priority-label">Priority</p>
          <div className="flex gap-2" role="radiogroup" aria-labelledby="priority-label">
            {['Low', 'Medium', 'High'].map(p => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={priority === p}
                onClick={() => setPriority(p)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 ${
                  priority === p ? PRIORITY_SELECTED[p] : PRIORITY_IDLE[p]
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-2.5 text-sm font-semibold"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </form>
    </div>
  )
}

export default TaskForm
