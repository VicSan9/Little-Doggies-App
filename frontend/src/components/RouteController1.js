import { Box, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

const RouteController = ({ componet: Componet, ...rest }) => {

    const [isAuth, setIsAuth] = useState(true)
    const navigate = useNavigate()

    const auth = sessionStorage.getItem('auth')
    const user = sessionStorage.getItem('usuario')
    const password = sessionStorage.getItem('contraseña')
    const id = sessionStorage.getItem('id')
    const rol = sessionStorage.getItem('rol')

    const login = { usuario: user, contraseña: password, id: id, rol: rol }

    const init = async () => {

        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify(login),
            headers: { "content-Type": "application/json" }
        })

        if (res.status === 200) {
            if (auth === 'yes' && user === login.usuario && password === login.contraseña && id === login.id && rol === login.rol) {
                setIsAuth(true)
                if (login.rol === 'Administrador') {
                    const ruta = window.location.toString()
                    const ruta2 = ruta.split('/')
                    if (ruta2[3].toLowerCase() === 'admin'){
                        window.history.forward()
                        return
                    } else {
                        navigate('/admin')
                        return
                    }
                    
                }
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

        if (rol === null) {
            setIsAuth(false)
            return
        }

    if (res.status === 200) {
        if (auth === 'yes' && user === login.usuario && password === login.contraseña && id === login.id && rol === login.rol) {
            setIsAuth(true)
            if (login.rol === 'Trabajador') {
                const ruta = window.location.toString()
                const ruta2 = ruta.split('/')
                if (ruta2[3].toLowerCase() === 'empleado'){
                    window.history.forward()
                    return
                } else {
                    navigate('/empleado')
                    return
                }
                
            }
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

    if (rol === null) {
        setIsAuth(false)
        return
    }
}

    useEffect(() => {
        init()
    }, [])


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