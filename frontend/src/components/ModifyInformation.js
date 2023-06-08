import { Container, Grid, Typography, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./UserNavbar";

export default function ModifyInformation() {

    const [user, setUser] = useState([])

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

    const handleClick = () => {
        navigate('/cuenta')
    }

    useEffect(() => {
        loadUser();
    }, []);
    
    const handleChange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
      }

   
    return (
        <>
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
                            <Grid container direction='column'>
                                <Grid container direction='row' >
                                    <Grid item container direction='column' xs={6}>
                                        <TextField
                                            name="nombres"
                                            label="Nombres"
                                            variant="outlined"
                                            value={user.nombres}
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} >
                                        </TextField>
                                        <TextField
                                            name="telefono"
                                            type="tel"
                                            label="Número de telefono"
                                            variant="outlined"
                                            value={user.apellidos}
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                                        <TextField
                                            name="usuario"
                                            label="Usuario"
                                            variant="outlined"
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                                        <TextField
                                            name="direccion"
                                            label="Dirección"
                                            variant="outlined"
                                            onChange={handleChange}
                                            sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                                    </Grid>
                                    <Grid item container direction='column' xs={6}>
                                        <TextField
                                            name="apellidos"
                                            label="Apellidos"
                                            variant="outlined"
                                            onChange={handleChange}
                                            sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                                        <TextField
                                            name="correo"
                                            label="Correo Electrónico"
                                            type="email"
                                            variant="outlined"
                                            onChange={handleChange}
                                            sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                                        <TextField
                                            name="contraseña"
                                            type="password"
                                            label="Contraseña"
                                            variant="outlined"
                                            onChange={handleChange}
                                            sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                                    </Grid>
                                </Grid>
                                <Button variant="outlined"
                                    size='large'
                                    type="submit"
                                    onClik={handleClick}
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
            </Container >
        </>
    )
}