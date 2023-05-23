import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Container } from "@mui/material"
import Quotes from './components/Quotes'
import Products from './components/Products'
import CheckIn from './components/CheckIn'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/productos' element={<Products/>}/>
          <Route path='/citas' element={<Quotes/>}/>
          <Route path='/registrarse' element={<CheckIn/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}