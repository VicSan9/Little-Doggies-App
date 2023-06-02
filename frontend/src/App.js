import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import HomeUser from './components/HomeUser'
import Login from './components/Login'
import Quotes from './components/Quotes'
import Products from './components/Products'
import CheckIn from './components/CheckIn'
import Shop from './components/Shop'
import RouteControler1 from './components/RouteController1'
import Recover from './components/Recover'
import Calendar from './components/Calendar'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/productos' element={<Products />} />
        <Route exact path='/registrarse' element={<CheckIn />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/recuperar' element={<Recover />} />
        <Route exact path='/shop' element={<RouteControler1 componet = {Shop} />} />
        <Route exact path='/citas' element={<RouteControler1 componet = {Quotes} />} />
        <Route exact path='/nueva-cita' element={<RouteControler1 componet = {Calendar} />} />
        <Route exact path='/home' element={<RouteControler1 componet = {HomeUser} />} />
      </Routes>
    </BrowserRouter>
  )
}