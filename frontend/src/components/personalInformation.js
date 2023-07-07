import { Avatar, Backdrop, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PersonalInformation() {

    const [user, setUser] = useState([])
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClickFoto = () => {
        setOpen2(true);
    }

    const handleClickFoto2 = () => {
        setOpen2(false);
    }

    const handleChangePic = async (event) => {

        const name = event.target.files[0].name

        const nameFile = name.split('.')

        const extencion = nameFile[nameFile.length - 1]

        const newName = user.foto.split('.')[0]

        const full = newName + '.' + extencion

        const body = {
            usuario: user.usuario,
            contraseña: user.contraseña,
            correo: user.correo,
            nombres: user.nombres,
            apellidos: user.apellidos,
            telefono: user.telefono,
            direccion: user.direccion,
            rol: user.rol,
            foto: full,
            estado: user.estado,
        }

        await fetch(`http://localhost:4000/members/${user.mbid}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const file = event.target.files[0];

        const modifiedFile = new File([file], full, { type: file.type });

        setSelectedFile(modifiedFile);
    };

    const handleUpload = () => {
        if (selectedFile === null) {
            setErrorMessage('Escoge una foto primero')
            return
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);

        fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error(error);
            });

        window.location.reload();
    };

    const handleCan = () => {
        setOpen1(false)
    }

    const handleClickEditFoto = () => {
        setOpen1(true);
    }

    const id = sessionStorage.getItem('id')

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

    const handleClick2 = () => {
        setErrorMessage("");
    }

    useEffect(() => {
        loadUser();
    }, []);

    const ErrorComponent = ({ errorMessage }) => {
        return (
            <Grid container
                zIndex='3'
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
                        onClick={handleClick2}
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
                sx={{
                    backdropFilter: 'blur(5px)',
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }
                }}
                open={open2}
                onClick={handleClickFoto2}
            >
                <img
                    src={"http://localhost:4000/" + user.foto}
                    alt="foto"
                    width='30%'>
                </img>
            </Backdrop>
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 2 }}
                open={open1}>
                <Grid
                    container
                    width='40vw'
                    height='20vh'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    justifyContent='center'
                    alignItems='start'
                    paddingRight='23px'
                    paddingLeft='23px'>
                    <Grid
                        container
                        height='70%'
                        width='100%'
                        justifyContent='center'>
                        <TextField
                            type="file"
                            onChange={handleChangePic}
                            sx={{ mt: '10px' }}
                        />
                    </Grid>
                    <Grid
                        container
                        height='30%'
                        width='100%'
                        justifyContent='space-between'
                        direction='row'>
                        <Button onClick={handleCan}>Cancelar</Button>
                        <Button onClick={handleUpload}>Subir foto</Button>
                    </Grid>
                </Grid>
            </Backdrop>
            <Navbar></Navbar>
            <Container maxWidth='xl' fixed>
                <Grid
                    container
                    alignItems='center'
                    height='100vh'
                    sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                    <Grid
                        container
                        alignItems='center'
                        height='83vh'>
                        <Grid
                            alignItems='center'
                            justifyContent='center'
                            height='83vh'
                            item xs={6} sm={6} lg={6} md={6} xl={6}
                            borderRight='2px solid #BABBBF'
                            overflow='scroll'
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
                            <Grid
                                container
                                alignItems='star'
                                justifyContent='start'>
                                <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Datos personales</Typography>
                                <Typography textAlign='start' ml='20px' mr='20px' mt='20px' mb='30px' variant="body1">
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
                                        mb='10px'
                                        width='98%'>
                                        <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Información personal</Typography>
                                        <Grid container direction='row' mt='20px'>
                                            <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Typography ml='20px' variant="body1" fontWeight='bold'> Foto</Typography>
                                            </Grid>
                                            <Grid container justifyContent='center' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Avatar component={Button} onClick={handleClickFoto} src={`http://localhost:4000/` + id + '-client.jpg'} sx={{ width: '180px', height: '180px', p:'0px' }}></Avatar>
                                                <Button onClick={handleClickEditFoto}>Cambiar foto</Button>
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
                            height='83vh'
                            item xs={6} sm={6} lg={6} md={6} xl={6}
                            overflow='scroll'
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
                            <Grid
                                container
                                alignItems='start'
                                justifyContent='center'
                                textAlign='start'>
                                <Grid container
                                    direction='column'
                                    border='1px solid #BABBBF'
                                    borderRadius='10px'
                                    width='94%'
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
                                    width='94%'
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
                <Grid
                    container
                    alignItems='center'
                    height='75vh'
                    sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
                    <Grid
                        container
                        alignItems='center'
                        height='75vh'>
                        <Grid
                            mt='10vh'
                            alignItems='center'
                            justifyContent='center'
                            item xs={12} sm={6} lg={6} md={6} xl={6}>
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
                                            <Grid container justifyContent='center' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                                <Avatar component={Button} onClick={handleClickFoto} src={`http://localhost:4000/` + id + '-client.jpg'} sx={{ width: '180px', height: '180px' }}></Avatar>
                                                <Button onClick={handleClickEditFoto}>Cambiar foto</Button>
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
                            item xs={12} sm={6} lg={6} md={6} xl={6}>
                            <Grid
                                container
                                alignItems='start'
                                justifyContent='center'
                                textAlign='start'>
                                <Grid container
                                    direction='column'
                                    border='1px solid #BABBBF'
                                    borderRadius='10px'
                                    width='600px'>
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