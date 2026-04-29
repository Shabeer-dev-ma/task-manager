import { useState } from 'react'

function TaskCard({ title, description, priority, onArchive }) {
  const [done, setDone] = useState(false)

  return (
    <div className={`task-card ${done ? 'done' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
        <span className="priority">Priority: {priority}</span>
        <div className="card-actions">
          <button onClick={() => setDone(!done)}>
            {done ? 'Undo' : 'Mark Done'}
          </button>
          {done && (
            <button className="archive-btn" onClick={onArchive}>
              Archive
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
