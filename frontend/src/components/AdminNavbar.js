import { Button, Grid, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const [colorCalendar, setColorCalendar] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorServices, setColorServices] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorClient, setColorClient] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorStaff, setColorStaff] = useState({ color1: '#000000', color2: '#ffffff' })
    const [colorProducts, setColorProcolorProducts] = useState({ color1: '#000000', color2: '#ffffff' })

    const navigate = useNavigate()

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
                            minWidth:'50px',
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
                            minWidth:'50px',
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
                            minWidth:'50px',
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
                            minWidth:'50px',
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
                            minWidth:'50px',
                            borderRadius: '0px',
                            '&:hover': {
                                bgcolor: '#0265CD'
                            },
                            padding: '0px',
                        }}>
                        <InventoryIcon sx={{ fontSize: '200%' }}></InventoryIcon>
                    </Grid>
                </Tooltip>
            </Grid>
        </Grid>
    )
}