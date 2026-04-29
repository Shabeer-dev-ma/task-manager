import { useState } from 'react'

// Static maps ensure Tailwind's JIT scanner includes all needed classes
const PRIORITY = {
  High: {
    border:  'border-l-rose-500',
    badge:   'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    dot:     'bg-rose-500',
  },
  Medium: {
    border:  'border-l-amber-500',
    badge:   'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    dot:     'bg-amber-500',
  },
  Low: {
    border:  'border-l-emerald-500',
    badge:   'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    dot:     'bg-emerald-500',
  },
}

function TaskCard({ id, title, description, priority, onArchive, onDelete, onUpdate }) {
  const [done, setDone]         = useState(false)
  const [editing, setEditing]   = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDesc, setEditDesc]   = useState(description)

  const p = PRIORITY[priority] ?? PRIORITY.Medium

  function handleSave() {
    if (editTitle.trim()) {
      onUpdate({ title: editTitle.trim(), description: editDesc.trim() })
    }
    setEditing(false)
  }

  function handleCancelEdit() {
    setEditTitle(title)
    setEditDesc(description ?? '')
    setEditing(false)
  }

  return (
    <article
      className={`card border-l-4 ${p.border} p-5 transition-all duration-200 hover:shadow-md animate-slide-up ${done ? 'opacity-60' : ''}`}
    >
      {editing ? (
        /* ── Edit mode ── */
        <div className="space-y-3">
          <div>
            <label htmlFor={`edit-title-${id}`} className="form-label">Title</label>
            <input
              id={`edit-title-${id}`}
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="form-input"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor={`edit-desc-${id}`} className="form-label">Description</label>
            <input
              id={`edit-desc-${id}`}
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              placeholder="Optional description"
              className="form-input"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button onClick={handleSave} className="btn-primary px-4 py-2 text-sm">
              Save changes
            </button>
            <button onClick={handleCancelEdit} className="btn-secondary px-4 py-2 text-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ── View mode ── */
        <>
          {/* Card header */}
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className={`font-semibold text-slate-900 leading-snug ${done ? 'line-through text-slate-400' : ''}`}>
              {title}
            </h3>
            <span className={`shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${p.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} aria-hidden="true" />
              {priority}
            </span>
          </div>

          {description && (
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">{description}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1 flex-wrap pt-1">
            <button
              onClick={() => setEditing(true)}
              aria-label="Edit task"
              className="btn-ghost"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>

            <button
              onClick={() => setDone(d => !d)}
              aria-pressed={done}
              className={`btn ${done
                ? 'px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                : 'btn-success-ghost'
              }`}
            >
              {done ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Undo
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Mark done
                </>
              )}
            </button>

            {done && (
              <button
                onClick={onArchive}
                className="btn px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Archive
              </button>
            )}

            <button
              onClick={onDelete}
              aria-label="Delete task"
              className="btn-danger-ghost ml-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default TaskCard
