import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

export default function Login() {

  const navigate = useNavigate()

  const [login, setLogin] = useState({ usuario: '', contraseña: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      sessionStorage.setItem('auth', 'yes')
      navigate("/home")
    } else {
      alert('Contraseña o usuario incorrecto');
    }
  }

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  return (
    <><Navbar></Navbar>
    <Container maxWidth='lg' fixed>
      <Grid container
        direction='row'
        justifyContent='flex-start'
        alignItems="center"
        mt='120px'
        mr='100px'
        ml='100px'
        mb='50px'
        width='auto'
        height='75vh'
        maxHeight='700px'
        minHeight='550px'
        sx={{
          overflow: 'hidden',
          border: '2px solid #BABBBF',
          borderRadius: '20px',
          display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
        }}>
        <Grid item xs={5} sm={5} lg={5} md={5} xl={5}
          sx={{
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(to bottom right, #0265CD, #1e2460)'
          }}
          height='75vh'
          minHeight='550px'
          textAlign='center'>
          <img
            src={process.env.PUBLIC_URL + "/pexels-anna-shvets-4587987.png"}
            alt="collage"
            style={{ height: '75vh', minHeight: '590px' }}>
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
              <AccountCircleIcon sx={{ fontSize: '100px', color: '#0265CD' }}></AccountCircleIcon>
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
          mt='85px'
          variant='h5'
          fontWeight='bold'>
          <AccountCircleIcon sx={{ fontSize: '100px', color: '#0265CD' }}></AccountCircleIcon>
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