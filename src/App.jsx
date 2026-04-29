import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './store'
import './App.css'
import { Home } from './features/tasks'
import { Archive } from './features/archive'
import NavBar from './shared/components/NavBar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,               // retry failed requests once
      refetchOnWindowFocus: true, // refresh stale data when user returns to tab
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
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
