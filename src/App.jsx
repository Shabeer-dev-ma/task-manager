import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { TaskProvider } from './context/TaskContext'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Archive from './pages/Archive'

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
