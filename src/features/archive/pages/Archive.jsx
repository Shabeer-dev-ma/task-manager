import { useTasksQuery, useDeleteTask } from '../../tasks/hooks/useTasksQuery'

function Archive() {
  const { data: tasks = [], isLoading } = useTasksQuery()
  const deleteTask = useDeleteTask()
  const archivedTasks = tasks.filter(t => t.archived)

  if (isLoading) return <p className="empty">Loading...</p>

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
            <button className="delete-btn" onClick={() => deleteTask.mutate(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </main>
  )
}

export default Archive
