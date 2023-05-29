import { Box, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const RouteController = ({ componet: Componet, ...rest }) => {

    const [isAuth, setIsAuth] = useState(true)

    const auth = sessionStorage.getItem('auth')
    const user = sessionStorage.getItem('usuario')
    const password = sessionStorage.getItem('contraseña')

    const login = {usuario: user, contraseña: password}

    async function init(){
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify(login),
            headers: { "content-Type": "application/json" }
        })

        if (res.status === 200) {
            if (auth === 'yes' && user === login.usuario && password === login.contraseña) {
                setIsAuth(true)
                return
    
            } else {
                setIsAuth(false)
                sessionStorage.clear()
            }
          } else {
            setIsAuth(false)
            sessionStorage.clear()
          }

        if (auth === null) {
            setIsAuth(false)
            return
        }

        if (user === null) {
            setIsAuth(false)
            return
        }

        if (password === null) {
            setIsAuth(false)
            return
        }
    }

    useEffect(() => {
        init();
      });

    return (
        <div hidden={false}>
            <Box alignItems='center' justifyContent='center' textAlign='center' width='100vw' height='100vh' sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
        , isAuth ? <Componet {...rest} /> : <Navigate to='/login' />
    )
}

export default RouteController