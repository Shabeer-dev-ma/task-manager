import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { TaskProvider, Home } from './features/tasks'
import { Archive } from './features/archive'
import NavBar from './shared/components/NavBar'

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <NavBar />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
