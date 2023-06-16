import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, Tooltip, Typography } from "@mui/material"
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom"

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

    const handleClick2 = () => {
        navigate('/mis-mascotas')
    };

    const handleClick3 = () => {
        navigate('/mis-citas')
    };

    const handleClick4 = () => {
        navigate('/historial-de-compras')
    };

    const handleClickInicio = () => {
        navigate('/home')
    };

    const handleClickCitas = () => {
        navigate('/citas')
    };

    const handleClickProductos = () => {
        navigate('/shop')
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickInfo = () => {
        navigate('/cuenta')
    };


    return (
        <AppBar position="fixed"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                position:'fixed',
                zIndex:'1'
            }}>
            <Container maxWidth='xl'
                fixed >
                <Grid container
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(50px)',
                        borderRadius: '10px',
                        borderBottom: '2px solid #0265CD'
                    }}
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
                    <Grid
                        overflow='hidden'
                        item xs={2} sm={2} lg={1} md={2} xl={1}
                        onClick={handleClickInicio}
                        sx={{
                            cursor: 'pointer',
                            color: '#000000',
                            textTransform: 'none',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#0265CD',
                                color: '#ffffff'
                            }
                        }}>
                        <Typography ml='5px' mt='15px' textAlign='start' fontSize='20px'>Inicio</Typography>
                    </Grid>
                    <Grid
                        overflow='hidden'
                        item xs={2} sm={2} lg={1} md={2} xl={1}
                        onClick={handleClickCitas}
                        sx={{
                            cursor: 'pointer',
                            color: '#000000',
                            textTransform: 'none',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#0265CD',
                                color: '#ffffff'
                            }
                        }}>
                        <Typography ml='5px' mt='15px' textAlign='start' fontSize='20px'>Citas</Typography>
                    </Grid>
                    <Grid
                        overflow='hidden'
                        item xs={3} sm={2} lg={1} md={2} xl={1}
                        onClick={handleClickProductos}
                        sx={{
                            cursor: 'pointer',
                            color: '#000000',
                            textTransform: 'none',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#0265CD',
                                color: '#ffffff'
                            }
                        }}>
                        <Typography ml='5px' mt='15px' textAlign='start' fontSize='20px'>Productos</Typography>
                    </Grid>
                    <Grid item xs={0} sm={3} lg={5} md={1} xl={5}>
                    </Grid>
                    <Grid container
                        justifyContent='flex-end'
                        alignItems='center'
                        item xs={2} sm={1} lg={3} md={3} xl={3}>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Typography mr='15px'
                                    sx={{ fontWeight:'450', fontSize: '18px', display: { xs: 'none', sm: 'none', md: 'flex' } }}
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
                                        <Avatar sx={{ width: 51, height: 51 }}></Avatar>
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
                                        borderRadius: '20px',
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
                                height='393px'
                                justifyContent='center'
                                alignItems='center'>
                                    <Grid container
                                        direction='column'
                                        width='280px'
                                        height='340px'
                                        sx={{ borderRadius: '20px 20px 0px 0px', backgroundColor: '#D9D9D9' }}>
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
                                                onClick={handleClick2}
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
                                                onClick={handleClick3}
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
                                                onClick={handleClick4}
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
                                                onClick={handleClickInfo}
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