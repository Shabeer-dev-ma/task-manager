import { NavLink, useNavigate } from 'react-router-dom'
import { useTasksQuery } from '../../features/tasks/hooks/useTasksQuery'
import { useAuthStore } from '../../features/auth/store/useAuthStore'

function NavBar() {
  const { data: tasks = [] } = useTasksQuery()
  const activeCount = tasks.filter(t => !t.archived).length
  const user        = useAuthStore(s => s.user)
  const logout      = useAuthStore(s => s.logout)
  const navigate    = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

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
        {user && (
          <>
            <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>{user.email}</span>
            <button onClick={handleLogout} className="delete-btn" style={{ padding: '0.2rem 0.7rem' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
