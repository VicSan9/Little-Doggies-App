import { Container, Grid, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import emailjs from "@emailjs/browser";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Recover() {

  const navigate = useNavigate()

  const [recover, setRecover] = useState({ userEmail: '', emailTitle: 'Correo de recuperación', emailDetails: ':D', to_name: '' });

  const [errorMessage, setErrorMessage] = useState("");

  const [isHidden, setIsHidden] = useState(false)

  const handleChange = e => {
    setRecover({
      ...recover,
      [e.target.name]: e.target.value
    })
    console.log(recover)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs.send(
      "service_y2xbs55", "template_52cw0cs", {
      to_name: "Nombre del usuario",
      from_name: "Little Doggies",
      message: recover.emailDetails,
      userEmail: recover.userEmail,
      reply_to: "doggieslittle0@gmail.com",
    }, "6r2SOp-a0vpthnTN_").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
        return
      }
    );
    setIsHidden(true)
  }

  if (recover.correo === '') {
    setErrorMessage("Ingrese todos los datos primero");
    return
  }

  const handleClick = () => {
    setErrorMessage("");
  }

  const handleCancel = () => {
    navigate('/login')
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

  return (
    <>
      {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
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
            <Grid
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
                variant="body1">Ingresa tu correo y te enviaremos un código de recuperación.
              </Typography>
              <Grid component={'form'} onSubmit={handleSubmit}>
                <TextField
                  name="correo"
                  type="email"
                  label="Correo"
                  variant="outlined"
                  value={recover.correo}
                  onChange={handleChange}
                  sx={{ width: '80vw', maxWidth: '480px' }}>
                </TextField>
                <Box sx={{ height: '30px', width: '30px' }}></Box>
                <Grid
                  container
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  sx={{ display: { xs: 'contents', sm: ' flex' } }}>
                  <Button
                    onClick={handleCancel}
                    variant="contained"
                    sx={{ backgroundColor: "#BABBBF", borderRadius: '50px', width: '130px', ml: '20vw' }}>Cancelar
                  </Button>
                  <Box sx={{ height: '30px', width: '30px' }}></Box>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ borderRadius: '50px', width: '130px', ml: '25vw' }}>Continuar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div hidden={!isHidden}>
          <Typography mt='100px'>Nueva componente</Typography>
        </div>
      </Container>
    </>
  )
}
