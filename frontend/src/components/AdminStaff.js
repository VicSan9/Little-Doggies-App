import { useState, useEffect } from 'react'
import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, Divider, Avatar, TextField, Button, IconButton, Box, Backdrop, Card, CardContent, Chip, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AdminStaff() {

    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [foto, setFoto] = useState('');
    const [isHidden1, setIsHidden1] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");
    const [members, setMembers] = useState([])
    const [member, setMember] = useState({ usuario: '', contraseña: '', correo: '', nombres: '', apellidos: '', telefono: '', direccion: '', rol: 'Trabajador', foto: '', estado: 'Activo' })
    const [services, setServices] = useState([])
    const [service2, setServices2] = useState([])
    const [allServices, setallServices] = useState([])
    const [create, setCreate] = useState({ usuario: '', contraseña: '', correo: '', nombres: '', apellidos: '', telefono: '', direccion: '', rol: 'Trabajador', foto: '', estado: 'Activo' })

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

    const handleClickFoto = () => {
        setOpen2(true);
    }

    const handleClickFoto2 = () => {
        setOpen2(false);
    }

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
    };

    const handleClicNewPersonal = async () => {
        setOpen(true)
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        if (member.nombres.trim() === '' || member.apellidos.trim() === '' || member.correo.trim() === '' || member.telefono.trim() === '' || member.usuario.trim() === '' || member.contraseña.trim() === '' || member.direccion.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        if (service2.length === 0) {
            setErrorMessage('Por favor selecciona los servicios')
            return
        }

        const body1 = {
            'usuario': member.usuario + 'Eliminado' + member.mbid,
            'contraseña': member.contraseña,
            'correo': member.correo + 'Eliminado' + member.mbid,
            'nombres': member.nombres,
            'apellidos': member.apellidos,
            'telefono': member.telefono,
            'direccion': member.direccion,
            'rol': 'Trabajador',
            'foto': member.foto,
            'estado': 'Eliminado'
        }

        const res5 = await fetch(`http://localhost:4000/members/${member.mbid}`, {
            method: 'PUT',
            body: JSON.stringify(body1),
            headers: { "content-Type": "application/json" }
        });

        const data5 = await res5.json();

        console.log(data5)

        const body2 = {
            'usuario': member.usuario,
            'contraseña': member.contraseña,
            'correo': member.correo,
            'nombres': member.nombres,
            'apellidos': member.apellidos,
            'telefono': member.telefono,
            'direccion': member.direccion,
            'rol': 'Trabajador',
            'foto': member.foto,
            'estado': 'Activo'
        }

        const res3 = await fetch('http://localhost:4000/members', {
            method: 'POST',
            body: JSON.stringify(body2),
            headers: { "content-Type": "application/json" }
        })

        const data3 = await res3.json();

        console.log(data3)

        var id = []

        for (let i = 0; i < service2.length; i++) {
            for (let j = 0; j < allServices.length; j++) {
                if (service2[i] === allServices[j].nombre) {
                    id.push(allServices[j].svid)
                }
            }
        }

        for (let i = 0; i < id.length; i++) {
            var body4 = {
                'svid': id[i],
                'mbid': data3.mbid,
            }

            const res = await fetch('http://localhost:4000/membersServices', {
                method: 'POST',
                body: JSON.stringify(body4),
                headers: { "content-Type": "application/json" }
            })

            const data = await res.json()

            console.log(data)
        }

        window.location.reload();
    }

    const handleClickEdit = async (e) => {
        setOpen1(true)
    }

    const handleChange = e => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        })
    }

    const handleClickDelete = e => {
        setAdvertenceMenssage('¿Estás seguro que quieres eliminar este trabajador?')
    }

    const handleClickAV2Can = () => {
        setAdvertenceMenssage("");
    }

    const handleClickAVConf = async () => {
        const body1 = {
            'usuario': member.usuario,
            'contraseña': member.contraseña,
            'correo': member.correo,
            'nombres': member.nombres,
            'apellidos': member.apellidos,
            'telefono': member.telefono,
            'direccion': member.direccion,
            'rol': 'Trabajador',
            'foto': member.foto,
            'estado': 'Eliminado'
        }

        await fetch(`http://localhost:4000/members/${member.mbid}`, {
            method: 'PUT',
            body: JSON.stringify(body1),
            headers: { "content-Type": "application/json" }
        });

        window.location.reload();
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

    const loadMembers = async () => {

        const res = await fetch(`http://localhost:4000/members2`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setMembers(data)

        const res2 = await fetch(`http://localhost:4000/services`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data2 = await res2.json()

        setallServices(data2)
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
        setFoto(data2.foto)

        const res3 = await fetch(`http://localhost:4000/services2`, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (create.nombres.trim() === '' || create.apellidos.trim() === '' || create.correo.trim() === '' || create.telefono.trim() === '' || create.usuario.trim() === '' || create.contraseña.trim() === '' || create.direccion.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        if (service2.length === 0) {
            setErrorMessage('Por favor selecciona los servicios')
            return
        }

        const res3 = await fetch('http://localhost:4000/members', {
            method: 'POST',
            body: JSON.stringify(create),
            headers: { "content-Type": "application/json" }
        })

        const data3 = await res3.json();

        const body1 = {
            'usuario': data3.usuario,
            'contraseña': data3.contraseña,
            'correo': data3.correo,
            'nombres': data3.nombres,
            'apellidos': data3.apellidos,
            'telefono': data3.telefono,
            'direccion': data3.direccion,
            'rol': 'Trabajador',
            'foto': data3.mbid+'-member.jpg',
            'estado': data3.estado
        }

        await fetch(`http://localhost:4000/members/${data3.mbid}`, {
            method: 'PUT',
            body: JSON.stringify(body1),
            headers: { "content-Type": "application/json" }
        });

        var id = []

        for (let i = 0; i < service2.length; i++) {
            for (let j = 0; j < allServices.length; j++) {
                if (service2[i] === allServices[j].nombre) {
                    id.push(allServices[j].svid)
                }
            }
        }

        for (let i = 0; i < id.length; i++) {
            var body4 = {
                'svid': id[i],
                'mbid': data3.mbid,
            }

            await fetch('http://localhost:4000/membersServices', {
                method: 'POST',
                body: JSON.stringify(body4),
                headers: { "content-Type": "application/json" }
            })
        }

        window.location.reload()
    }

    const handleChange2 = e => {
        setCreate({
            ...create,
            [e.target.name]: e.target.value
        })
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


    return (

        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
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
                    src={"http://localhost:4000/" + foto}
                    alt="foto"
                    width='30%'>
                </img>
            </Backdrop>
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open1}>
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
                            <Typography variant='h6'>Editar información de un trabajador</Typography>
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
                                width='100%'
                                mb='5px'>
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
                                        value={member.nombres}
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
                                        value={member.apellidos}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'
                                mb='5px'>
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
                                        value={member.telefono}
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
                                        label="Correo"
                                        variant="outlined"
                                        value={member.correo}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'
                                mb='5px'>
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
                                        value={member.usuario}
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
                                        label="Contraseña"
                                        variant="outlined"
                                        value={member.contraseña}
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
                                        value={member.direccion}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <FormControl sx={{ width: '100%' }}>
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
                                            {allServices.map((service) => (
                                                <MenuItem
                                                    key={service.svid}
                                                    value={service.nombre}>
                                                    {service.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            paddingLeft='4vw'
                            paddingRight='4vw'
                            width='100%'
                            justifyContent='end'
                            mt='30px'>
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Guardar</Button>
                        </Grid>
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
                        onSubmit={handleSubmit}>
                        <Grid
                            container
                            width='100%'
                            justifyContent='center'
                            alignItems='center'
                            mb='10px'>
                            <Typography variant='h6'>Registra un nuevo trabajador</Typography>
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
                                width='100%'
                                mb='5px'>
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
                                        value={create.nombres}
                                        onChange={handleChange2}>
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
                                        label="Apellidos"
                                        variant="outlined"
                                        value={create.apellidos}
                                        onChange={handleChange2}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'
                                mb='5px'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="telefono"
                                        label="Celular"
                                        type="tel"
                                        variant="outlined"
                                        value={create.telefono}
                                        onChange={handleChange2}>
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
                                        label="Correo Electronico"
                                        type="email"
                                        variant="outlined"
                                        value={create.correo}
                                        onChange={handleChange2}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'
                                mb='5px'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="usuario"
                                        label="Usuario"
                                        variant="outlined"
                                        value={create.usuario}
                                        onChange={handleChange2}>
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
                                        label="Contraseña"
                                        type="password"
                                        variant="outlined"
                                        value={create.contraseña}
                                        onChange={handleChange2}>
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
                                        label="Dirección"
                                        variant="outlined"
                                        value={create.direccion}
                                        onChange={handleChange2}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <FormControl sx={{ width: '100%' }}>
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
                                            {allServices.map((service) => (
                                                <MenuItem
                                                    key={service.svid}
                                                    value={service.nombre}>
                                                    {service.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            paddingLeft='4vw'
                            paddingRight='4vw'
                            width='100%'
                            justifyContent='end'
                            mt='30px'>
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Registrar</Button>
                        </Grid>
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
                    width='95vw'
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
                                <Tooltip title='Nuevo empleado'>
                                    <IconButton onClick={handleClicNewPersonal} sx={{ mr: '8px', width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                        <Typography>+</Typography>
                                    </IconButton>
                                </Tooltip>
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
                                        bgcolor={colorFun(miembros.mbid)}
                                        color={colorFun2(miembros.mbid)}
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
                                            <Tooltip title='Editar empleado'>
                                                <IconButton id={miembros.mbid} onClick={handleClickEdit} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                    <EditIcon></EditIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Eliminar empleado'>
                                                <IconButton onClick={handleClickDelete} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                    <HighlightOffIcon></HighlightOffIcon>
                                                </IconButton>
                                            </Tooltip>
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
                        <Grid
                            container
                            height='100%'
                            overflow='scroll'
                            alignItems='center'
                            justifyContent='start'
                            display='block'
                            direction='column'
                            paddingRight='10px'
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
                                            <Avatar component={Button} onClick={handleClickFoto} src={`http://localhost:4000/` + member.foto} sx={{ width: 90, height: 90, p:'0px' }}></Avatar>
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
                                            key={servicio.svid}
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
                </Grid>
            </Grid >
        </>
    )
}