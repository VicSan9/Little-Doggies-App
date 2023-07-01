import { useState, useEffect } from 'react'
import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, Divider, Avatar, TextField, Button, IconButton, Box, Backdrop, Card, CardContent, Chip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AdminStaff() {

    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false);
    const [isHidden1, setIsHidden1] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])
    const [services, setServices] = useState([])
    const [info, setInfo] = useState([])
    const [service2, setServices2] = useState([])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
    };

    const handleClicNewPersonal = async () => {
        setOpen(true)
    }

    const handleSubmit1 = async (e) => {

        if (info.nombres.trim() === '' || info.apellidos.trim() === '' || info.correo.trim() === '' || info.telefono.trim() === '' || info.usuario.trim() === '' || info.contraseña.trim() === '' || info.direccion.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        const body2 = {

            'nombres': info.nombres,
            'apellidos': info.apellidos,
            'correo': info.correo,
            'telefono': info.telefono,
            'usuario': info.usuario,
            'contraseña': info.contraseña,
            'direccion': info.direccion,
            'servicio': service2.nombre,
            'estado': 'Activo'
        }

        await fetch(`http://localhost:4000/members/${member.mbid}`, {
            method: 'PUT',
            body: JSON.stringify(body2),
            headers: { "content-Type": "application/json" }
        });

        setAdvertenceMenssage("");
    }

    const handleClickEdit = async (e) => {
        setOpen1(true)

        const mbid = member.mbid

        const res = await fetch(`http://localhost:4000/members/${mbid}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        setInfo(data)

    }

    const handleChange2 = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
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

        const res3 = await fetch(`http://localhost:4000/membersServices`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data3 = await res3.json()

        const ids = []

        for (let i = 0; i < data3.length; i++) {
            if (data3[i].mbid === data2.mbid) {
                ids.push(data3[i].svid)
            }
        }

        const services = []

        for (let i = 0; i < ids.length; i++) {
            const res4 = await fetch(`http://localhost:4000/services/${ids[i]}`, {
                method: 'GET',
                headers: { "content-Type": "application/json" }
            })

            const data4 = await res4.json();

            services.push(data4)
        }

        setServices(services)

        console.log(services)
    }

    const handleChange1 = (event) => {
        const {
            target: { value },
        } = event;
        setServices2(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onClick = async () => {
        if (sessionStorage.getItem('id') === null) {
            return
        }
        if (service2.length === 0) {
            setErrorMessage('Por favor selecciona los servicios')
            return
        }

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
                    height='100vh'
                    width='30vw'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='5px'
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
                    <Grid component={'form'} onSubmit={handleSubmit1}
                        container
                        direction='column'
                        height='90vh'
                        alignItems='center'
                        justifyContent='center'
                        item xs={12} sm={12} lg={12} md={12} xl={12}>
                        <Typography textAlign='start' variant="h6" fontWeight='bold'>Edita información de un empleado</Typography>
                        <TextField
                            name="nombres"
                            variant="outlined"
                            value={info.nombres}
                            onChange={handleChange2}
                            sx={{ ml: '10px', mr: '20px', width: '80%', mt: '15px' }} />
                        <TextField
                            name="apellidos"
                            variant="outlined"
                            value={info.apellidos}
                            onChange={handleChange2}
                            sx={{ ml: '10px', mr: '20px', width: '80%', mt: '15px' }} />
                        <TextField
                            name="correo"
                            variant="outlined"
                            value={info.correo}
                            onChange={handleChange2}
                            sx={{ ml: '10px', mr: '20px', width: '80%', mt: '15px' }} />
                        <TextField
                            name="telefono"
                            variant="outlined"
                            value={info.telefono}
                            onChange={handleChange2}
                            sx={{ ml: '10px', mr: '20px', width: '80%', mt: '15px' }} />
                        <TextField
                            name="usuario"
                            variant="outlined"
                            value={info.usuario}
                            onChange={handleChange2}
                            sx={{ ml: '10px', mr: '20px', width: '80%', mt: '15px' }} />
                        <TextField
                            name="contraseña"
                            variant="outlined"
                            value={info.contraseña}
                            onChange={handleChange2}
                            sx={{ ml: '10px', mr: '20px', width: '80%', mt: '15px' }} />
                        <TextField
                            name="direccion"
                            variant="outlined"
                            value={info.direccion}
                            onChange={handleChange2}
                            sx={{ ml: '10px', mr: '20px', width: '80%', mt: '15px' }} />
                        <FormControl sx={{ ml: '25px', mr: '25px', width: '80%', mt: '15px' }}>
                            <InputLabel id="demo-simple-select-label">Servicios</InputLabel>
                            <Select
                                multiple
                                name="servicios"
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select2"
                                value={service2}
                                label="Encargado"
                                onChange={handleChange1}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}>
                                {services.map((servicios) => (
                                    <MenuItem
                                        key={servicios.svid}
                                        value={servicios.nombre}>
                                        {servicios.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            type='submit'
                            variant="contained"
                            onClick={onClick}
                            sx={{ mt: '10px', borderRadius: '50px', width: '130px' }}>Guardar
                        </Button>
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
                                {services.map(servicio => (
                                    <Grid
                                        key={servicio.mbid}
                                        container
                                        direction='row'
                                        ml='15px' mt='8px'>
                                        <Card sx={{ backgroundColor: '#A9A9A9', width: '300px', height: '50px' }}>
                                            <CardContent>
                                                <Typography variant='body1' fontWeight='500'>
                                                    {servicio.nombre}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}