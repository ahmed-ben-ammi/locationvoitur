
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import CarsList from './pages/CarsList'
import CarDetail from './pages/CarDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'


function App() {
  

  return (
    <>
     

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cars" element={<CarsList />} />
   <Route path="/cars/:id" element={<CarDetail />} />
   <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
</Routes>

    </>
  )
}

export default App
