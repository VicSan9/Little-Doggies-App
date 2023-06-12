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
import Code from './components/Code'
import Password from './components/Password'
import NotFound from './components/NotFound'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NewPet from './components/NewPet'
import PersonalInformation from './components/personalInformation'
import UserPets from './components/userPets'
import UserQuotes from './components/userQuotes'
import ModifyInformation from './components/ModifyInformation'
import Shoppinghistory from './components/Shoppinghistory'

export default function App({ children }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        {children}
      </LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/codigo' element={<Code />} />
          <Route exact path='/contraseña' element={<Password />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/productos' element={<Products />} />
          <Route exact path='/registrarse' element={<CheckIn />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/recuperar' element={<Recover />} />
          <Route exact path='/shop' element={<RouteControler1 componet={Shop} />} />
          <Route exact path='/citas' element={<RouteControler1 componet={Quotes} />} />
          <Route exact path='/nueva-cita' element={<RouteControler1 componet={Calendar} />} />
          <Route exact path='/home' element={<RouteControler1 componet={HomeUser} />} />
          <Route exact path='/nueva-mascota' element={<RouteControler1 componet={NewPet} />} />
          <Route exact path='/mis-mascotas' element={<RouteControler1 componet={UserPets} />} />
          <Route exact path='/mis-citas' element={<RouteControler1 componet={UserQuotes} />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/cuenta' element={<RouteControler1 componet={PersonalInformation} />} />
          <Route path='/editar-cuenta' element={<RouteControler1 componet={ModifyInformation} />} />
          <Route path='/historial-de-compras' element={<RouteControler1 componet={Shoppinghistory} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}