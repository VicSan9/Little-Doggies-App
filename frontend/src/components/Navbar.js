import * as React from 'react';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from "react-router-dom"

export default function Navbar() {

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick2 = () => {
        navigate('/registrarse')
    }

    const handleClickInicio = () => {
        navigate('/')
    };

    const handleClickCitas = () => {
        navigate('/login')
    };

    const handleClickProductos = () => {
        navigate('/productos')
    };

    const handleClick3 = () => {
        navigate('/login')
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
        navigate('/login')
    };

    const handleClose3 = () => {
        setAnchorEl(null);
        navigate('/registrarse')
    };

    return (
        <AppBar
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                position:'fixed',
                zIndex:'1'
            }}>
            <Container maxWidth='xl'
                fixed >
                <Grid container position='absulute'
                    sx={{
                        backgroundColor: '#ffffff',
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
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
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
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
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
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: '#ffffff'
                            }
                        }}>
                        <Typography ml='5px' mt='15px' textAlign='start' fontSize='20px'>Productos</Typography>
                    </Grid>
                    <Grid item xs={0} sm={2} lg={5} md={3} xl={6}>
                    </Grid>
                    <Grid item xs={6} sm={3} lg={3} md={4} xl={2} sx={{ display: { xs: 'none', lg: 'block' } }}>
                        <Grid container
                            spacing='2'
                            direction='row'
                            justifyContent='flex-end'
                            alignItems='center'>
                            <Grid item xs={4} sm={6} lg={5} md={4} xl={6}>
                                <Button 
                                    variant="outlined"
                                    size='small'
                                    onClick={handleClick2}
                                    sx={{
                                        color: '#0265CD',
                                        width: '110px',
                                        mt: '14px',
                                        borderColor: '#0265CD',
                                        borderRadius: '15px',
                                        textTransform: 'none'
                                    }}> Registrarse
                                </Button>
                            </Grid>
                            <Grid item xs={4} sm={3} lg={5} md={4} xl={6}>
                                <Button variant="outlined"
                                    size='small'
                                    onClick={handleClick3}
                                    sx={{
                                        color: '#0265CD',
                                        width: '110px',
                                        mt: '14px',
                                        borderColor: '#0265CD',
                                        borderRadius: '15px',
                                        textTransform: 'none'
                                    }}> Iniciar Sesión
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-end' alignItems='center' item xs={2} sm={2} lg={3} md={1} xl={3} sx={{ display: { lg: 'none', xl: 'none' } }}>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Más">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <MenuIcon sx={{ width: 32, height: 32 }}></MenuIcon>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
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
                            >
                                <MenuItem onClick={handleClose2}>
                                    <LoginIcon color='primary' sx={{ fontSize: '35px', marginRight: '10px', color: 'BABBBF' }} /> Iniciar Sesión
                                </MenuItem>
                                <MenuItem onClick={handleClose3}>
                                    <PersonAddIcon color='primary' sx={{ fontSize: '35px', marginRight: '10px', color: 'BABBBF' }} /> Registrarse
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}