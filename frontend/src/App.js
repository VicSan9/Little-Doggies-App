import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import HomeUser from './components/HomeUser'
import Login from './components/Login'
import Quotes from './components/Quotes'
import Products from './components/Products'
import CheckIn from './components/CheckIn'
import Shop from './components/Shop'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<HomeUser />} />
        <Route path='/login' element={<Login />} />
        <Route path='/productos' element={<Products />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/citas' element={<Quotes />} />
        <Route path='/registrarse' element={<CheckIn />} />
      </Routes>
    </BrowserRouter>
  )
}