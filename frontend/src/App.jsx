
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import CarsList from './pages/CarsList'
import CarDetail from './pages/CarDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Carslistadmin from './pages/Carslistadmin'
import Modifier from './pages/Modifier'
import AddCarForm from './pages/AjouterVoiture'
import AjouterVoiture from './pages/AjouterVoiture'
import Contact from './pages/contact'
import Message from './pages/Message'
import AdminReservations from './pages/AdminReservations'
import UserReservations from './pages/MesReservations'


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
      <Route path="/admin/cars" element={<Carslistadmin />} />
      <Route path="/modifier/:id" element={<Modifier />} />
       <Route path="/add" element={<AjouterVoiture/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin/messages" element={<Message/>} />
         <Route path="/admin/reservations" element={<AdminReservations/>} />
         <Route path="/mes-reservations" element={<UserReservations/>} />

</Routes>

    </>
  )
}

export default App
