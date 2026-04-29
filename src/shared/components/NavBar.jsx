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
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center justify-center w-7 h-7 bg-indigo-500 rounded-lg" aria-hidden="true">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-base tracking-tight">TaskFlow</span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              Home
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-bold bg-indigo-500 text-white rounded-full tabular-nums">
                  {activeCount}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/archive"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              Archive
            </NavLink>
          </div>

          {/* User Area */}
          {user && (
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:block text-sm text-slate-400 truncate max-w-[180px]">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
