import { Button, Grid, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const [colorCalendar, setColorCalendar] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorServices, setColorServices] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorClient, setColorClient] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorStaff, setColorStaff] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorProducts, setColorProcolorProducts] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorProfile, setColorProcolorProfile] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorOrders, setColorOrders] = useState({ color1: '#000000', color2: '#ffffff' })

    const navigate = useNavigate()

    const colorProfileFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/admin/perfil') {
            setColorProcolorProfile({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorProductsFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/admin/productos') {
            setColorProcolorProducts({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorStaffFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/admin/personal') {
            setColorStaff({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorClientFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/admin/clientes') {
            setColorClient({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorOrdersFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/admin/pedidos') {
            setColorOrders({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorCalendarFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/admin') {
            setColorCalendar({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    const colorServicesFun = () => {
        if (window.location.href.toString() === 'http://localhost:3000/admin/servicios') {
            setColorServices({ color1: '#ffffff', color2: '#0265CD' })
        }
    }

    useEffect(() => {
        colorProfileFun()
    }, [])

    useEffect(() => {
        colorCalendarFun()
    }, [])

    useEffect(() => {
        colorProductsFun()
    }, [])

    useEffect(() => {
        colorStaffFun()
    }, [])

    useEffect(() => {
        colorServicesFun()
    }, [])

    useEffect(() => {
        colorOrdersFun()
    }, [])

    useEffect(() => {
        colorClientFun()
    }, [])

    const handleClickCalendar = () => {
        navigate('/admin')
    }

    const handleClickServices = () => {
        navigate('/admin/servicios')
    }

    const handleClickClient = () => {
        navigate('/admin/clientes')
    }

    const handleClickStaff = () => {
        navigate('/admin/personal')
    }

    const handleClickProducts = () => {
        navigate('/admin/productos')
    }

    const handleClickProfile = () => {
        navigate('/admin/perfil')
    }

    const handleClickOrders = () => {
        navigate('/admin/pedidos')
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
                <Tooltip title="Servicios" placement="right">
                    <Grid
                        component={Button}
                        onClick={handleClickServices}
                        container
                        alignContent='center'
                        justifyContent='center'
                        item xs={1} sm={1} lg={1} md={1} xl={1}
                        bgcolor={colorServices.color2}
                        color={colorServices.color1}
                        sx={{
                            minWidth: '50px',
                            borderRadius: '0px',
                            '&:hover': {
                                bgcolor: '#0265CD'
                            },
                            padding: '0px',
                        }}>
                        <FormatListBulletedIcon sx={{ fontSize: '200%' }}></FormatListBulletedIcon>
                    </Grid>
                </Tooltip>
                <Tooltip title="Clientes" placement="right">
                    <Grid
                        component={Button}
                        onClick={handleClickClient}
                        container
                        alignContent='center'
                        justifyContent='center'
                        item xs={1} sm={1} lg={1} md={1} xl={1}
                        bgcolor={colorClient.color2}
                        color={colorClient.color1}
                        sx={{
                            minWidth: '50px',
                            borderRadius: '0px',
                            '&:hover': {
                                bgcolor: '#0265CD'
                            },
                            padding: '0px',
                        }}>
                        <GroupsIcon sx={{ fontSize: '200%' }}></GroupsIcon>
                    </Grid>
                </Tooltip>
                <Tooltip title="Personal" placement="right">
                    <Grid
                        component={Button}
                        onClick={handleClickStaff}
                        container
                        alignContent='center'
                        justifyContent='center'
                        item xs={1} sm={1} lg={1} md={1} xl={1}
                        bgcolor={colorStaff.color2}
                        color={colorStaff.color1}
                        sx={{
                            minWidth: '50px',
                            borderRadius: '0px',
                            '&:hover': {
                                bgcolor: '#0265CD'
                            },
                            padding: '0px',
                        }}>
                        <SupervisorAccountIcon sx={{ fontSize: '200%' }}></SupervisorAccountIcon>
                    </Grid>
                </Tooltip>
                <Tooltip title="Productos" placement="right">
                    <Grid
                        component={Button}
                        onClick={handleClickProducts}
                        container
                        alignContent='center'
                        justifyContent='center'
                        item xs={1} sm={1} lg={1} md={1} xl={1}
                        bgcolor={colorProducts.color2}
                        color={colorProducts.color1}
                        sx={{
                            minWidth: '50px',
                            borderRadius: '0px',
                            '&:hover': {
                                bgcolor: '#0265CD'
                            },
                            padding: '0px',
                        }}>
                        <InventoryIcon sx={{ fontSize: '200%' }}></InventoryIcon>
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
                    item xs={4} sm={4} lg={4} md={4} xl={4}>
                    <Tooltip title="Perfil" placement="right">
                        <Grid
                            component={Button}
                            onClick={handleClickProfile}
                            container
                            alignContent='center'
                            justifyContent='center'
                            item xs={2} sm={2} lg={2} md={2} xl={2}
                            bgcolor={colorProfile.color2}
                            color={colorProfile.color1}
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
                        item xs={2} sm={2} lg={2} md={2} xl={2}>
                        <Tooltip title="Cerrar Sesión" placement="right">
                            <IconButton onClick={handleClickLogout} sx={{'&:hover':{color:'#CD0227'}}}>
                                <Logout sx={{ fontSize: '100%' }}></Logout>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}