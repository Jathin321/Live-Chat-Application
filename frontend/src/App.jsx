import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Chatting from './pages/Chatting'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/signup" element={<Login/>}/>
          <Route exact path="/chat" element={<Chatting/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
