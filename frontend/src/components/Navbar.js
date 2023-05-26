import * as React from 'react';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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
        <AppBar position="fixed"
            sx={{
                backgroundColor: '#ffffff',
                boxShadow:'none'  
            }}>
            <Container  maxWidth='xl'
                        fixed >
                <Grid container
                    sx={{
                        borderRadius: '10px',
                        borderBottom: '2px solid #0265CD'
                    }}
                    spacing='2'
                    direction='row'
                    justifyContent='flex-start'
                    alignItems="strech"
                    textAlign='center'>
                    <Grid item xs='3' sm='2' lg='1' md='2' xl='1'>
                        <img src={process.env.PUBLIC_URL + "/LDLogo.png"}
                            alt="logo"
                            height='57vh'>
                        </img>
                    </Grid>
                    <Grid item xs='2' sm='2' lg='1' md='2' xl='1'
                        sx={{
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]
                            }
                        }}>
                        <Box mt='14px'>
                            <Link href="#"
                                to='/'
                                style={{
                                    textDecoration: "none",
                                    fontSize: '20px',
                                    color: "#000000",
                                    fontWeight: "inherit"
                                }}> Inicio
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs='2' sm='2' lg='1' md='2' xl='1'
                        sx={{
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]
                            }
                        }}>
                        <Box mt='14px'>
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
                    <Grid item xs='4' sm='2' lg='1' md='2' xl='1'
                        sx={{
                            backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]
                            }
                        }}>
                        <Box mt='14px'>
                            <Link href="#"
                                to='/productos'
                                style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                    fontSize: '20px',
                                    fontWeight: "inherit"
                                }}> Productos
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs='0' sm='2' lg='5' md='3' xl='6'>
                    </Grid>
                    {/* Dejar de mostar botones de inicio de sesión y login */}
                    <Grid item xs='1' sm='3' lg='3' md='4' xl='2' sx={{display: { xs: 'none', lg: 'block' }}}>
                        <Grid container
                            spacing='2'
                            direction='row'
                            justifyContent='flex-end'
                            alignItems='center'>
                            <Grid item xs='4' sm='6' lg='5' md='4' xl='6'>
                                <Button variant="outlined"
                                    size='small'
                                    sx={{
                                        color: '#0265CD',
                                        width: '110px',
                                        mt: '14px',
                                        borderColor: '#0265CD',
                                        borderRadius: '15px',
                                        textTransform: 'none'
                                    }}>
                                    <Link href="#"
                                        to='/registrarse'
                                        style={{
                                            textDecoration: "none",
                                            fontSize: '13px',
                                            color: "#0265CD"
                                        }}> Registrarse
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item xs='4' sm='3' lg='5' md='4' xl='6'>
                                <Button variant="outlined"
                                    size='small'
                                    sx={{
                                        color: '#0265CD',
                                        width: '110px',
                                        mt: '14px',
                                        borderColor: '#0265CD',
                                        borderRadius: '15px',
                                        textTransform: 'none'
                                    }}>
                                    <Link href="#"
                                        to='/login'
                                        style={{
                                            textDecoration: "none",
                                            color: "#0265CD",
                                            fontSize: '13px'
                                        }}> Iniciar Sesión
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Menu de login y registrarse */}
                    <Grid item xs='1' sm='2' lg='3' md='1' xl='3' sx={{ display: { lg: 'none', xl: 'none' } }}>
                        <React.Fragment>
                            <Box mt='9px' sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Más">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <MenuIcon sx={{ width: 32, height: 32 }}>M</MenuIcon>
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
                                    <LoginIcon color='primary' sx={{fontSize:'35px', marginRight:'10px', color:'BABBBF'}} /> Iniciar Sesión
                                </MenuItem>
                                <MenuItem onClick={handleClose3}>
                                    <CheckCircleOutlineIcon color='primary' sx={{fontSize:'35px', marginRight:'10px', color:'BABBBF'}} /> Registrarse
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}