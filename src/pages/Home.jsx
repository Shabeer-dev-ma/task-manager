import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'

function Home() {
  const { tasks, addTask, archiveTask, deleteTask, updateTask } = useTasks()
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')

  const activeTasks = tasks
    .filter(t => !t.archived)
    .filter(t => filterPriority === 'All' || t.priority === filterPriority)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <TaskForm onAddTask={addTask} />

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

      {activeTasks.length === 0 && <p className="empty">No tasks match your filters.</p>}
      {activeTasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          onArchive={() => archiveTask(task.id)}
          onDelete={() => deleteTask(task.id)}
          onUpdate={(changes) => updateTask(task.id, changes)}
        />
      ))}
    </main>
  )
}

export default Home
