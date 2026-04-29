import { NavLink } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'

function NavBar() {
  const { tasks } = useTasks()
  const activeCount = tasks.filter(t => !t.archived).length

  return (
    <nav className="navbar">
      <span className="nav-brand">Task Manager</span>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Home {activeCount > 0 && <span className="nav-badge">{activeCount}</span>}
        </NavLink>
        <NavLink to="/archive" className={({ isActive }) => isActive ? 'active' : ''}>
          Archive
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
