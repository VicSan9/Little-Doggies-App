import React from 'react'
import EmployeeNavbar from './EmployeeNavbar';
import { Grid, Typography, Avatar, Button, Backdrop, IconButton, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";


export default function EmployeeProfile() {

    const [user, setUser] = useState({ usuario: '', contraseña: '', correo: '', nombres: '', apellidos: '', telefono: '', direccion: '', rol: '', foto: '', estado: '' })
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const loadUser = async () => {

        const id = sessionStorage.getItem('id')

        const res = await fetch(`http://localhost:4000/members/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        setUser(data)
    }

    useEffect(() => {
        loadUser();
    }, []);

    const handleClickModifyInformation = async () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        if (user.nombres.trim() === '' || user.apellidos.trim() === '' || user.correo.trim() === '' || user.telefono.trim() === '' || user.usuario.trim() === '' || user.contraseña.trim() === '' || user.direccion.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        const id = sessionStorage.getItem('id')

        await fetch(`http://localhost:4000/members/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { "content-Type": "application/json" }
        });

        window.location.reload();
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        setErrorMessage("");
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
                        onClick={handleClick}
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

    return (
        <>

            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open}>
                <Grid
                    container
                    alignItems='flex-start'
                    height='70vh'
                    width='70vw'
                    maxWidth='1200px'
                    maxHeight='600px'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='15px'
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
                        height='60vh'
                        maxHeight='550px'
                        alignItems='start'
                        component={'form'}
                        onSubmit={handleSubmit1}>
                        <Grid
                            container
                            width='100%'
                            justifyContent='center'
                            alignItems='center'
                            mb='10px'>
                            <Typography variant='h6'>Modifica tu información personal</Typography>
                        </Grid>
                        <Grid
                            container
                            width='100%'
                            justifyContent='start'
                            alignItems='start'
                            height='70%'>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="nombres"
                                        variant="outlined"
                                        label="Nombres"
                                        value={user.nombres}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="apellidos"
                                        variant="outlined"
                                        label="Apellidos"
                                        value={user.apellidos}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="telefono"
                                        type="tel"
                                        label="Celular"
                                        variant="outlined"
                                        value={user.telefono}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="correo"
                                        type="email"
                                        variant="outlined"
                                        label="Correo"
                                        value={user.correo}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="usuario"
                                        variant="outlined"
                                        label="Usuario"
                                        value={user.usuario}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="contraseña"
                                        type="password"
                                        variant="outlined"
                                        label="Contraseña"
                                        value={user.contraseña}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="direccion"
                                        variant="outlined"
                                        label="Dirección"
                                        value={user.direccion}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            paddingLeft='4vw'
                            paddingRight='4vw'
                            width='100%'
                            justifyContent='end'
                            mb='25px'>
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Backdrop>
            <Grid
                container
                direction='row'
                width='100vw'
                height='100vh'
                justifyContent='start'
                alignItems='center'>
                <EmployeeNavbar></EmployeeNavbar>
                <Grid
                    container
                    width='95vw'
                    height='90%'
                    maxHeight='930px'
                    direction='row'
                    justifyContent='start'
                    alignItems='center'>
                    <Grid
                        container
                        item xs={6} sm={6} lg={6} md={6} xl={6}
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
                                alignItems='start'
                                justifyContent='start'>
                                <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Datos personales</Typography>
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='start'>
                                    <Typography textAlign='start' ml='20px' mr='20px' mt='20px' mb='50px' variant="body1">
                                        Aquí puedes ver y modificar tu información personal
                                    </Typography>
                                </Grid>
                                <Grid container justifyContent='center' alignItems='center'>
                                    <Grid container
                                        direction='column'
                                        border='1px solid #BABBBF'
                                        borderRadius='10px'
                                        width='97%'>
                                        <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Información personal</Typography>
                                        <Grid container direction='row' mt='20px'>
                                            <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Typography ml='20px' variant="body1" fontWeight='bold'> Foto</Typography>
                                            </Grid>
                                            <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Avatar sx={{ width: '200px', height: '200px' }}></Avatar>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='row' mt='20px'>
                                            <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Typography ml='20px' variant="body1" fontWeight='bold'> Nombres</Typography>
                                            </Grid>
                                            <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Typography ml='20px' variant="body1"> {user.nombres}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='row' mt='20px' mb='20px'>
                                            <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Typography ml='20px' variant="body1" fontWeight='bold'> Apellidos</Typography>
                                            </Grid>
                                            <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Typography ml='20px' variant="body1"> {user.apellidos}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        mt='5vh'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='82vh'
                        item xs={6} sm={6} lg={6} md={6} xl={6}>
                        <Grid
                            container
                            alignItems='start'
                            justifyContent='center'
                            textAlign='start'>
                            <Grid container
                                direction='column'
                                border='1px solid #BABBBF'
                                borderRadius='10px'
                                width='93%'
                                overflow='hidden'>
                                <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Información de Contacto</Typography>
                                <Grid container direction='row' mt='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1" fontWeight='bold'> Correo electrónico</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1"> {user.correo}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' mt='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1" fontWeight='bold'> Número de telefono</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1"> {user.telefono}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' mt='20px' mb='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1" fontWeight='bold'> Dirección</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1"> {user.direccion}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container
                                direction='column'
                                border='1px solid #BABBBF'
                                borderRadius='10px'
                                width='93%'
                                mt='40px'>
                                <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Información de la Cuenta</Typography>
                                <Grid container direction='row' mt='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1" fontWeight='bold'>Nombre de usuario</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1">{user.usuario}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' mt='20px' mb='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1" fontWeight='bold'>Contraseña</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='20px' variant="body1">{user.contraseña}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            variant="outlined"
                            onClick={handleClickModifyInformation}
                            sx={{ borderRadius: '20px', mt: '60px' }}>
                            Modificar información
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}