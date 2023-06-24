import { Container, Grid, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import emailjs from "@emailjs/browser";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



const codigo = Math.floor(100000 + Math.random() * 900000);

export default function Recover() {

  const navigate = useNavigate()

  const [enteredcode, setEnteredCode] = useState({ code: '' });

  const [recover, setRecover] = useState({ userEmail: '', emailTitle: 'Correo de recuperación', emailDetails: codigo });

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [isHidden, setIsHidden] = useState(false)

  const handleChange = e => {
    setRecover({
      ...recover,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recover.userEmail.trim() === '') {
      setErrorMessage("Ingrese el correo");
      setRecover({ userEmail: '', emailDetails: codigo })
      return
    }

    const correo = recover.userEmail

    const body = { 'correo': correo }

    const res = await fetch(`http://localhost:4000/clients1`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json();

    if (res.status === 404) {
      setErrorMessage("Correo no registrado")
      return
    }

    emailjs.send(
      "service_y2xbs55", "template_52cw0cs", {
      to_name: data.nombres + " " + data.apellidos,
      from_name: "Little Doggies",
      message: recover.emailDetails,
      userEmail: recover.userEmail,
      reply_to: "doggieslittle0@gmail.com",
    }, "dhoSbwqhpg2i0FpUo")

    setSuccessMessage("Envio exitoso")
    setIsHidden(true)

    console.log(data)

  }

  const handleClick1 = () => {
    setSuccessMessage("");
  }

  const handleChange3 = e => {
    setEnteredCode({
      ...enteredcode,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    if (parseInt(recover.emailDetails) === parseInt(enteredcode.code)) {
      setSuccessMessage('Código correcto');
      navigate('/contraseña');
    } else {
      setErrorMessage('Código incorrecto');
    }
  }

  const handleClick = () => {
    setErrorMessage("");
  }

  const handleCancel = () => {
    navigate('/login')
  }

  const handleCancel2 = () => {
    setIsHidden(false)
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
          <Typography color='#CD0227' mt='20px' variant="h5" fontWeight='bold'>Alerta</Typography>
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
          <Grid
            container
            height='100vh'
            alignItems='center'
            justifyContent='center'
            minHeight='700px' >
            <Grid
              container
              direction='column'
              alignItems='center'
              justifyContent='center'
              border='1px solid #BABBBF'
              borderRadius='20px'
              height='500px'
              width='470px'
              sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              <LockOutlinedIcon sx={{ fontSize: '67px' }}></LockOutlinedIcon>
              <Typography
                mt='30px'
                variant="h5"
                fontWeight='bold'>¿Tienes problemas para ingresar?
              </Typography>
              <Typography
                textAlign='center'
                mt='30px'
                mb='30px'
                variant="body1">Ingresa tu correo y te enviaremos un código de recuperación.
              </Typography>
              <Grid component={'form'} onSubmit={handleSubmit}>
                <TextField
                  name="userEmail"
                  type="email"
                  label="Correo"
                  variant="outlined"
                  value={recover.userEmail}
                  onChange={handleChange}
                  maxLength={6}
                  sx={{ width: '400px' }}
                >
                </TextField>
                <Grid container mt='30px' direction='row' alignItems='center' justifyContent='center'>
                  <Button
                    onClick={handleCancel}
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
            <Grid component={'form'} onSubmit={handleSubmit}
              container
              direction='column'
              alignItems='center'
              justifyContent='center'
              borderRadius='20px'
              sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', sx: 'none' } }}>
              <LockOutlinedIcon sx={{ fontSize: '67px' }}></LockOutlinedIcon>
              <Typography
                textAlign='center'
                mt='30px'
                mr='10px'
                ml='10px'
                variant="h5"
                fontWeight='bold'>¿Tienes problemas para ingresar?
              </Typography>
              <Typography
                textAlign='center'
                mt='30px'
                mr='10px'
                ml='10px'
                mb='30px'
                variant="body1">Ingresa tu correo y te enviaremos tu contraseña.
              </Typography>
              <TextField
                name="userEmail"
                type="email"
                label="Correo"
                variant="outlined"
                value={recover.userEmail}
                onChange={handleChange}
                sx={{ width: '80vw', maxWidth: '480px' }}>
              </TextField>
              <Box sx={{ height: '30px', width: '30px' }}></Box>
              <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{ display: { xs: 'contents', sm: ' flex' } }}>
                <Button
                  onClick={handleCancel}
                  variant="contained"
                  sx={{ backgroundColor: "#BABBBF", borderRadius: '50px', width: '130px' }}>Cancelar
                </Button>
                <Box sx={{ height: '30px', width: '30px' }}></Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: '50px', width: '130px' }}>Continuar
                </Button>
              </Grid>
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
                  variant="body1">Te hemos enviado un código de recuperación al correo
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
                  variant="body1">Te hemos enviado un código de recuperación al correo
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
      </Container>
    </>
  )
}

