import { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, IconButton, Backdrop, Button, Box, Card, Avatar, Divider, CardContent, TextField, Tooltip, FormHelperText, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';

export default function AdminClient() {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [isHidden, setIsHidden] = useState(false)
    const [isHidden1, setIsHidden1] = useState(false)
    const [clients, setClients] = useState([])
    const [client, setClient] = useState({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: 'foto', estado: 'Activo' })
    const [pets, setPets] = useState([])
    const [pet, setPet] = useState({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: 'Activo' })
    const [errorMessage, setErrorMessage] = useState("");
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");
    const [checkin, setCheckin] = useState({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: 'foto', estado: 'Activo' })
    const [condicion, setCondicion] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
        setOpen2(false);
        setCondicion('')
        setIsDisabled(true)
        setPet({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: 'Activo' })
    };

    const handleClicNewService = async () => {
        setOpen(true)
    }

    const handleClickEdit = e => {
        setOpen1(true)
    }

    const handleClickAgMascota = () => {
        setOpen2(true)
    }

    const handleClickDelete = e => {
        setAdvertenceMenssage('¿Estás seguro que quieres eliminar este cliente?')
    }

    const handleClickAV2Can = () => {
        setAdvertenceMenssage("");
    }

    const handleClickAVConf = async () => {

        const body = {
            'nombres': client.nombres,
            'apellidos': client.apellidos,
            'correo': client.correo,
            'direccion': client.direccion,
            'telefono': client.telefono,
            'usuario': client.usuario,
            'contraseña': client.contraseña,
            'foto': client.foto,
            'estado': 'Eliminado'
        }

        console.log(body)

        const res = await fetch(`http://localhost:4000/clients/${client.clid}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        console.log(data)

        setAdvertenceMenssage("");

        window.location.reload();
    }

    const handleClick3 = () => {
        setErrorMessage("");
    }

    const colorFun = (id) => {
        if (Number(id) === client.clid) {
            return '#0265CD'
        } else {
            return 'transparent'
        }
    }

    const colorFun2 = (id) => {
        if (Number(id) === client.clid) {
            return '#FFFFFF'
        } else {
            return '#000000'
        }
    }

    const handleChange = e => {
        setCheckin({
            ...checkin,
            [e.target.name]: e.target.value
        })
    }

    const handleChange2 = e => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const handleChange3 = e => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        })
    }

    const handleChange4 = (event) => {
        setCondicion(event.target.value);
        if (event.target.value === 'Si') {
            setIsDisabled(false)
            pet.condicion = ''
        } else {
            setIsDisabled(true)
            pet.condicion = 'Ninguna'
        }
    };

    const loadClients = async () => {

        const res = await fetch(`http://localhost:4000/clients2`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setClients(data)
    }

    useEffect(() => {
        loadClients();
    }, []);

    const handleClickClient = async (e) => {

        const id = Number(e.currentTarget.id)

        setIsHidden1(true)
        setIsHidden(false)

        const res = await fetch(`http://localhost:4000/clients/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setClient(data)

        const body = {
            'id': data.clid
        }

        const res2 = await fetch(`http://localhost:4000/pets`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        if (res2.status === 404) {
            setIsHidden(true)
            setPets([])
            return
        }

        const data2 = await res2.json()

        setPets(data2)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (checkin.nombres.trim() === '' || checkin.apellidos.trim() === '' || checkin.correo.trim() === '' || checkin.direccion.trim() === '' || checkin.telefono.trim() === '' || checkin.usuario.trim() === '' || checkin.contraseña.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            setCheckin({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: 'foto' })
            return
        }

        const res = await fetch('http://localhost:4000/clients', {
            method: 'POST',
            body: JSON.stringify(checkin),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (!data.message) {
            window.location.reload();
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

    const handleSubmit2 = async (e) => {
        e.preventDefault();

        if (client.nombres.trim() === '' || client.apellidos.trim() === '' || client.correo.trim() === '' || client.direccion.trim() === '' || client.telefono.trim() === '' || client.usuario.trim() === '' || client.contraseña.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        const res = await fetch(`http://localhost:4000/clients/${client.clid}`, {
            method: 'PUT',
            body: JSON.stringify(client),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (!data.message) {
            window.location.reload();
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

    const handleSubmit3 = async (e) => {
        e.preventDefault();

        if (pet.nombre.trim() === '' || pet.raza.trim() === '' || pet.edad.trim() === '' || pet.sexo.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        pet.clid = client.clid

        if (pet.condicion.trim() === '') {
            pet.condicion = 'Ninguna'
        }

        const res = await fetch('http://localhost:4000/pets2', {
            method: 'POST',
            body: JSON.stringify(pet),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (!data.menssage) {
            setPet({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: 'Activo' })
            window.location.reload()
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

    return (
        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open2}>
                <Grid
                    container
                    alignItems='flex-start'
                    height='60vh'
                    width='60vw'
                    maxWidth='1000px'
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
                        height='55vh'
                        maxHeight='550px'
                        alignItems='start'
                        component={'form'}
                        onSubmit={handleSubmit3}>
                        <Grid
                            container
                            width='100%'
                            justifyContent='center'
                            alignItems='center'
                            mb='10px'>
                            <Typography variant='h6'>Registra mascota</Typography>
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
                                        name="nombre"
                                        label="Nombre de la mascota"
                                        variant="outlined"
                                        value={pet.nombre}
                                        onChange={handleChange3}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="raza"
                                        label="Raza"
                                        variant="outlined"
                                        value={pet.raza}
                                        onChange={handleChange3}>
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
                                        name="edad"
                                        label="Edad"
                                        variant="outlined"
                                        value={pet.edad}
                                        onChange={handleChange3}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label2">Sexo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label2"
                                            id="demo-simple-select2"
                                            name="sexo"
                                            label="Sexo"
                                            onChange={handleChange3}
                                            value={pet.sexo}>
                                            <MenuItem value={'Macho'}>Macho</MenuItem>
                                            <MenuItem value={'Hembra'}>Hembra</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label2">¿Presenta alguna condición?</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label2"
                                            id="demo-simple-select2"
                                            label="¿Presenta alguna condición?"
                                            onChange={handleChange4}
                                            value={condicion}>
                                            <MenuItem value={'Si'}>Si</MenuItem>
                                            <MenuItem value={'No'}>No</MenuItem>
                                        </Select>
                                        <FormHelperText>Si tu mascota tiene alguna enfermedad o condicion especial marca "Si"</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        disabled={isDisabled}
                                        fullWidth
                                        name="condicion"
                                        label="Descripción de la condición"
                                        variant="outlined"
                                        value={pet.condicion}
                                        onChange={handleChange3}
                                        helperText='Si escogiste "No" en la condición esta casilla no estará habilitada'>
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
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Registrar mascota</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Backdrop >
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
                        onSubmit={handleSubmit2}>
                        <Grid
                            container
                            width='100%'
                            justifyContent='center'
                            alignItems='center'
                            mb='10px'>
                            <Typography variant='h6'>Editar información de un cliente</Typography>
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
                                        label="Nombres"
                                        variant="outlined"
                                        value={client.nombres}
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
                                        value={client.apellidos}
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
                                        name="telefono"
                                        type="tel"
                                        label="Número de telefono"
                                        variant="outlined"
                                        value={client.telefono}
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
                                        label="Correo Electrónico"
                                        type="email"
                                        variant="outlined"
                                        value={client.correo}
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
                                        name="usuario"
                                        label="Usuario"
                                        variant="outlined"
                                        value={client.usuario}
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
                                        type="password"
                                        label="Contraseña"
                                        variant="outlined"
                                        value={client.contraseña}
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
                                        value={client.direccion}
                                        onChange={handleChange2}>
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
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Registrar</Button>
                        </Grid>
                    </Grid>
                </Grid>
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
                            <Typography variant='h6'>Registra un nuevo cliente</Typography>
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
                                        label="Nombres"
                                        variant="outlined"
                                        value={checkin.nombres}
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
                                        label="Apellidos"
                                        variant="outlined"
                                        value={checkin.apellidos}
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
                                        label="Número de telefono"
                                        variant="outlined"
                                        value={checkin.telefono}
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
                                        label="Correo Electrónico"
                                        type="email"
                                        variant="outlined"
                                        value={checkin.correo}
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
                                        label="Usuario"
                                        variant="outlined"
                                        value={checkin.usuario}
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
                                        value={checkin.contraseña}
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
                                        label="Dirección"
                                        variant="outlined"
                                        value={checkin.direccion}
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
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Registrar</Button>
                        </Grid>
                    </Grid>
                </Grid>
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
                            paddingLeft='16px'
                            paddingRight='2px'
                            direction='column'>
                            <Grid
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                width='100%'
                                mb='10px'
                            >
                                <Typography variant='h6' fontSize='bold'>Clientes</Typography>
                                <IconButton onClick={handleClicNewService} sx={{ mr: '16px', width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
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
                                {clients.map((client) => (
                                    <Grid
                                        component={Card}
                                        key={client.clid}
                                        id={client.clid}
                                        onClick={handleClickClient}
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
                                        bgcolor={colorFun(client.clid)}
                                        color={colorFun2(client.clid)}
                                        sx={{
                                            height: '60px',
                                            '&:hover': {
                                                backgroundColor: '#0265CD',
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            }
                                        }}>
                                        <Avatar sx={{ width: 45, height: 45 }}></Avatar>
                                        <Typography textAlign='center' width='62%' overflow='hidden'>{client.nombres + ' ' + client.apellidos}</Typography>
                                        <Grid>
                                            <IconButton id={client.clid} onClick={handleClickEdit} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
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
                        paddingLeft='16px'
                        paddingRight='2px'
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
                                <Typography mt='8px' mb='8px'>Seleciona uno de los clientes para ver su información</Typography>
                            </div>
                            <div hidden={!isHidden1} style={{ width: '100%' }}>
                                <Typography variant='h6'>Información del Cliente</Typography>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información del personal
                                    <Grid
                                        container
                                        alignItems='start'
                                        justifyContent='center'>
                                        <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombres</Typography>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Apellidos</Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                            <Typography mt='8px' variant='body1'>{client.nombres}</Typography>
                                            <Typography mt='8px' variant='body1'>{client.apellidos}</Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                            <Avatar sx={{ width: 100, height: 100 }}></Avatar>
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
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Correo electrónico</Typography>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Número de telefono</Typography>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Dirección</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                            <Typography mt='8px' variant='body1'>{client.correo}</Typography>
                                            <Typography mt='8px' variant='body1'>{client.telefono}</Typography>
                                            <Typography mt='8px' variant='body1'>{client.direccion}</Typography>
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
                                            <Typography mt='8px' variant='body1'>{client.usuario}</Typography>
                                            <Typography mt='8px' variant='body1'>{client.contraseña}</Typography>
                                        </Grid>
                                    </Grid>
                                </Typography>
                                <Divider></Divider>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Mascotas
                                    <div hidden={isHidden}>
                                        <Grid
                                            container
                                            alignItems='start'
                                            justifyContent='start'>
                                            {pets.map((pet) => (
                                                <Card
                                                    component={Button}
                                                    key={pet.mcid}
                                                    value={pet.mcid}
                                                    sx={{
                                                        border: '1px solid #BABBBF',
                                                        borderRadius: '10px',
                                                        textTransform: 'none',
                                                        mt: '15px',
                                                        ml: '15px',
                                                        mr: '15px',
                                                        height: '85px',
                                                        width: '25%',
                                                        minWidth: '240px',
                                                        boxShadow: 'none'
                                                    }}>
                                                    <CardContent sx={{ width: '100%', padding: '0px' }}>
                                                        <Grid container direction='row' >
                                                            <Grid item xs={4}>
                                                                <Avatar sx={{ ml: '5px', width: 50, height: 50 }}>M</Avatar>
                                                            </Grid>
                                                            <Grid item xs={8} container direction='column' textAlign='start'>
                                                                <Typography fontWeight='bold'>
                                                                    {pet.nombre}
                                                                </Typography>
                                                                <Typography>
                                                                    {pet.raza}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                            <Tooltip title='Nueva mascota'>
                                                <Card
                                                    component={Button}
                                                    onClick={handleClickAgMascota}
                                                    sx={{
                                                        color: '#0265CD',
                                                        border: '1px solid #BABBBF',
                                                        borderRadius: '60px',
                                                        textTransform: 'none',
                                                        mb: '25px',
                                                        mt: '25px',
                                                        ml: '20px',
                                                        height: '65px',
                                                        width: '65px',
                                                        boxShadow: 'none'
                                                    }}>
                                                    <CardContent sx={{ padding: '0px' }}>
                                                        <Typography fontSize='25px'>
                                                            +
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Tooltip>
                                        </Grid>
                                    </div>
                                    <div hidden={!isHidden}>
                                        <Grid
                                            container
                                            direction='row'
                                            width='100%'>
                                            <Typography ml='15px' mt='8px' variant='body1'>Sin mascotas registradas.</Typography>
                                            <Typography component={Link} color='#0265CD' style={{ marginTop: '8px', marginLeft: '5px' }} onClick={handleClickAgMascota}>{'Agregar mascota'}</Typography>
                                        </Grid>
                                    </div>
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}