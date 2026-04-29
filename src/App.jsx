import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import { Home } from './features/tasks'
import { Archive } from './features/archive'
import NavBar from './shared/components/NavBar'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
