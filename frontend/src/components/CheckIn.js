import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [checkin, setCheckin] = useState({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: 'foto' })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkin.nombres === '' || checkin.apellidos === '' || checkin.correo === '' || checkin.direccion === '' || checkin.telefono === '' || checkin.usuario === '' || checkin.contraseña === '') {
      setErrorMessage("Ingrese todos los datos primero");
      return
    } 
    
    const res = await fetch('http://localhost:4000/clients', {
      method: 'POST',
      body: JSON.stringify(checkin),
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json()

    console.log(data)
    
    if (res.status === 200) {
      navigate("/login")
    } 
  }

  const handleChange = e => {
    setCheckin({
      ...checkin,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    setErrorMessage("");
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
            onClick={handleClick}
            sx={{
              color: '#0265CD',
              mt: '15px',
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
              src={process.env.PUBLIC_URL + "/jack-russell-2029214_1280.jpg"}
              alt="collage"
              style={{ height: '104vh', minHeight: '720px', maxHeight: '750px' }}>
            </img>
          </Grid>
          <Grid item xs={7} sm={7} lg={7} md={7} xl={7}
            height='700px'
            minHeight='550px'>
            <Grid container
              direction='column'>
              <Typography textAlign='center'
                mt='20px'
                variant='h5'
                fontWeight='bold'>
                <PersonAddIcon sx={{ fontSize: '67px', color: '#0265CD' }}></PersonAddIcon>
              </Typography>
              <Typography textAlign='center'
                mt='10px'
                variant='h5'
                fontWeight='bold'>
                Crea tu cuenta
              </Typography>
              <Typography textAlign='center'
                mt='20px'
                variant='body1'>
                ¡Registrate para poder acceder a nuestros servicios!
              </Typography>
              <Grid container direction='row' component={'form'} onSubmit={handleSubmit}>
                <Grid item container direction='column' xs={6}>
                  <TextField
                    name="nombres"
                    label="Nombres"
                    variant="outlined"
                    value={checkin.nombres}
                    onChange={handleChange}
                    sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                  <TextField
                    name="telefono"
                    label="Número de telefono"
                    variant="outlined"
                    value={checkin.telefono}
                    onChange={handleChange}
                    sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                  <TextField
                    name="usuario"
                    label="Usuario"
                    variant="outlined"
                    value={checkin.usuario}
                    onChange={handleChange}
                    sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                  <TextField
                    name="direccion"
                    label="Dirección"
                    variant="outlined"
                    value={checkin.direccion}
                    onChange={handleChange}
                    sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
                </Grid>
                <Grid item container direction='column' xs={6}>
                  <TextField
                    name="apellidos"
                    label="Apellidos"
                    variant="outlined"
                    value={checkin.apellidos}
                    onChange={handleChange}
                    sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                  <TextField
                    name="correo"
                    label="Correo Electrónico"
                    variant="outlined"
                    value={checkin.correo}
                    onChange={handleChange}
                    sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                  <TextField
                    name="contraseña"
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    value={checkin.contraseña}
                    onChange={handleChange}
                    sx={{ ml: '10px', mr: '25px', mt: '30px' }} />
                </Grid>
                <Button variant="outlined"
                  size='large'
                  type="submit"
                  sx={{
                    color: '#0265CD',
                    ml: '150px',
                    mr: '150px',
                    mt: '40px',
                    borderColor: '#0265CD',
                    borderRadius: '50px',
                    textTransform: 'none'
                  }}> Registrarse
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*Sin parte azul*/}
        <Grid container
          minWidth='280px'
          mb='50px'
          sx={{ display: { xl: 'none', lg: 'none' } }}
          direction='column'>
          <Typography textAlign='center'
            mt='20px'
            variant='h5'
            fontWeight='bold'>
            <PersonAddIcon sx={{ fontSize: '67px', color: '#0265CD' }}></PersonAddIcon>
          </Typography>
          <Typography textAlign='center'
            mt='10px'
            variant='h5'
            fontWeight='bold'>
            Crea tu cuenta
          </Typography>
          <Typography textAlign='center'
            mt='20px'
            variant='body1'>
            ¡Registrate para poder acceder a nuestros servicios!
          </Typography>
          <Grid container direction='column' component={'form'} onSubmit={handleSubmit}>
            <TextField
              name="nombres"
              label="Nombres"
              variant="outlined"
              value={checkin.nombres}
              onChange={handleChange}
              sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
            <TextField
              name="apellidos"
              label="Apellidos"
              variant="outlined"
              value={checkin.apellidos}
              onChange={handleChange}
              sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
            <TextField
              name="correo"
              label="Correo Electrónico"
              variant="outlined"
              value={checkin.correo}
              onChange={handleChange}
              sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
            <TextField
              name="telefono"
              label="Número de telefono"
              variant="outlined"
              value={checkin.telefono}
              onChange={handleChange}
              sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
            <TextField
              name="usuario"
              label="Usuario"
              variant="outlined"
              value={checkin.usuario}
              onChange={handleChange}
              sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
            <TextField
              name="contraseña"
              type="password"
              label="Contraseña"
              variant="outlined"
              value={checkin.contraseña}
              onChange={handleChange}
              sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
            <TextField
              name="direccion"
              label="Dirección"
              variant="outlined"
              value={checkin.direccion}
              onChange={handleChange}
              sx={{ ml: '10px', mr: '10px', mt: '30px' }} />
            <Button variant="outlined"
              size='large'
              type="submit"
              sx={{
                color: '#0265CD',
                ml: '60px',
                mr: '60px',
                mt: '40px',
                borderColor: '#0265CD',
                borderRadius: '50px',
                textTransform: 'none'
              }}> Registrarse
            </Button>
          </Grid>
        </Grid>
      </Container></>
  )
}