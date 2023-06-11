import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PersonalInformation() {

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
        navigate('/editar-cuenta')
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <Container maxWidth='xl' fixed>
                <Grid
                    container
                    alignItems='center'
                    height='100vh'>
                    <Grid
                        container
                        alignItems='center'
                        height='100vh'>
                        <Grid
                            mt='5vh'
                            alignItems='center'
                            justifyContent='center'
                            height='82vh'
                            item xs={6} sm={6} lg={6} md={6} xl={6}
                            borderRight='2px solid #BABBBF'>
                            <Grid
                                container
                                alignItems='star'
                                justifyContent='start'>
                                <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Datos personales</Typography>
                                <Typography textAlign='start' ml='20px' mr='20px' mt='30px' mb='50px' variant="body1">
                                    Aquí puedes ver y modificar la información personal
                                    que has compartido con nosotros. Por favor, asegúrate
                                    de que los datos sean precisos y actualizados para que
                                    podamos ofrecerte el mejor servicio posible.
                                </Typography>
                                <Grid container justifyContent='center' alignItems='center'>
                                    <Grid container
                                        direction='column'
                                        border='1px solid #BABBBF'
                                        borderRadius='10px'
                                        width='600px'>
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
                                    width='600px'
                                    mt='20px'>
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
                                    width='600px'
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
                                sx={{ borderRadius: '20px', mt: '60px' }}
                                onClick={handleClick}>
                                Modificar información
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>

    )
}