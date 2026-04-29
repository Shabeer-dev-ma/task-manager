import { useTasks } from '../context/TaskContext'

function Archive() {
  const { tasks } = useTasks()
  const archivedTasks = tasks.filter(t => t.archived)

  return (
    <main>
      <h2>Archived Tasks</h2>
      {archivedTasks.length === 0 && <p className="empty">No archived tasks yet.</p>}
      {archivedTasks.map(task => (
        <div key={task.id} className="task-card done">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span className="priority">Priority: {task.priority}</span>
        </div>
      ))}
    </main>
  )
}

export default Archive
