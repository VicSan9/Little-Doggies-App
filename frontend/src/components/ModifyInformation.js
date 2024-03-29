import { Container, Grid, Typography, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./UserNavbar";

export default function ModifyInformation() {

    const [user, setUser] = useState([])

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate()

    const loadUser = async () => {

        const id = sessionStorage.getItem('id')

        const res = await fetch(`http://localhost:4000/clients/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        setUser(data)
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        loadUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.correo.trim() === '' || user.direccion.trim() === '' || user.telefono.trim() === '' || user.usuario.trim() === '' || user.contraseña.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        const id = sessionStorage.getItem('id')

        const res = await fetch(`http://localhost:4000/clients/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { "content-Type": "application/json" }
        });

        const data = await res.json()

        if (!data.message) {
            sessionStorage.setItem('usuario', data.usuario)
            sessionStorage.setItem('contraseña', data.contraseña)
            sessionStorage.setItem('correo', data.correo)
            navigate("/cuenta")
            return
        }

        if (data.message.code === "22P02") {
            setErrorMessage('Debe de ingresar un número en telefono')
            return
        }

        if (data.message.constraint === "clientes_usuario_key") {
            setErrorMessage('Nombre de usuario ya registrado')
            return
        }

        if (data.message.constraint === "clientes_correo_key") {
            setErrorMessage('Correo electrónico ya registrado')
            return
        }
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
            <Navbar></Navbar>
            <Container maxWidth='lg' fixed>
                <Box height='11vh'></Box>
                <Grid container
                    direction='row'
                    justifyContent='flex-start'
                    alignItems="center"
                    mb='15px'
                    width='auto'
                    height='700px'
                    maxHeight='650px'
                    minHeight='550px'
                    sx={{
                        overflow: 'hidden',
                        border: '1px solid #BABBBF',
                        borderRadius: '20px',
                        display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
                    }}>
                    <Grid item xs={5} sm={5} lg={5} md={5} xl={5}
                        sx={{
                            overflow: 'hidden',
                        }}
                        height='700px'
                        minHeight='550px'
                        textAlign='center'>
                        <img
                            src={process.env.PUBLIC_URL + "/modificar.jpg"}
                            alt="collage"
                            style={{ height: '100vh', minHeight: '640px', maxHeight: '750px' }}>
                        </img>
                    </Grid>
                    <Grid item xs={7} sm={7} lg={7} md={7} xl={7}
                        height='700px'
                        minHeight='550px'>
                        <Grid container
                            direction='column'>
                            <Typography textAlign='center'
                                mt='30px'
                                variant='h5'
                                fontWeight='bold'>
                                Modifica tu información
                            </Typography>
                            <Typography textAlign='center'
                                mt='20px'
                                variant='body1'>
                                Modifica los datos que quieres actualizar
                            </Typography>
                            <Grid container direction='column' component={'form'} onSubmit={handleSubmit}>
                                <Grid container direction='row' >
                                    <Grid item container direction='column' xs={6} >
                                        <TextField
                                            name="nombres"
                                            variant="outlined"
                                            value={user.nombres}
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} >
                                        </TextField>
                                        <TextField
                                            name="telefono"
                                            type="tel"
                                            variant="outlined"
                                            value={user.telefono}
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                                        <TextField
                                            name="usuario"
                                            variant="outlined"
                                            value={user.usuario}
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                                        <TextField
                                            name="direccion"
                                            variant="outlined"
                                            value={user.direccion}
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                                    </Grid>
                                    <Grid item container direction='column' xs={6}>
                                        <TextField
                                            name="apellidos"
                                            variant="outlined"
                                            value={user.apellidos}
                                            onChange={handleChange}
                                            sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                                        <TextField
                                            name="correo"
                                            type="email"
                                            variant="outlined"
                                            value={user.correo}
                                            onChange={handleChange}
                                            sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                                        <TextField
                                            name="contraseña"
                                            type="password"
                                            variant="outlined"
                                            value={user.contraseña}
                                            onChange={handleChange}
                                            sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                                    </Grid>
                                </Grid>
                                <Button variant="outlined"
                                    size='large'
                                    type="submit"
                                    sx={{
                                        color: '#0265CD',
                                        ml: '150px',
                                        mr: '150px',
                                        mt: '40px',
                                        borderColor: '#0265CD',
                                        borderRadius: '50px',
                                        textTransform: 'none'
                                    }}> Guardar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container
                    minWidth='280px'
                    mb='50px'
                    sx={{ display: { xl: 'none', lg: 'none' } }}
                    direction='column'>
                    <Typography textAlign='center'
                        mt='10px'
                        variant='h5'
                        fontWeight='bold'>
                        Modifica tu información
                    </Typography>
                    <Typography textAlign='center'
                        mt='20px'
                        variant='body1'>
                        Modifica los datos que quieres actualizar
                    </Typography>
                    <Grid container direction='column' component={'form'} onSubmit={handleSubmit}>
                        <TextField
                            name="nombres"
                            variant="outlined"
                            value={user.nombres}
                            onChange={handleChange}
                            sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
                        <TextField
                            name="apellidos"
                            variant="outlined"
                            value={user.apellidos}
                            onChange={handleChange}
                            sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
                        <TextField
                            name="correo"
                            variant="outlined"
                            value={user.correo}
                            onChange={handleChange}
                            sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
                        <TextField
                            name="telefono"
                            variant="outlined"
                            value={user.telefono}
                            onChange={handleChange}
                            sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
                        <TextField
                            name="usuario"
                            variant="outlined"
                            value={user.usuario}
                            onChange={handleChange}
                            sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
                        <TextField
                            name="contraseña"
                            type="password"
                            variant="outlined"
                            value={user.contraseña}
                            onChange={handleChange}
                            sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
                        <TextField
                            name="direccion"
                            variant="outlined"
                            value={user.direccion}
                            onChange={handleChange}
                            sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
                        <Button variant="outlined"
                            size='large'
                            type="submit"
                            sx={{
                                color: '#0265CD',
                                ml: '60px',
                                mr: '60px',
                                mt: '40px',
                                borderColor: '#0265CD',
                                borderRadius: '50px',
                                textTransform: 'none'
                            }}> Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}