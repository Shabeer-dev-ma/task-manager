import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './store'
import './App.css'
import { Home } from './features/tasks'
import { Archive } from './features/archive'
import AuthPage from './features/auth/pages/AuthPage'
import NavBar from './shared/components/NavBar'
import { RequireAuth } from './shared/components/RequireAuth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
})

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar />
          <div className="app">
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/archive" element={<RequireAuth><Archive /></RequireAuth>} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
