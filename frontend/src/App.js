import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import HomeUser from './components/HomeUser'
import Login from './components/Login'
import Quotes from './components/Quotes'
import Products from './components/Products'
import CheckIn from './components/CheckIn'
import Shop from './components/Shop'
import RouteControler1 from './components/RouteController1'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home' element={<RouteControler1 componet = {HomeUser} />} />
        <Route exact path='/productos' element={<Products />} />
        <Route exact path='/shop' element={<RouteControler1 componet = {Shop} />} />
        <Route exact path='/citas' element={<RouteControler1 componet = {Quotes} />} />
        <Route exact path='/registrarse' element={<CheckIn />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}