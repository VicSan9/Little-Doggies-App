import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Quotes from './components/Quotes'
import Products from './components/Products'
import CheckIn from './components/CheckIn'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/productos' element={<Products />} />
        <Route path='/citas' element={<Quotes />} />
        <Route path='/registrarse' element={<CheckIn />} />
      </Routes>
    </BrowserRouter>
  )
}