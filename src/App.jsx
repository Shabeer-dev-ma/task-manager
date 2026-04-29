import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './store'
import './App.css'
import { Home } from './features/tasks'
import { Archive } from './features/archive'
import AuthPage from './features/auth/pages/AuthPage'
import NavBar from './shared/components/NavBar'
import { RequireAuth } from './shared/components/RequireAuth'
import ErrorBoundary from './shared/components/ErrorBoundary'
import { useAuthStore } from './features/auth/store/useAuthStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
})

// Redirect already-logged-in users away from /login
function RedirectIfAuth({ children }) {
  const token = useAuthStore(s => s.token)
  return token ? <Navigate to="/" replace /> : children
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar />
          <ErrorBoundary>
            <div className="flex-1">
              <Routes>
                <Route path="/login" element={<RedirectIfAuth><AuthPage /></RedirectIfAuth>} />
                <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
                <Route path="/archive" element={<RequireAuth><Archive /></RequireAuth>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
