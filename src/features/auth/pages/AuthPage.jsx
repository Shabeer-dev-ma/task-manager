import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login, register } from '../../../shared/api/authApi'
import { useAuthStore } from '../store/useAuthStore'

function AuthPage() {
  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const setAuth    = useAuthStore(s => s.setAuth)
  const navigate   = useNavigate()
  const location   = useLocation()
  const from       = location.state?.from?.pathname || '/'

  function switchMode(next) {
    setMode(next)
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const fn = mode === 'login' ? login : register
      const { token, user } = await fn(email, password)
      setAuth(token, user)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200/70">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">TaskFlow</h1>
          <p className="text-slate-500 mt-1 text-sm">Organize your work, amplify your focus</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-8">

          {/* Mode toggle tabs */}
          <div className="flex rounded-lg bg-slate-100 p-1 mb-7" role="tablist" aria-label="Authentication mode">
            <button
              role="tab"
              type="button"
              aria-selected={mode === 'login'}
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign in
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={mode === 'register'}
              onClick={() => switchMode('register')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="auth-email" className="form-label">
                Email address
              </label>
              <input
                id="auth-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="form-label">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                placeholder={mode === 'register' ? 'Min. 8 characters' : '••••••••'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="form-input"
              />
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-2.5 px-3.5 py-3 bg-red-50 border border-red-200 rounded-lg">
                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-sm font-semibold"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Please wait…
                </>
              ) : mode === 'login' ? 'Sign in to TaskFlow' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
