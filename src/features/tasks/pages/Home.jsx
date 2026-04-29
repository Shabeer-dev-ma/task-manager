import { useDispatch, useSelector } from 'react-redux'
import { selectAllTasks, addTask, archiveTask, deleteTask, updateTask } from '../store/tasksSlice'
import useTaskFilters from '../hooks/useTaskFilters'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'

function Home() {
  const dispatch = useDispatch()
  const tasks = useSelector(selectAllTasks)
  const { filtered, search, setSearch, filterPriority, setFilterPriority } = useTaskFilters(tasks)

  return (
    <main>
      <TaskForm onAddTask={task => dispatch(addTask(task))} />

      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {filtered.length === 0 && <p className="empty">No tasks match your filters.</p>}
      {filtered.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          onArchive={() => dispatch(archiveTask(task.id))}
          onDelete={() => dispatch(deleteTask(task.id))}
          onUpdate={(changes) => dispatch(updateTask({ id: task.id, changes }))}
        />
      ))}
    </main>
  )
}

export default Home
