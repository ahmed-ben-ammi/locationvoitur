
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import CarsList from './pages/CarsList'
import CarDetail from './pages/CarDetail'

function App() {
  

  return (
    <>
      <Nav/>

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cars" element={<CarsList />} />
   <Route path="/cars/:id" element={<CarDetail />} />
</Routes>

    </>
  )
}

export default App
