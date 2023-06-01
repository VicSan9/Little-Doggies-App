import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

export default function Login() {

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState("");

  const [login, setLogin] = useState({ usuario: '', contraseña: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(login.usuario === '' || login.contraseña === ''){
      setErrorMessage("Ingrese todos los datos primero");
      return
    }

    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(login),
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json()

    if (res.status === 200) {
      sessionStorage.setItem('usuario', data.usuario)
      sessionStorage.setItem('contraseña', data.contraseña)
      sessionStorage.setItem('rol', data.rol)
      sessionStorage.setItem('correo', data.correo)
      sessionStorage.setItem('id', data.id)
      sessionStorage.setItem('auth', 'yes')
      navigate("/home")
    } 
    else {
      setErrorMessage("Usuario o contraseña incorrecto");
      setLogin({ usuario: '', contraseña: '' })
    }
  }

  const handleChange = e => {
    setLogin({
      ...login,
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
      <Navbar></Navbar>
      <Container maxWidth='lg' fixed>
        <Box height='100px'></Box>
        <Grid container
          direction='row'
          justifyContent='flex-start'
          alignItems="center"
          mr='100px'
          ml='100px'
          mb='50px'
          width='auto'
          height='75vh'
          maxHeight='700px'
          minHeight='550px'
          sx={{
            overflow: 'hidden',
            border: '1px solid #BABBBF',
            borderRadius: '20px',
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
          }}>
          <Grid item xs={5} sm={5} lg={5} md={5} xl={5}
            sx={{
              overflow: 'hidden'
            }}
            height='75vh'
            minHeight='550px'
            textAlign='center'>
            <img
              src={process.env.PUBLIC_URL + "/pexels-anna-shvets-4587987.png"}
              alt="collage"
              style={{ height: '75vh', minHeight: '590px', maxHeight: '700px' }}>
            </img>
          </Grid>
          <Grid item xs={7} sm={7} lg={7} md={7} xl={7}
            height='75vh'
            minHeight='550px'>
            <Grid container
              direction='column'>
              <Typography textAlign='center'
                mt='25px'
                variant='h5'
                fontWeight='bold'>
                <LoginIcon sx={{ fontSize: '67px', color: '#0265CD' }}></LoginIcon>
              </Typography>
              <Typography textAlign='center'
                mt='10px'
                variant='h5'
                fontWeight='bold'>
                Iniciar Sesión
              </Typography>
              <Grid container direction='column' component={'form'} onSubmit={handleSubmit}>
                <TextField
                  name="usuario"
                  label="Usuario"
                  variant="outlined"
                  value={login.usuario}
                  onChange={handleChange}
                  sx={{ ml: '20px', mr: '20px', mt: '40px' }} />
                <TextField
                  name="contraseña"
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  value={login.contraseña}
                  onChange={handleChange}
                  sx={{ ml: '20px', mr: '20px', mt: '30px' }} />
                <Button variant="outlined"
                  size='large'
                  type="submit"
                  sx={{
                    color: '#0265CD',
                    ml: '80px',
                    mr: '80px',
                    mt: '40px',
                    borderColor: '#0265CD',
                    borderRadius: '50px',
                    textTransform: 'none'
                  }}> Iniciar Sesión
                </Button>
              </Grid>
              <Grid container
                direction='row'
                textAlign='center'
                justifyContent='center'>
                <Typography
                  sx={{ fontSize: '15px' }}
                  textAlign='center'
                  mt='30px'
                  mr='5px'
                  variant='body1'>
                  ¿Olvidaste tu contraseña?
                </Typography>
                <Link href="#"
                  to='/recuperar'
                  style={{
                    marginLeft: '5px',
                    marginTop: '30px',
                    color: "#0265CD",
                    fontSize: '15px',
                  }}> {' Recuperar contraseña'}
                </Link>
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
            variant='h5'
            fontWeight='bold'>
            <LoginIcon sx={{ fontSize: '67px', color: '#0265CD' }}></LoginIcon>
          </Typography>
          <Typography textAlign='center'
            mt='20px'
            variant='h5'
            fontWeight='bold'>
            Iniciar Sesión
          </Typography>
          <Grid container direction='column' component={'form'} onSubmit={handleSubmit}>
            <TextField
              name="usuario"
              label="Usuario"
              variant="outlined"
              value={login.usuario}
              onChange={handleChange}
              sx={{ ml: '20px', mr: '20px', mt: '40px' }} />
            <TextField
              name="contraseña"
              type="password"
              label="Contraseña"
              variant="outlined"
              value={login.contraseña}
              onChange={handleChange}
              sx={{ ml: '20px', mr: '20px', mt: '30px' }} />
            <Button variant="outlined"
              size='large'
              type="submit"
              sx={{
                color: '#0265CD',
                ml: '80px',
                mr: '80px',
                mt: '40px',
                borderColor: '#0265CD',
                borderRadius: '50px',
                textTransform: 'none'
              }}> Iniciar Sesión
            </Button>
          </Grid>
          <Grid container
            direction='row'
            textAlign='center'
            justifyContent='center'>
            <Typography
              sx={{ fontSize: '15px' }}
              textAlign='center'
              mt='50px'
              variant='body1'>
              ¿Olvidaste tu contraseña?
            </Typography>
            <Box width='10px'>
            </Box>
            <Link href="#"
              to='/recuperar'
              style={{
                marginTop: '50px',
                color: "#0265CD",
                fontSize: '15px',
              }}> {' Recuperar contraseña'}
            </Link>
          </Grid>
        </Grid>
      </Container></>
  )
}