import { useState, useEffect } from 'react'
import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, Divider, Avatar, TextField, Button, IconButton, Box, Backdrop, Card } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function AdminStaff() {

    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false);
    const [isHidden1, setIsHidden1] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
    };

    const handleClicNewPersonal = async () => {
        setOpen(true)
    }

    const handleClickEdit = async (e) => {
        setOpen1(true)
    }

    const handleClickDelete = e => {
        setAdvertenceMenssage('¿Estás seguro que quieres eliminar este servicio?')
    }

    const handleClickAV2Can = () => {
        setAdvertenceMenssage("");
    }

    const handleClickAVConf = async () => {

        setAdvertenceMenssage("");

        //window.location.reload();
    }

    const handleClick3 = () => {
        setErrorMessage("");
    }

    const colorFun = (id) => {
        if (Number(id) === member.mbid) {
            return '#0265CD'
        } else {
            return 'transparent'
        }
    }

    const colorFun2 = (id) => {
        if (Number(id) === member.mbid) {
            return '#FFFFFF'
        } else {
            return '#000000'
        }
    }



    const ErrorComponent = ({ errorMessage }) => {
        return (
            <Grid container
                zIndex='2'
                width='100vw'
                height='100vh'
                position='absolute'
                alignItems='center'
                textAlign='center'
                justifyContent='center'
                sx={{ backgroundColor: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', }}>
                <Box
                    width='300px'
                    height='200px'
                    borderRadius='20px'
                    border='1px solid #BABBBF'
                    sx={{ backgroundColor: '#ffffff' }}>
                    <Typography color='#CD0227' mt='20px' variant="h5" fontWeight='bold'>Error</Typography>
                    <p>{errorMessage}</p>
                    <Button variant="outlined"
                        size='medium'
                        onClick={handleClick3}
                        sx={{
                            color: '#0265CD',
                            mt: '30px',
                            borderColor: '#0265CD',
                            borderRadius: '50px',
                            textTransform: 'none'
                        }}> Volver
                    </Button>
                </Box>
            </Grid>
        );
    };

    const AdvertenceComponent = ({ advertenceMenssage }) => {
        return (
            <Grid container
                zIndex='2'
                width='100vw'
                height='100vh'
                position='absolute'
                alignItems='center'
                textAlign='center'
                justifyContent='center'
                sx={{ backgroundColor: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', }}>
                <Box
                    width='300px'
                    height='200px'
                    borderRadius='20px'
                    border='1px solid #BABBBF'
                    sx={{ backgroundColor: '#ffffff' }}>
                    <Typography color='#000000' mt='20px' variant="h5" fontWeight='bold'>Advertencia</Typography>
                    <p>{advertenceMenssage}</p>
                    <Button variant="outlined"
                        size='medium'
                        onClick={handleClickAV2Can}
                        sx={{
                            color: '#0265CD',
                            width: '80px',
                            mt: '20px',
                            borderColor: '#0265CD',
                            borderRadius: '50px',
                            textTransform: 'none'
                        }}> Volver
                    </Button>
                    <Button variant="outlined"
                        size='medium'
                        onClick={handleClickAVConf}
                        sx={{
                            width: '80px',
                            color: '#0265CD',
                            mt: '20px',
                            ml: '20px',
                            borderColor: '#0265CD',
                            borderRadius: '50px',
                            textTransform: 'none'
                        }}> Confirmar
                    </Button>
                </Box>
            </Grid>
        );
    };

    const loadMembers = async () => {

        const res = await fetch(`http://localhost:4000/members`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setMembers(data)
    }

    useEffect(() => {
        loadMembers();
    }, []);

    const handleClickPersonal = async (e) => {

        const id = Number(e.currentTarget.id)

        setIsHidden1(true)

        const res2 = await fetch(`http://localhost:4000/members/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data2 = await res2.json()

        setMember(data2)



    }


    return (

        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open1}>
                <Grid
                    container
                    alignItems='start'
                    height='75vh'
                    width='60vw'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='25px'
                    sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Grid
                        container
                        direction='row'
                        width='100%'
                        justifyContent='end'>
                        <IconButton sx={{ mt: '10px', width: 25, height: 25, '&:hover': { color: '#CD0227', bgcolor: '#FFFFFF' } }} onClick={handleClose}>
                            <Typography fontWeight='bold'>X</Typography>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        direction='column'
                        height='70vh'
                        alignItems='center'
                        justifyContent='center'
                        item xs={12} sm={12} lg={12} md={12} xl={12}>
                        <Typography textAlign='start' variant="h6" fontWeight='bold' mr='25px'>Edita información de un empleado</Typography>
                        <Grid
                            container
                            ml='20px'
                            mr='20px'
                            width='95%'
                            height='100%'
                            justifyContent='center'
                            overflow='scroll'
                            display='block'
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                    height: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    },
                                },
                                '&::-webkit-scrollbar: horizontal': {
                                    display: 'none',
                                },
                            }}>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        height='75vh'>
                    </Grid>
                </Grid >
            </Backdrop >
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open}>
                <Grid
                    container
                    alignItems='start'
                    height='75vh'
                    width='60vw'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='25px'
                    sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Grid
                        container
                        direction='row'
                        width='100%'
                        justifyContent='end'>
                        <IconButton sx={{ mt: '10px', width: 25, height: 25, '&:hover': { color: '#CD0227', bgcolor: '#FFFFFF' } }} onClick={handleClose}>
                            <Typography fontWeight='bold'>X</Typography>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        direction='column'
                        height='70vh'
                        alignItems='center'
                        justifyContent='center'
                        item xs={12} sm={12} lg={12} md={12} xl={12}>
                        <Typography textAlign='start' variant="h6" fontWeight='bold' mr='25px'>Registra un nuevo empleado</Typography>
                        <Grid
                            container
                            ml='20px'
                            mr='20px'
                            width='95%'
                            height='100%'
                            justifyContent='center'
                            overflow='scroll'
                            display='block'
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                    height: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    },
                                },
                                '&::-webkit-scrollbar: horizontal': {
                                    display: 'none',
                                },
                            }}>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        height='75vh'>
                    </Grid>
                </Grid >
            </Backdrop >
            <Grid
                container
                direction='row'
                width='100vw'
                height='100vh'
                justifyContent='start'
                alignItems='center'>
                <AdminNavbar></AdminNavbar>
                <Grid
                    container
                    width='95.2vw'
                    height='90%'
                    maxHeight='930px'
                    direction='row'
                    justifyContent='start'
                    alignItems='center'>
                    <Grid
                        container
                        item xs={4} sm={4} lg={4} md={4} xl={4}
                        justifyContent='center'
                        alignItems='start'
                        height='100%'
                        sx={{ borderRight: '1px solid #BABBBF' }}>
                        <Grid
                            container
                            width='100%'
                            height='100%'
                            paddingRight='8px'
                            paddingLeft='16px'
                            direction='column'>
                            <Grid
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                width='100%'
                                mb='10px'
                            >
                                <Typography variant='h6' fontSize='bold'>Personal</Typography>
                                <IconButton onClick={handleClicNewPersonal} sx={{ mr: '8px', width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                    <Typography>+</Typography>
                                </IconButton>
                            </Grid>
                            <Grid
                                container
                                height='90%'
                                overflow='scroll'
                                alignItems='center'
                                justifyContent='start'
                                display='block'
                                direction='column'
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                        height: '8px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        },
                                    },
                                    '&::-webkit-scrollbar: horizontal': {
                                        display: 'none',
                                    },
                                }}>
                                {members.map((miembros) => (
                                    <Grid
                                        component={Card}
                                        key={miembros.mbid}
                                        id={miembros.mbid}
                                        onClick={handleClickPersonal}
                                        container
                                        justifyContent='space-between'
                                        alignItems='center'
                                        width='100%'
                                        border='1px solid #0265CD'
                                        borderRadius='20px'
                                        mb='10px'
                                        paddingRight='8px'
                                        paddingLeft='8px'
                                        boxShadow='none'
                                        bgcolor={colorFun(member.mbid)}
                                        color={colorFun2(member.mbid)}
                                        sx={{
                                            height: '60px',
                                            '&:hover': {
                                                backgroundColor: '#0265CD',
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            }
                                        }}>
                                        <Typography>{miembros.nombres + " " + miembros.apellidos}</Typography>
                                        <Grid>
                                            <IconButton id={miembros.mbid} onClick={handleClickEdit} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                <EditIcon></EditIcon>
                                            </IconButton>
                                            <IconButton onClick={handleClickDelete} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                <HighlightOffIcon></HighlightOffIcon>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        height='100%'
                        justifyContent='start'
                        alignItems='start'
                        direction='column'
                        paddingRight='16px'
                        paddingLeft='16px'
                        item xs={8} sm={8} lg={8} md={8} xl={8}>
                        <div hidden={isHidden1}>
                            <Typography mt='8px' mb='8px'>Seleciona uno de los miembros para ver su información.</Typography>
                        </div>
                        <div hidden={!isHidden1} style={{ width: '100%' }}>
                            <Typography variant='h6'>Datos del trabajador</Typography>
                            <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información personal
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='center'>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombres</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Apellidos</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography mt='8px' variant='body1'>{member.nombres}</Typography>
                                        <Typography mt='8px' variant='body1'>{member.apellidos}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Avatar sx={{ width: 90, height: 90 }}></Avatar>
                                    </Grid>
                                </Grid>
                            </Typography>
                            <Divider></Divider>
                            <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información de contacto
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='center'>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Correo Electronico</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Número de telefono</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Dirección</Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                        <Typography mt='8px' variant='body1'>{member.correo}</Typography>
                                        <Typography mt='8px' variant='body1'>{member.telefono}</Typography>
                                        <Typography mt='8px' variant='body1'>{member.direccion}</Typography>
                                    </Grid>
                                </Grid>
                            </Typography>
                            <Divider></Divider>
                            <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información de la cuenta
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='center'>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombre de usuario</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Contraseña</Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                        <Typography mt='8px' variant='body1'>{member.usuario}</Typography>
                                        <Typography mt='8px' variant='body1'>{member.contraseña}</Typography>
                                    </Grid>
                                </Grid>
                            </Typography>
                            <Divider></Divider>
                            <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Servicios
                                <Grid
                                    container
                                    direction='row'
                                    alignItems='center'
                                    ml='15px' mt='8px'>
                                </Grid>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}