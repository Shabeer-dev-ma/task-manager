import { useTasks } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'

function Home() {
  const { tasks, addTask, archiveTask } = useTasks()
  const activeTasks = tasks.filter(t => !t.archived)

  return (
    <main>
      <TaskForm onAddTask={addTask} />
      {activeTasks.length === 0 && <p className="empty">No active tasks. Add one above!</p>}
      {activeTasks.map(task => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          onArchive={() => archiveTask(task.id)}
        />
      ))}
    </main>
  )
}

export default Home
