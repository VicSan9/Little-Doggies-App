import * as React from 'react';
import { AppBar, Avatar, Box, Container, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material"
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

    const [isVisible, setIsVisible] = React.useState(true)

    const isAuth = () => {
        const auth = sessionStorage.getItem('auth')
        console.log(auth)
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
        sessionStorage.setItem('auth', 'no')
        navigate('/')
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
                backgroundColor: '#ffffff',
                boxShadow: 'none'
            }}>
            <Container maxWidth='xl'
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
                    <Grid item xs={1} sm={3} lg={7} md={3} xl={7}>
                    </Grid>
                    <Grid container
                        justifyContent='flex-end'
                        alignItems='center'
                        item xs={1} sm={1} lg={1} md={1} xl={1}>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
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
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleCloseAvatar2}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}