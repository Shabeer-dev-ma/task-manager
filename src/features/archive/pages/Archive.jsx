import { useDispatch, useSelector } from 'react-redux'
import { selectArchivedTasks, deleteTask } from '../../tasks/store/tasksSlice'

function Archive() {
  const dispatch = useDispatch()
  const archivedTasks = useSelector(selectArchivedTasks)

  return (
    <main>
      <h2>Archived Tasks</h2>
      {archivedTasks.length === 0 && <p className="empty">No archived tasks yet.</p>}
      {archivedTasks.map(task => (
        <div key={task.id} className="task-card done">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="card-footer">
            <span className="priority">Priority: {task.priority}</span>
            <button className="delete-btn" onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </div>
        </div>
      ))}
    </main>
  )
}

export default Archive
