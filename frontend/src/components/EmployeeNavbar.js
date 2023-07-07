import { Button, Grid, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const [colorCalendar, setColorCalendar] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorOrders, setColorOrders] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorPerfil, setColorPerfil] = useState({ color1: '#000000', color2: '#ffffff' })

    const navigate = useNavigate()

    const colorPerfilFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/empleado/perfil') {
            setColorPerfil({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorCalendarFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/empleado') {
            setColorCalendar({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorOrdersFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/empleado/pedidos') {
            setColorOrders({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    useEffect(() => {
        colorPerfilFun()
    }, [])

    useEffect(() => {
        colorCalendarFun()
    }, [])

    useEffect(() => {
        colorOrdersFun()
    }, [])

    const handleClickCalendar = () => {
        navigate('/empleado')
    }

    const handleClickOrders = () => {
        navigate('/empleado/pedidos')
    }

    const handleClickPerfil = () => {
        navigate('/empleado/perfil')
    }

    const handleClickLogout = () => {
        navigate('/login')
        sessionStorage.clear()
    }

    return (
        <Grid
            container
            width='4.8vw'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            maxHeight='930px'
            maxWidth='83px'
            minWidth='51px'>
            <Grid
                container
                width='100%'
                height='90%'
                justifyContent='start'
                alignItems='center'
                borderRight='1px solid #BABBBF'
                direction='column'
                textAlign='center'>
                <Grid
                    container
                    alignContent='center'
                    justifyContent='center'
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <img src={process.env.PUBLIC_URL + "/LDLogo.png"}
                        alt="logo"
                        width='65%'>
                    </img>
                </Grid>
                <Tooltip title="Citas" placement="right">
                    <Grid
                        component={Button}
                        onClick={handleClickCalendar}
                        container
                        alignContent='center'
                        justifyContent='center'
                        item xs={1} sm={1} lg={1} md={1} xl={1}
                        bgcolor={colorCalendar.color2}
                        color={colorCalendar.color1}
                        sx={{
                            minWidth: '50px',
                            borderRadius: '0px',
                            '&:hover': {
                                bgcolor: '#0265CD'
                            },
                            padding: '0px',
                        }}>
                        <CalendarMonthIcon sx={{ fontSize: '200%' }}></CalendarMonthIcon>
                    </Grid>
                </Tooltip>
                <Tooltip title="Pedidos" placement="right">
                    <Grid
                        component={Button}
                        onClick={handleClickOrders}
                        container
                        alignContent='center'
                        justifyContent='center'
                        item xs={1} sm={1} lg={1} md={1} xl={1}
                        bgcolor={colorOrders.color2}
                        color={colorOrders.color1}
                        sx={{
                            minWidth: '50px',
                            borderRadius: '0px',
                            '&:hover': {
                                bgcolor: '#0265CD'
                            },
                            padding: '0px',
                        }}>
                        <DeliveryDiningIcon sx={{ fontSize: '200%' }}></DeliveryDiningIcon>
                    </Grid>
                </Tooltip>
                <Grid
                    container
                    alignContent='center'
                    justifyContent='end'
                    direction='column'
                    item xs={9} sm={9} lg={9} md={9} xl={9}>
                    <Tooltip title="Perfil" placement="right">
                        <Grid
                            component={Button}
                            onClick={handleClickPerfil}
                            container
                            alignContent='center'
                            justifyContent='center'
                            item xs={1.33} sm={1.33} lg={1.33} md={1.33} xl={1.33}
                            bgcolor={colorPerfil.color2}
                            color={colorPerfil.color1}
                            sx={{
                                minWidth: '50px',
                                borderRadius: '0px',
                                '&:hover': {
                                    bgcolor: '#0265CD'
                                },
                                padding: '0px',
                            }}>
                            <PersonIcon sx={{ fontSize: '250%' }}></PersonIcon>
                        </Grid>
                    </Tooltip>
                    <Grid
                        container
                        alignContent='center'
                        justifyContent='center'
                        item xs={1.33} sm={1.33} lg={1.33} md={1.33} xl={1.33}>
                        <Tooltip title="Cerrar Sesión" placement="right">
                            <IconButton onClick={handleClickLogout} sx={{ '&:hover': { color: '#CD0227' } }}>
                                <Logout sx={{ fontSize: '100%' }}></Logout>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}