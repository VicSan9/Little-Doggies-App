import { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, IconButton, Backdrop, Button, Box, Card, Avatar, Divider, CardContent, TextField, Tooltip, FormHelperText, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function AdminClient() {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);
    const [isHidden, setIsHidden] = useState(false)
    const [isHidden1, setIsHidden1] = useState(false)
    const [clients, setClients] = useState([])
    const [client, setClient] = useState({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: '', estado: 'Activo' })
    const [pets, setPets] = useState([])
    const [pet, setPet] = useState({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: 'Activo', foto: '' })
    const [petSelect, setPetSelect] = useState({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: '', foto: '' })
    const [reports, setReports] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");
    const [advertenceMenssage2, setAdvertenceMenssage2] = useState("");
    const [checkin, setCheckin] = useState({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: '', estado: 'Activo' })
    const [condicion, setCondicion] = useState('')
    const [condicion2, setCondicion2] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [search, setSearch] = useState({ search: '' })
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChangePic = async (event) => {

        const name = event.target.files[0].name

        const nameFile = name.split('.')

        const extencion = nameFile[nameFile.length - 1]

        const newName = petSelect.foto.split('.')[0]

        const full = newName + '.' + extencion

        const body = {
            clid: petSelect.clid,
            nombre: petSelect.nombre,
            raza: petSelect.raza,
            edad: petSelect.edad,
            sexo: petSelect.sexo,
            condicion: petSelect.condicion,
            estado: petSelect.estado,
            foto: full
        }

        await fetch(`http://localhost:4000/pets/${petSelect.mcid}`, {
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
        setOpen7(false)
    }

    const handleClickCambiarFotoPet = () => {
        setOpen7(true);
    }

    const handleClickFoto = () => {
        setOpen5(true);
    }

    const handleClickFoto2 = () => {
        setOpen5(false);
    }

    const handleClickFoto3 = () => {
        setOpen6(true);
    }

    const handleClickFoto4 = () => {
        setOpen6(false);
    }

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setCondicion('')
        setIsDisabled(true)
        setPet({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: 'Activo', foto: '' })
    };

    const handleClose2 = () => {
        setOpen4(false);
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
        setAdvertenceMenssage2("");
    }

    const handleClicDelete = () => {
        setAdvertenceMenssage2('¿Estás seguro que quieres eliminar esta mascota')
    }

    const handleClicEdit = () => {
        setOpen4(true)
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

        await fetch(`http://localhost:4000/clients/${client.clid}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        setAdvertenceMenssage("");

        window.location.reload();
    }

    const handleClickAVConf2 = async () => {

        const body = {
            clid: petSelect.clid,
            nombre: petSelect.nombre,
            raza: petSelect.raza,
            edad: petSelect.edad,
            sexo: petSelect.sexo,
            condicion: petSelect.condicion,
            estado: 'Eliminada',
            foto: petSelect.foto
        }

        await fetch(`http://localhost:4000/pets/${petSelect.mcid}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        setAdvertenceMenssage("");

        window.location.reload()
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

    const handleChange5 = (e) => {
        setPetSelect({
            ...petSelect,
            [e.target.name]: e.target.value
        })
    };

    const handleChange6 = (event) => {
        setCondicion2(event.target.value);
        if (event.target.value === 'Si') {
            setIsDisabled(false)
            petSelect.condicion = ''
        } else {
            setIsDisabled(true)
            petSelect.condicion = 'Ninguna'
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

    const handleClickPet = async (e) => {
        const idPet = Number(e.currentTarget.value)

        const res = await fetch(`http://localhost:4000/pets/${idPet}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setPetSelect(data)

        setOpen3(true)

        const body = {
            clid: data.clid,
            mcid: data.mcid
        }

        const res2 = await fetch(`http://localhost:4000/reports2`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data2 = await res2.json()

        if (res2.status === 404) {
            setReports([])
            return
        }

        setReports(data2)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (checkin.nombres.trim() === '' || checkin.apellidos.trim() === '' || checkin.correo.trim() === '' || checkin.direccion.trim() === '' || checkin.telefono.trim() === '' || checkin.usuario.trim() === '' || checkin.contraseña.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            setCheckin({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: '', estado: 'Activo' })
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

        const body = {
            clid: data.clid,
            nombre: data.nombre,
            raza: data.raza,
            edad: data.edad,
            sexo: data.sexo,
            condicion: data.condicion,
            estado: data.estado,
            foto: data.mcid + '-pet.jpg'
        }

        await fetch(`http://localhost:4000/pets/${data.mcid}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        if (!data.menssage) {
            setPet({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: 'Activo', foto: '' })
            window.location.reload()
        }
    }

    const handleSubmit4 = async (e) => {
        e.preventDefault();

        if (petSelect.nombre.trim() === '' || petSelect.raza.trim() === '' || petSelect.edad.trim() === '' || petSelect.sexo.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        petSelect.clid = client.clid

        if (petSelect.condicion.trim() === '') {
            petSelect.condicion = 'Ninguna'
        }

        const res = await fetch(`http://localhost:4000/pets/${petSelect.mcid}`, {
            method: 'PUT',
            body: JSON.stringify(petSelect),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (!data.menssage) {
            setPetSelect({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: '', foto: '' })
            window.location.reload()
        }
    }

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

    const AdvertenceComponent2 = ({ advertenceMenssage }) => {
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
                        onClick={handleClickAVConf2}
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

    const handleClange = e => {
        const value = e.target.value
        const name = e.target.name

        setSearch({
            ...search,
            [name]: value
        })
    }

    return (
        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
            {advertenceMenssage2 && <AdvertenceComponent2 advertenceMenssage={advertenceMenssage2} />}
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 2 }}
                open={open7}>
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
            <Backdrop
                sx={{
                    backdropFilter: 'blur(5px)',
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }
                }}
                open={open6}
                onClick={handleClickFoto4}
            >
                <img
                    src={"http://localhost:4000/" + petSelect.foto}
                    alt="foto"
                    width='30%'>
                </img>
            </Backdrop>
            <Backdrop
                sx={{
                    backdropFilter: 'blur(5px)',
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }
                }}
                open={open5}
                onClick={handleClickFoto2}
            >
                <img
                    src={"http://localhost:4000/" + client.foto}
                    alt="foto"
                    width='30%'>
                </img>
            </Backdrop>
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 2 }}
                open={open4}>
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
                        <IconButton sx={{ mt: '10px', width: 25, height: 25, '&:hover': { color: '#CD0227', bgcolor: '#FFFFFF' } }} onClick={handleClose2}>
                            <Typography fontWeight='bold'>X</Typography>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        height='55vh'
                        maxHeight='550px'
                        alignItems='start'
                        component={'form'}
                        onSubmit={handleSubmit4}>
                        <Grid
                            container
                            width='100%'
                            justifyContent='center'
                            alignItems='center'
                            mb='10px'>
                            <Typography variant='h6'>Editar mascota</Typography>
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
                                mb='10px'>
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
                                        value={petSelect.nombre}
                                        onChange={handleChange5}>
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
                                        value={petSelect.raza}
                                        onChange={handleChange5}>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'
                                mb='10px'>
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
                                        value={petSelect.edad}
                                        onChange={handleChange5}>
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
                                            onChange={handleChange5}
                                            value={petSelect.sexo}>
                                            <MenuItem value={'Macho'}>Macho</MenuItem>
                                            <MenuItem value={'Hembra'}>Hembra</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='start'
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
                                            onChange={handleChange6}
                                            value={condicion2}>
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
                                        value={petSelect.condicion}
                                        onChange={handleChange5}
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
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Backdrop>
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open3}>
                <Grid
                    container
                    alignItems='flex-start'
                    height='80vh'
                    width='85vw'
                    maxWidth='1000px'
                    maxHeight='600px'
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
                        height='90%'
                        maxHeight='550px'
                        alignItems='start'>
                        <Grid
                            container
                            height='60%'
                            width='100%'>
                            <Grid container direction='row'>
                                <Typography
                                    textAlign='start'
                                    variant="h6"
                                    height='15%'
                                    fontWeight='bold'
                                    width='100%'>
                                    Datos de la mascota
                                    <Tooltip title='Editar datos de mascota'>
                                        <IconButton
                                            onClick={handleClicEdit}
                                            sx={{ ml: '33px', mr: '5px', '&:hover': { color: '#0265CD' } }}>
                                            <EditIcon sx={{ fontSize: 25 }}></EditIcon>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Eliminar mascota'>
                                        <IconButton onClick={handleClicDelete} sx={{ mr: '5px', '&:hover': { color: '#CD0227' } }}>
                                            <DeleteIcon sx={{ fontSize: 25 }}></DeleteIcon>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                                <Grid
                                    container
                                    height='80%'
                                    width='50%'
                                    sx={{ borderRight: '1px solid #BABBBF' }}>
                                    <Grid
                                        container
                                        width='50%'
                                        height='90%'
                                        direction='column'
                                        justifyContent='space-around'>
                                        <Typography fontWeight='bold'>Nombre</Typography>
                                        <Typography fontWeight='bold'>Raza</Typography>
                                        <Typography fontWeight='bold'>Edad</Typography>
                                        <Typography fontWeight='bold'>Sexo</Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        width='50%'
                                        height='90%'
                                        direction='column'
                                        justifyContent='space-around'>
                                        <Typography>{petSelect.nombre}</Typography>
                                        <Typography>{petSelect.raza}</Typography>
                                        <Typography>{petSelect.edad}</Typography>
                                        <Typography>{petSelect.sexo}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    height='90%'
                                    width='50%'>
                                    <Grid
                                        container
                                        width='50%'
                                        height='90%'
                                        direction='column'>
                                        <Typography mt='15px' height='61px' ml='20px' fontWeight='bold'>Condicion</Typography>
                                        <Typography ml='20px' fontWeight='bold'>Foto</Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        width='50%'
                                        height='90%'
                                        direction='column'>
                                        <Typography height='70px' width='100%' mt='15px' ml='20px'>{petSelect.condicion}</Typography>
                                        <Grid
                                            container
                                            direction='column'
                                            alignItems='center'
                                            justifyContent='center'>
                                            <Avatar component={Button} onClick={handleClickFoto3} src={`http://localhost:4000/` + petSelect.foto} sx={{ mt: '5px', width: 110, height: 110, p: '0px' }}>M</Avatar>
                                            <Button onClick={handleClickCambiarFotoPet}>Cambiar foto</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            height='40%'
                            width='100%'
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
                            <Grid container direction='column' display='block' width='99%'>
                                <Typography
                                    textAlign='start'
                                    variant="h6"
                                    fontWeight='bold'
                                    height='25%'
                                    width='100%'>
                                    Historial de citas
                                </Typography>
                                <Grid
                                    container
                                    width='100%'
                                    borderBottom='1px solid #BABBBF'
                                    mb='20px'>
                                    <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                        <Typography fontWeight='bold'>Fecha</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                        <Typography fontWeight='bold'>Servicios</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                        <Typography fontWeight='bold'>Nota</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                        <Typography fontWeight='bold'>Atendido por</Typography>
                                    </Grid>
                                </Grid>
                                {reports.map((report) => (
                                    <Grid
                                        container
                                        width='100%'
                                        borderBottom='1px solid #BABBBF'
                                        mb='10px'
                                        key={report.ifid}>
                                        <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                            <Typography>{report.fecha}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                            <Typography>{report.servicios}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                            <Typography>{report.nota}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={3} lg={3} md={3} xl={3}>
                                            <Typography>{report.nombres + " " + report.apellidos}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Backdrop>
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
                                width='100%'
                                mb='10px'>
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
                                width='100%'
                                mb='10px'>
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
                                alignItems='start'
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
            </Backdrop>
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
            </Backdrop>
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
                                <Typography variant='h6' fontSize='bold'>{'Clientes (' + clients.length + ')'}</Typography>
                                <Tooltip title='Nuevo cliente'>
                                    <IconButton onClick={handleClicNewService} sx={{ mr: '16px', width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                        <Typography>+</Typography>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid
                                mt='8px'
                                paddingRight='15px'
                                container
                                direction='row'
                                alignItems='center'
                                justifyContent='center'
                                mb='20px'>
                                <Typography mr='12px'>{'Buscar '}</Typography>
                                <TextField
                                    variant='outlined'
                                    onChange={handleClange}
                                    name='search'
                                    value={search.search}
                                    InputProps={{ sx: { borderRadius: '20px', height: '50px' } }}
                                    sx={{
                                        width: '77%',
                                    }}>
                                </TextField>
                            </Grid>
                            <Grid
                                container
                                height='76%'
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
                                {clients.filter(client => client.nombres.toLowerCase().includes(search.search.toLowerCase().trim()) === true || client.apellidos.toLowerCase().includes(search.search.toLowerCase().trim()) === true).map((client) => (
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
                                        <Avatar src={`http://localhost:4000/` + client.foto} sx={{ width: 45, height: 45 }}></Avatar>
                                        <Typography textAlign='center' width='61%' overflow='hidden'>{client.nombres + ' ' + client.apellidos}</Typography>
                                        <Grid>
                                            <Tooltip title='Editar cliente'>
                                                <IconButton id={client.clid} onClick={handleClickEdit} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                    <EditIcon></EditIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Eliminar cliente'>
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
                                <Typography mt='8px' mb='8px'>Seleciona uno de los clientes para ver su información.</Typography>
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
                                            <Avatar component={Button} onClick={handleClickFoto} src={`http://localhost:4000/` + client.foto} sx={{ width: 100, height: 100, p: '0px' }}></Avatar>
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
                                                    onClick={handleClickPet}
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
                                                                <Avatar src={`http://localhost:4000/` + pet.foto} sx={{ ml: '5px', width: 50, height: 50 }}>M</Avatar>
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