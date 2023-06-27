import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const codigo = Math.floor(100000 + Math.random() * 900000);

export default function Login() {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [enteredcode, setEnteredCode] = useState({ code: '' });

  const [enviendcode, setEnviendCode] = useState({ emailTitle: 'Correo de recuperación', emailDetails: codigo });

  const [isHidden, setIsHidden] = useState(false)

  const [successMessage, setSuccessMessage] = useState("");

  const [checkin, setCheckin] = useState({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: 'foto' })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkin.nombres.trim() === '' || checkin.apellidos.trim() === '' || checkin.correo.trim() === '' || checkin.direccion.trim() === '' || checkin.telefono.trim() === '' || checkin.usuario.trim() === '' || checkin.contraseña.trim() === '') {
      setErrorMessage("Ingrese todos los datos primero");
      setCheckin({ nombres: '', apellidos: '', correo: '', direccion: '', telefono: '', usuario: '', contraseña: '', foto: 'foto' })
      setEnviendCode({ correo: '', emailDetails: codigo })
      return
    }

    emailjs.send(
      "service_y2xbs55", "template_52cw0cs", {
      from_name: "Little Doggies",
      message: enviendcode.emailDetails,
      userEmail: checkin.correo,
      reply_to: "doggieslittle0@gmail.com",
    }, "dhoSbwqhpg2i0FpUo")

    setSuccessMessage("Envio exitoso")
    setIsHidden(true)
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    if (parseInt(enviendcode.emailDetails) === parseInt(enteredcode.code)) {
      setSuccessMessage('Código correcto');

      const res = await fetch('http://localhost:4000/clients', {
        method: 'POST',
        body: JSON.stringify(checkin),
        headers: { "content-Type": "application/json" }
      })

      const data = await res.json()

      if (!data.message) {
        navigate('/login');
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
    } else {
      setErrorMessage('Codigo Incorrecto');
    }
  }


  const handleChange = e => {
    setCheckin({
      ...checkin,
      [e.target.name]: e.target.value
    })
  }

  const handleChange3 = e => {
    setEnteredCode({
      ...enteredcode,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    setErrorMessage("");
  }

  const handleCancel2 = () => {
    setIsHidden(false)
  }

  const handleClick1 = () => {
    setSuccessMessage("");
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

  const SuccessComponent1 = ({ successMessage }) => {
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
          <Typography color='#22E94E' mt='20px' variant="h5" fontWeight='bold'>Mensaje</Typography>
          <p>{successMessage}</p>
          <Button variant="outlined"
            size='medium'
            onClick={handleClick1}
            sx={{
              color: '#0265CD',
              mt: '30px',
              borderColor: '#0265CD',
              borderRadius: '50px',
              textTransform: 'none'
            }}> OK
          </Button>
        </Box>
      </Grid>
    );
  };

  return (
    <>
      {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
      {successMessage && <SuccessComponent1 successMessage={successMessage} />}
      <Navbar></Navbar>
      <Container maxWidth='lg' fixed>
        <div hidden={isHidden}>
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
                <Grid container direction='column' component={'form'} onSubmit={handleSubmit}>
                  <Grid container direction='row' >
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
                        type="tel"
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
                        type="email"
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
        </div>
        <div hidden={!isHidden}>
          <Container maxWidth='lg' fixed>
            <Grid container
              height='100vh'
              alignItems='center'
              justifyContent='center'
              minHeight='700px' >
              <Grid component={'form'} onSubmit={handleSubmit1}
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                border='1px solid #BABBBF'
                borderRadius='20px'
                height='350px'
                width='450px'
                sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                <Typography
                  variant="h5"
                  fontWeight='bold'>Escribe tu código
                </Typography>
                <Typography
                  mt='30px'
                  mb='30px'
                  textAlign='center'
                  variant="body1">Te hemos enviado un código de verificación al correo
                </Typography>
                <TextField
                  name="code"
                  label="codigo de verificación"
                  variant="outlined"
                  onChange={handleChange3}
                  value={enteredcode.code}
                  sx={{ width: '400px' }}>
                </TextField>
                <Grid container mt='30px' direction='row' alignItems='center' justifyContent='center'>
                  <Button
                    onClick={handleCancel2}
                    variant="contained"
                    sx={{ backgroundColor: "#BABBBF", borderRadius: '50px', width: '130px' }}>Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ ml: '20px', borderRadius: '50px', width: '130px' }}>Continuar
                  </Button>
                </Grid>
              </Grid>
              <Grid component={'form'} onSubmit={handleSubmit1}
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                borderRadius='20px'
                sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', sx: 'none' } }}>
                <Typography
                  textAlign='center'
                  variant="h5"
                  fontWeight='bold'>Escribe tu código
                </Typography>
                <Typography
                  mt='30px'
                  mb='30px'
                  textAlign='center'
                  variant="body1">Te hemos enviado un código de verficicación al correo
                </Typography>
                <TextField
                  name="Code"
                  label="Codigo de verificación"
                  variant="outlined"
                  value={enteredcode.code}
                  onChange={handleChange3}
                  sx={{ width: '80vw', maxWidth: '400px' }}>
                </TextField>
                <Grid container mt='30px' direction='row' alignItems='center' justifyContent='center'>
                  <Button
                    onClick={handleCancel2}
                    variant="contained"
                    sx={{ backgroundColor: "#BABBBF", borderRadius: '50px', width: '130px' }}>Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ ml: '20px', borderRadius: '50px', width: '130px' }}>Continuar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Container></>
  )
}