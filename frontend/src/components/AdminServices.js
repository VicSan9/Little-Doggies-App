import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, IconButton, Box, Avatar, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';

export default function AdminServices() {

    const navigate = useNavigate()

    const handleNewService = () => {
        navigate('/admin/nuevoservicio');
    }

    return (
        <>
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
                    item xs={4} sm={4} lg={4} md={4} xl={4}
                    justifyContent='center'
                    alignItems='start'
                    height='90%'
                    sx={{ borderRight: '1px solid #BABBBF' }}>
                    <Grid
                        container
                        width='93%'
                        height='100%'
                        direction='column'>
                        <Grid
                            container
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            width='100%'
                            mb='10px'>
                            <Typography variant='h6' fontSize='bold'>Servicios</Typography>
                            <IconButton onClick={handleNewService} sx={{ width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                <Typography>+</Typography>
                            </IconButton>
                            <Grid
                                component={Box}
                                border='1px solid #BABBBF'
                                borderRadius='15px'
                                mt='15px'
                                mr='5px'
                                ml='5px'
                                width='95%'
                                sx={{
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: '#0265CD'
                                    },
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    textAlign: 'start',
                                }}>
                                <Grid
                                    container
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='flex-start'>
                                    <Grid container direction='column' item xs={2} sm={2} lg={2} md={2} xl={2}>
                                        <Typography ml='30px'>servicio:</Typography>
                                        <Grid
                                            container
                                            direction='row'
                                            item xs={2} sm={2} lg={2} md={2} xl={2}>
                                            <Tooltip title='Eliminar servicio'>
                                                <IconButton sx={{ mr: '5px', ":hover": { color: "white" } }}>
                                                    <HighlightOffIcon></HighlightOffIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Modificar Servicio'>
                                                <IconButton sx={{ mr: '5px', ":hover": { color: "white" } }}>
                                                    <EditIcon></EditIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            mt='5vh'
                            alignItems='start'
                            height='82vh'
                            direction='column'
                            item xs={10} sm={10} lg={10} md={10} xl={10}>
                            <Grid
                                container
                                alignItems='start'
                                justifyContent='center'
                                direction='column'>
                                <Typography ml='30px' mt='0.5px' fontWeight='bold'>
                                    Desparacitación
                                </Typography>
                                <Typography ml='30px' mt='20px' fontWeight='h5'>
                                    Información del servicio
                                </Typography>
                                <Grid container
                                    direction='column'
                                    width='600px'
                                    mt='20px'>
                                    <Grid container direction='row' mt='20px' mb='20px'>
                                        <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Typography ml='30px' variant="body1" fontWeight='bold'> Nombre</Typography>
                                        </Grid>
                                        <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Typography ml='30px' variant="body1"> nombre</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='row' mt='20px' mb='20px'>
                                        <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Typography ml='30px' variant="body1" fontWeight='bold'>Categoria</Typography>
                                        </Grid>
                                        <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Typography ml='30px' variant="body1"> categoria</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='row' mt='20px' mb='20px'>
                                        <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Typography ml='30px' variant="body1" fontWeight='bold'> Descripción</Typography>
                                        </Grid>
                                        <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Typography ml='30px' variant="body1"> descripcion</Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography ml='30px' mt='10px' fontWeight='bold'>
                                        Encargados
                                    </Typography>
                                    <Grid container direction='row' mt='20px' mb='20px'>
                                        <Grid container direction='row' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Avatar sx={{ width: '100px', height: '100px', ml: '30px', mt: '10px' }}></Avatar>
                                        </Grid>
                                        <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                            <Typography variant="body1" mt='50px'> nombre del encargado</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        </>
    )
}