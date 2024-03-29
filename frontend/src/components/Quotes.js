import { Button, Box, Card, CardContent, CircularProgress, Container, Grid, Typography, Avatar, Tooltip } from "@mui/material";
import UserNavbar from "./UserNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quotes() {

  var id = localStorage.removeItem('idMascota')

  const navigate = useNavigate()

  const [pets, setPets] = useState([])

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


  const [auth, setAuth] = useState(false)

  const isAuth = () => {
    const res = sessionStorage.getItem('auth')
    if (res === 'yes') {
      setAuth(true)
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  const handleFocus = (event) => {
    id = event.target.value;
    localStorage.setItem('idMascota', id)
  }

  const handleClick = () => {
    setErrorMessage("");
  }

  const handleClickNuevo = () => {
    navigate('/nueva-mascota')
  }

  const handleClick2 = () => {
    const mascota = localStorage.getItem('idMascota')
    if (mascota === null) {
      setErrorMessage("Escoja una mascota primero");
    } else {
      navigate('/nueva-cita')
    }
  }

  const [errorMessage, setErrorMessage] = useState("");

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
      <UserNavbar></UserNavbar>
      <div hidden={auth}>
        <Box alignItems='center' justifyContent='center' width='100vw' height='100vh' sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
      <Container
        maxWidth='xl'
        fixed>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          height='100vh'>
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            textAlign='center'
            height='78vh'
            minHeight='730px'
            width='auto'>
            <Typography
              variant="h5"
              fontWeight='bold'>
              ¿Para cuál de tus mascotas es la cita?
            </Typography>
            <Typography
              mt='45px'
              mb='25px'
              variant="body1">
              Escoge una de las mascotas que tengas registradas, si aún no tienes una podrás registrarla.
            </Typography>
            <Grid
              sx={{ display: { xs: 'contents', sm: 'flex' } }}
              container
              alignItems='center'
              justifyContent='center'
              direction='row'>
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
                    mb: '25px',
                    mt: '5px',
                    mr: '10px',
                    height: '85px',
                    width: '263px',
                    boxShadow: 'none'
                  }}>
                  <CardContent sx={{ width: '230px', padding: '0px' }}>
                    <Grid container direction='row'>
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
                  onClick={handleClickNuevo}
                  sx={{
                    color: '#0265CD',
                    border: '1px solid #BABBBF',
                    borderRadius: '60px',
                    textTransform: 'none',
                    mb: '25px',
                    mt: '5px',
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
            <Box height='30px'></Box>
            <Button
              onClick={handleClick2}
              variant="outlined"
              size="large"
              sx={{ fontWeight: 'bold', width: '270px', borderRadius: '20px', textTransform: 'none' }}
            > Continuar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}