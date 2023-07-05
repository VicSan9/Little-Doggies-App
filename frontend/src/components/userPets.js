import { Avatar, Box, Button, Card, CardContent, Container, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserPets() {

  const navigate = useNavigate()

  const [pets, setPets] = useState([])

  const [pet, setPet] = useState([])

  const [pet2, setPet2] = useState({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '', estado: 'Activo' })

  const [reports, setReports] = useState([])

  const [isHidden, setIsHidden] = useState(false)

  const [isHidden2, setIsHidden2] = useState(false)

  const [condicion, setCondicion] = useState('')

  const [isDisabled, setIsDisabled] = useState(true)

  const [errorMessage, setErrorMessage] = useState("");

  const [advertenceMenssage, setAdvertenceMenssage] = useState("");

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

  const handleClickAV2Can = () => {
    setAdvertenceMenssage("");
  }

  const handleClickAVConf = async () => {

    const body = { clid: pet2.clid, nombre: pet2.nombre, raza: pet2.raza, edad: pet2.edad, sexo: pet2.sexo, condicion: pet2.condicion, estado: 'Eliminada' }

    await fetch(`http://localhost:4000/pets/${pet.mcid}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { "content-Type": "application/json" }
    })

    setAdvertenceMenssage("");

    window.location.reload()
  }

  const handleClick = () => {
    setErrorMessage("");
  }

  const handleChange = e => {
    setPet2({
      ...pet2,
      [e.target.name]: e.target.value
    })
  }

  const handleChange2 = (event) => {
    setCondicion(event.target.value);
    if (event.target.value === 'Si') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pet2.nombre.trim() === '' || pet2.raza.trim() === '' || pet2.edad.trim() === '' || pet2.sexo.trim() === '') {
      setErrorMessage("Ingrese todos los datos primero");
      setPet2({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '' })
      return
    }

    pet2.clid = sessionStorage.getItem('id')

    if (pet2.condicion.trim() === '') {
      pet2.condicion = 'Ninguna'
    }

    const res = await fetch(`http://localhost:4000/pets/${pet.mcid}`, {
      method: 'PUT',
      body: JSON.stringify(pet2),
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json()

    console.log(data)

    if (!data.menssage) {
      setPet2({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '' })
      window.location.reload()
    }
  }

  const loadPets = async () => {

    if (sessionStorage.getItem('id') === null) {
      return
    }

    const id = { 'id': sessionStorage.getItem('id') }

    const res = await fetch('http://localhost:4000/pets', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json();

    if (res.status === 404) {
      setPets([])
      return
    }

    setPets(data);
  }

  useEffect(() => {
    loadPets();
  }, []);

  const handleFocus = async (event) => {
    const id = event.target.value;

    localStorage.setItem('idMascota', id)

    setIsHidden(true)

    const res = await fetch(`http://localhost:4000/pets/${id}`, {
      method: 'GET',
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json()

    setPet(data)
    setPet2(data)

    const body = {
      clid: sessionStorage.getItem('id'),
      mcid: id
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

  const handleClick2 = () => {
    navigate('/nueva-mascota')
  }

  const handleClicEdit = () => {
    setIsHidden2(true)
  }

  const handleClicDelete = () => {
    setAdvertenceMenssage('¿Estás seguro que quieres eliminar esta mascota mascota?')
  }

  return (
    <>
      {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
      {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
      <Navbar></Navbar>
      <Container maxWidth='xl' fixed>
        <div hidden={isHidden2}>
          <Grid
            container
            alignItems='center'
            height='100%'
            mt='70px'
            sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' } }}>
            <Grid
              alignItems='center'
              justifyContent='center'
              height='83vh'
              item xs={12} sm={12} md={4} lg={3} xl={3}
              borderRight='2px solid #BABBBF'>
              <Grid
                container
                direction='column'
                alignItems='star'
                justifyContent='start'>
                <Typography
                  textAlign='start'
                  ml='20px'
                  mt='20px'
                  mb='10px'
                  variant="h5"
                  fontWeight='bold'>
                  Tus mascotas
                </Typography>
                {pets.map((pet) => (
                  <Card
                    component={Button}
                    onFocus={handleFocus}
                    key={pet.mcid}
                    value={pet.mcid}
                    sx={{
                      '&:focus': {
                        color: 'white',
                        backgroundColor: '#0265CD',
                      },
                      border: '1px solid #BABBBF',
                      borderRadius: '10px',
                      textTransform: 'none',
                      mt: '15px',
                      ml: '20px',
                      mr: '20px',
                      height: '85px',
                      width: '85%',
                      boxShadow: 'none'
                    }}>
                    <CardContent sx={{ width: '100%', padding: '0px' }}>
                      <Grid container direction='row' >
                        <Grid item xs={3} sm={3} md={5} lg={4} xl={3}>
                          <Avatar sx={{ ml: '5px', width: 50, height: 50 }}>M</Avatar>
                        </Grid>
                        <Grid item xs={3} sm={3} md={7} lg={8} xl={9} container direction='column' textAlign='start'>
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
                    onClick={handleClick2}
                    sx={{
                      color: '#0265CD',
                      border: '1px solid #BABBBF',
                      borderRadius: '60px',
                      textTransform: 'none',
                      mb: '25px',
                      mt: '15px',
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
            </Grid>
            <Grid
              alignItems='center'
              justifyContent='center'
              height='83vh'
              item xs={9} sm={9} lg={9} md={8} xl={9}>
              <Grid
                container
                direction='column'
                alignItems='star'
                justifyContent='start'
                ml='20px'
                mt='17px'
                width='95%'
                height='95%'>
                <div hidden={isHidden}>
                  <Typography
                    textAlign='start'
                    mb='10px'
                    variant="body1">
                    Seleciona una de tus mascotas para ver su información.
                  </Typography>
                </div>
                <div hidden={!isHidden} style={{ height: '100%', width: '100%' }}>
                  <Grid
                    container
                    height='65%'
                    width='100%'>
                    <Grid container direction='row'>
                      <Typography
                        textAlign='start'
                        variant="h5"
                        fontWeight='bold'
                        height='15%'
                        width='100%'>
                        Datos de tu mascota
                        <Tooltip title='Editar datos de tu mascota'>
                          <IconButton
                            onClick={handleClicEdit}
                            sx={{ ml: '33px', mr: '5px', '&:hover': { color: '#0265CD' } }}>
                            <EditIcon sx={{ fontSize: 27 }}></EditIcon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Eliminar mascota'>
                          <IconButton onClick={handleClicDelete} sx={{ mr: '5px', '&:hover': { color: '#CD0227' } }}>
                            <DeleteIcon sx={{ fontSize: 27 }}></DeleteIcon>
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
                          justifyContent='start'>
                          <Typography fontWeight='bold' mb='25px'>Nombre</Typography>
                          <Typography fontWeight='bold' mb='25px'>Raza</Typography>
                          <Typography fontWeight='bold' mb='25px'>Edad</Typography>
                          <Typography fontWeight='bold' mb='25px'>Sexo</Typography>
                        </Grid>
                        <Grid
                          container
                          width='50%'
                          height='90%'
                          direction='column'
                          justifyContent='start'>
                          <Typography mb='25px'>{pet.nombre}</Typography>
                          <Typography mb='25px'>{pet.raza}</Typography>
                          <Typography mb='25px'>{pet.edad}</Typography>
                          <Typography mb='25px'>{pet.sexo}</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        height='80%'
                        width='50%'>
                        <Grid
                          container
                          width='50%'
                          height='90%'
                          direction='column'>
                          <Typography height='70px' ml='20px' fontWeight='bold'>Condición</Typography>
                          <Typography ml='20px' fontWeight='bold'>Foto</Typography>
                        </Grid>
                        <Grid
                          container
                          width='50%'
                          height='90%'
                          direction='column'>
                          <Typography height='70px' ml='20px'>{pet.condicion}</Typography>
                          <Avatar sx={{ mt: '5px', ml: '20px', width: 100, height: 100 }}>M</Avatar>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    height='35%'
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
                    <Grid container direction='column'>
                      <Typography
                        textAlign='start'
                        variant="h5"
                        fontWeight='bold'
                        height='10%'
                        width='100%'
                        mb='30px'>
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
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems='center'
            height='90vh'
            sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
            <Grid
              alignItems='center'
              justifyContent='center'
              item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Grid
                container
                direction='column'
                alignItems='star'
                justifyContent='start'>
                <Typography
                  textAlign='start'
                  ml='20px'
                  mt='20px'
                  mb='10px'
                  variant="h5"
                  fontWeight='bold'>
                  Tus mascotas
                </Typography>
                {pets.map((pet) => (
                  <Card
                    component={Button}
                    onFocus={handleFocus}
                    key={pet.mcid}
                    value={pet.mcid}
                    sx={{
                      '&:focus': {
                        color: 'white',
                        backgroundColor: '#0265CD',
                      },
                      border: '1px solid #BABBBF',
                      borderRadius: '10px',
                      textTransform: 'none',
                      mt: '15px',
                      ml: '20px',
                      mr: '20px',
                      height: '85px',
                      width: '85%',
                      boxShadow: 'none'
                    }}>
                    <CardContent sx={{ width: '100%', padding: '0px' }}>
                      <Grid container direction='row' >
                        <Grid item xs={3} sm={3} md={5} lg={4} xl={3}>
                          <Avatar sx={{ ml: '5px', width: 50, height: 50 }}>M</Avatar>
                        </Grid>
                        <Grid item xs={3} sm={3} md={7} lg={8} xl={9} container direction='column' textAlign='start'>
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
                    onClick={handleClick2}
                    sx={{
                      color: '#0265CD',
                      border: '1px solid #BABBBF',
                      borderRadius: '60px',
                      textTransform: 'none',
                      mb: '25px',
                      mt: '15px',
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
            </Grid>
            <Grid
              alignItems='center'
              justifyContent='center'
              height='82vh'
              maxHeight='900px'
              minHeight='700px'
              item xs={12} sm={9} lg={9} md={9} xl={9}>
              <Grid
                container
                direction='column'
                alignItems='star'
                justifyContent='start'
                ml='20px'
                mt='17px'
                width='95%'
                height='95%'>
                <div hidden={isHidden}>
                  <Typography
                    textAlign='start'
                    mb='10px'
                    variant="body1">
                    Seleciona una de tus mascotas para ver su información.
                  </Typography>
                </div>
                <div hidden={!isHidden} style={{ height: '100%', width: '100%' }}>
                  <Grid
                    container
                    height='50%'
                    width='100%'>
                    <Grid container direction='row'>
                      <Typography
                        textAlign='start'
                        variant="h5"
                        fontWeight='bold'
                        height='15%'
                        width='100%'>
                        Datos de tu mascota
                        <Tooltip title='Editar datos de tu mascota'>
                          <IconButton
                            onClick={handleClicEdit}
                            sx={{ ml: '10px', '&:hover': { color: '#0265CD' } }}>
                            <EditIcon sx={{ fontSize: 27 }}></EditIcon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Eliminar mascota'>
                          <IconButton onClick={handleClicDelete} sx={{ mr: '5px', '&:hover': { color: '#CD0227' } }}>
                            <DeleteIcon sx={{ fontSize: 27 }}></DeleteIcon>
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <Grid
                        container
                        height='70%'
                        width='100%'>
                        <Grid
                          container
                          width='50%'
                          height='90%'
                          direction='column'
                          justifyContent='space-between'>
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
                          justifyContent='space-between'>
                          <Typography>{pet.nombre}</Typography>
                          <Typography>{pet.raza}</Typography>
                          <Typography>{pet.edad}</Typography>
                          <Typography>{pet.sexo}</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        height='90%'
                        width='100%'>
                        <Grid
                          container
                          width='50%'
                          height='90%'
                          direction='column'>
                          <Typography mt='12px' height='70px' fontWeight='bold'>¿Presenta alguna condicion especial o alergia?</Typography>
                          <Typography mt='35px' fontWeight='bold'>Foto</Typography>
                        </Grid>
                        <Grid
                          container
                          width='50%'
                          height='90%'
                          direction='column'>
                          <Typography mt='12px' height='70px'>{pet.condicion}</Typography>
                          <Avatar sx={{ mt: '40px', width: 120, height: 120 }}>M</Avatar>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    mt='250px'
                    height='50%'
                    width='100%'>
                    <Grid container direction='column'>
                      <Typography
                        textAlign='start'
                        variant="h5"
                        fontWeight='bold'
                        height='10%'
                        width='100%'
                        mb='20px'>
                        Historial de citas
                      </Typography>
                      <Grid
                        container
                        width='95%'
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
                          width='95%'
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
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div hidden={!isHidden2}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            mt='75px'
            mb='20px'
            height='85vh'>
            <Grid
              component={'form'}
              onSubmit={handleSubmit}
              container
              border='1px solid #BABBBF'
              borderRadius='20px'
              direction='column'
              justifyContent='center'
              alignItems='center'
              maxWidth='780px'
              mr='60px'
              ml='60px'>
              <Typography variant="h5" fontWeight='bold' mt='20px'>Cambiar información de tu mascota</Typography>
              <Typography mt='30px'>Modifica la información que desees de tu mascota</Typography>
              <Grid
                container
                justifyContent='space-evenly'
                alignItems='center'
                direction='row'
                mt='30px'>
                <TextField
                  sx={{ width: '320px' }}
                  name="nombre"
                  label="Nombre de la mascota"
                  variant="outlined"
                  value={pet2.nombre}
                  onChange={handleChange}>
                </TextField>
                <TextField
                  sx={{ width: '320px' }}
                  name="raza"
                  label="Raza"
                  variant="outlined"
                  value={pet2.raza}
                  onChange={handleChange}>
                </TextField>
              </Grid>
              <Grid
                container
                justifyContent='space-evenly'
                alignItems='center'
                direction='row'
                mt='30px'>
                <TextField
                  sx={{ width: '320px' }}
                  name="edad"
                  label="Edad"
                  variant="outlined"
                  value={pet2.edad}
                  onChange={handleChange}>
                </TextField>
                <FormControl sx={{ width: '320px' }}>
                  <InputLabel id="demo-simple-select-label2">Sexo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    name="sexo"
                    label="Sexo"
                    onChange={handleChange}
                    value={pet2.sexo}>
                    <MenuItem value={'Macho'}>Macho</MenuItem>
                    <MenuItem value={'Hembra'}>Hembra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                justifyContent='space-evenly'
                alignItems='center'
                direction='row'
                mt='30px'
                mb='40px'>
                <FormControl sx={{ width: '320px' }}>
                  <InputLabel id="demo-simple-select-label2">¿Presenta alguna condición?</InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    label="¿Presenta alguna condición?"
                    onChange={handleChange2}
                    value={condicion}>
                    <MenuItem value={'Si'}>Si</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                  </Select>
                  <FormHelperText>Si tu mascota tiene alguna enfermedad o condicion especial marca "Si"</FormHelperText>
                </FormControl>
                <TextField
                  disabled={isDisabled}
                  sx={{ width: '320px' }}
                  name="condicion"
                  label="Descripción de la condición"
                  variant="outlined"
                  value={pet2.condicion}
                  onChange={handleChange}
                  helperText='Si escogiste "No" en la condición esta casilla no estará habilitada'>
                </TextField>
              </Grid>
              <Button
                variant="outlined"
                type="submit"
                sx={{ width: '380px', mb: '30px', borderRadius: '20px' }}>
                Registrar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container >
    </>
  )
}