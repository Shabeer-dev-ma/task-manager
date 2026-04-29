import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login, register } from '../../../shared/api/authApi'
import { useAuthStore } from '../store/useAuthStore'

function AuthPage() {
  const [mode, setMode]         = useState('login')   // 'login' | 'register'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const setAuth    = useAuthStore(s => s.setAuth)
  const navigate   = useNavigate()
  const location   = useLocation()

  // After login, go back to wherever the user was trying to reach
  const from = location.state?.from?.pathname || '/'

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
    <main style={{ maxWidth: 360, margin: '4rem auto', padding: '0 1rem' }}>
      <h2>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        />
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Register'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button
          style={{ background: 'none', border: 'none', color: 'var(--primary, #646cff)', cursor: 'pointer', padding: 0 }}
          onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}
        >
          {mode === 'login' ? 'Register' : 'Sign in'}
        </button>
      </p>
    </main>
  )
}

export default AuthPage
