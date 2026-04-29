import { useState } from 'react'

function TaskCard({ id, title, description, priority, onArchive, onDelete, onUpdate }) {
  const [done, setDone] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDesc, setEditDesc] = useState(description)

  function handleSave() {
    if (editTitle.trim()) {
      onUpdate({ title: editTitle.trim(), description: editDesc.trim() })
    }
    setEditing(false)
  }

  return (
    <div className={`task-card ${done ? 'done' : ''}`}>
      {editing ? (
        <div className="edit-fields">
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="edit-input"
          />
          <input
            value={editDesc}
            onChange={e => setEditDesc(e.target.value)}
            className="edit-input"
          />
          <div className="card-actions">
            <button className="archive-btn" onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="card-footer">
            <span className="priority">Priority: {priority}</span>
            <div className="card-actions">
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={() => setDone(!done)}>
                {done ? 'Undo' : 'Mark Done'}
              </button>
              {done && (
                <button className="archive-btn" onClick={onArchive}>Archive</button>
              )}
              <button className="delete-btn" onClick={onDelete}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskCard
