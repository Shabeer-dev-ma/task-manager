import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectActiveTasks } from '../../features/tasks/store/tasksSlice'

function NavBar() {
  const activeTasks = useSelector(selectActiveTasks)
  const activeCount = activeTasks.length

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
