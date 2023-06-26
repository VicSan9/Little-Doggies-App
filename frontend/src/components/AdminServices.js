import { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, IconButton, Card, Avatar, Divider } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';

export default function AdminServices() {

    const navigate = useNavigate()

    const [service, setService] = useState([])

    const [service1, setService1] = useState([])

    const handleNewService = () => {
        navigate('/admin/nuevoservicio');
    }
    const loadService = async () => {

        const id = sessionStorage.getItem('id')

        const body = { 'id': id }

        const res = await fetch(`http://localhost:4000/membersServices1`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        if (res.status === 404) {
            setService([])
            return
        }
        setService(data)
    }

    useEffect(() => {
        loadService();
    }, []);

    const handleClikService = async (e) => {

        const id = (e.currentTarget.id)

        if (id === '') {
            return
        }

        const res = await fetch(`http://localhost:4000/services/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setService1(data)
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
                                container
                                height='45vh'
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
                                {service.map((services) => (
                                    <Grid
                                        component={Card}
                                        key={services.svid}
                                        id={services.svid}
                                        onClick={handleClikService}
                                        container
                                        justifyContent='space-between'
                                        alignItems='center'
                                        width='98%'
                                        border='1px solid #0265CD'
                                        borderRadius='20px'
                                        mb='10px'
                                        paddingRight='8px'
                                        paddingLeft='8px'
                                        boxShadow='none'
                                        sx={{
                                            height: '60px',
                                            '&:hover': {
                                                backgroundColor: '#0265CD',
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            }
                                        }}>
                                        <Typography>{services.nombre}</Typography>
                                        <Grid>
                                            <IconButton sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                <EditIcon></EditIcon>
                                            </IconButton>
                                            <IconButton sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                <HighlightOffIcon></HighlightOffIcon>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
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
                            <Grid
                                container
                                direction='column'
                                width='600px'
                                mt='20px'>
                                < Typography ml='30px' mt='20px' fontWeight='bold' >
                                    Información del servicio
                                </Typography>
                                <Grid container direction='row' mt='20px' mb='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='30px' variant="body1" fontWeight='bold'> Nombre</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='30px' variant="body1">{service1.nombre}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' mt='20px' mb='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='30px' variant="body1" fontWeight='bold'>Categoria</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='30px' variant="body1">{service1.categoria}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' mt='20px' mb='20px'>
                                    <Grid container direction='column' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='30px' variant="body1" fontWeight='bold'> Descripción</Typography>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography ml='30px' variant="body1">{service1.descripcion}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ ml: '30px', width: '60vw' }}></Divider>
                                <Typography ml='30px' mt='10px' fontWeight='bold'>
                                    Encargados
                                </Typography>
                                <Grid container direction='row' mt='20px' mb='20px'>
                                    <Grid container direction='row' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Avatar sx={{ width: '100px', height: '100px', ml: '30px', mt: '10px' }}></Avatar>
                                    </Grid>
                                    <Grid container item xs={6} sm={6} lg={6} md={6} xl={6}>
                                        <Typography variant="body1" mt='50px'> nombres y apellidos</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}