import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, Tooltip, Typography } from "@mui/material"
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

    const usuario = sessionStorage.getItem('usuario');

    const [isVisible, setIsVisible] = React.useState(true)
 
    const isAuth = () => {
        const auth = sessionStorage.getItem('auth')
        if (auth === 'yes') {
            setIsVisible(false);
        }
        if (auth === 'no') {
            setIsVisible(true);
        }
    };

    React.useEffect(() => {
        isAuth()
        return () => {
        }
    }, [isVisible])


    const navigate = useNavigate()

    const handleCloseAvatar2 = () => {
        setAnchorEl(null);
        sessionStorage.clear()
        navigate('/login')
        setIsVisible(false)
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }}>
            <Container maxWidth='xl'
                fixed >
                <Grid container
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        borderBottom: '2px solid #0265CD'
                    }}
                    spacing='2'
                    direction='row'
                    justifyContent='flex-start'
                    alignItems="strech"
                    textAlign='center'>
                    <Grid item xs={3} sm={2} lg={1} md={2} xl={1}>
                        <img src={process.env.PUBLIC_URL + "/LDLogo.png"}
                            alt="logo"
                            height='57vh'>
                        </img>
                    </Grid>
                    <Grid item xs={2} sm={2} lg={1} md={2} xl={1}
                        sx={{
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]
                            }
                        }}>
                        <Box mt='14px' sx={{ overflow: 'hidden' }}>
                            <Link href="#"
                                to='/home'
                                style={{
                                    textDecoration: "none",
                                    fontSize: '20px',
                                    color: "#000000",
                                    fontWeight: "inherit"
                                }}> Inicio
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={2} lg={1} md={2} xl={1}
                        sx={{
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]
                            }
                        }}>
                        <Box mt='14px' sx={{ overflow: 'hidden' }}>
                            <Link href="#"
                                to='/citas'
                                style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                    fontSize: '20px',
                                    fontWeight: "inherit"
                                }}> Citas
                            </Link>
                        </Box>

                    </Grid>
                    <Grid item xs={3} sm={2} lg={1} md={2} xl={1}
                        sx={{
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]
                            }
                        }}>
                        <Box mt='14px' sx={{ overflow: 'hidden' }}>
                            <Link href="#"
                                to='/shop'
                                style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                    fontSize: '20px',
                                    fontWeight: "inherit"
                                }}> Productos
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={1} sm={3} lg={5} md={1} xl={5}>
                    </Grid>
                    <Grid container
                        justifyContent='flex-end'
                        alignItems='center'
                        item xs={1} sm={1} lg={3} md={3} xl={3}>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Typography mr='15px'
                                    sx={{ fontSize: '18px', display: { xs: 'none', sm: 'none', md: 'flex' } }}
                                    color='#000000'>
                                    {usuario}
                                </Typography>
                                <Tooltip title="Mi cuenta">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 50, height: 50 }}></Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        border: '1px solid #BABBBF',
                                        borderRadius:'20px',
                                        mt: 1.5,
                                        '&:before': {
                                            content: '""',
                                            borderTop: '1px solid #BABBBF',
                                            borderLeft: '1px solid #BABBBF',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >   <Grid container
                                direction='column'
                                width='300px'
                                height='400px'
                                justifyContent='center'
                                alignItems='center'>
                                    <Grid container
                                        direction='column'
                                        width='280px'
                                        height='340px'
                                        sx={{ borderRadius:'20px 20px 0px 0px', backgroundColor: '#D9D9D9' }}>
                                        <Grid container direction='row'>
                                            <Grid item xs={4}>
                                                <Avatar sx={{ ml: '13px', mt: '15px', border: '1px solid #000000', width: 60, height: 60 }}></Avatar>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography mt='20px' fontWeight='bold'>{sessionStorage.getItem('usuario')}</Typography>
                                                <Typography overflow='hidden' sx={{ fontSize: '13px' }}>{sessionStorage.getItem('correo')}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Box height='5px' mt='15px' sx={{ backgroundColor: '#ffffff' }}></Box>
                                        <Grid container direction='column'>
                                            <Grid container
                                                height='45px'
                                                component={Button}
                                                onClick={handleClose}
                                                borderRadius='0px'
                                                sx={{
                                                    textTransform: 'none',
                                                    color: '#000000',
                                                    '&:hover': {
                                                        backgroundColor: 'white',
                                                        opacity: [1, 1, 1]
                                                    }
                                                }}
                                                direction='row'
                                                textAlign='start'
                                                mt='15px'>
                                                <Grid item xs={2}>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Typography sx={{ fontSize: '15px' }}>Mis Mascotas</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <PetsIcon></PetsIcon>
                                                </Grid>
                                            </Grid>
                                            <Grid container
                                                height='45px'
                                                component={Button}
                                                onClick={handleClose}
                                                borderRadius='0px'
                                                sx={{
                                                    textTransform: 'none',
                                                    color: '#000000',
                                                    '&:hover': {
                                                        backgroundColor: 'white',
                                                        opacity: [1, 1, 1]
                                                    }
                                                }}
                                                direction='row'
                                                textAlign='start'
                                                mt='10px'>
                                                <Grid item xs={2}>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Typography sx={{ fontSize: '15px' }}>Mis Citas</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <CalendarMonthIcon></CalendarMonthIcon>
                                                </Grid>
                                            </Grid>
                                            <Grid container
                                                height='45px'
                                                component={Button}
                                                onClick={handleClose}
                                                borderRadius='0px'
                                                sx={{
                                                    textTransform: 'none',
                                                    color: '#000000',
                                                    '&:hover': {
                                                        backgroundColor: 'white',
                                                        opacity: [1, 1, 1]
                                                    }
                                                }}
                                                direction='row'
                                                textAlign='start'
                                                mt='10px'>
                                                <Grid item xs={2}>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Typography sx={{ fontSize: '15px' }}>Historial de Compras</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <ShoppingCartIcon></ShoppingCartIcon>
                                                </Grid>
                                            </Grid>
                                            <Grid container
                                                height='45px'
                                                component={Button}
                                                onClick={handleClose}
                                                borderRadius='0px'
                                                sx={{
                                                    textTransform: 'none',
                                                    color: '#000000',
                                                    '&:hover': {
                                                        backgroundColor: 'white',
                                                        opacity: [1, 1, 1]
                                                    }
                                                }}
                                                direction='row'
                                                textAlign='start'
                                                mt='10px'>
                                                <Grid item xs={2}>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Typography sx={{ fontSize: '15px' }}>Información Personal</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <PersonIcon></PersonIcon>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container
                                        height='45px'
                                        width='280px'
                                        component={Button}
                                        onClick={handleCloseAvatar2}
                                        borderRadius='0px 0px 20px 20px'
                                        sx={{
                                            textTransform: 'none',
                                            color: '#000000',
                                            '&:hover': {
                                                backgroundColor: '#D9D9D9',
                                                opacity: [1, 1, 1]
                                            }
                                        }}
                                        direction='row'
                                        textAlign='start'
                                        mt='5px'>
                                        <Grid item xs={2}>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Typography color='#CD0227' sx={{ fontSize: '15px' }}>Cerrar Sesión</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Logout></Logout>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Menu>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}