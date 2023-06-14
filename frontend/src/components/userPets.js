import { Avatar, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserPets() {

  const navigate = useNavigate()

  const [pets, setPets] = useState([])

  const [pet, setPet] = useState([])

  const [isHidden, setIsHidden] = useState(false)

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
  }

  const handleClick2 = () => {
    navigate('/nueva-mascota')
  }

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth='xl' fixed>
        <Grid
          container
          alignItems='center'
          height='100vh'>
          <Grid
            mt='5vh'
            alignItems='center'
            justifyContent='center'
            height='82vh'
            item xs={3} sm={3} lg={3} md={3} xl={3}
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
                      <Grid item xs={3}>
                        <Avatar sx={{ ml: '5px', width: 50, height: 50 }}>M</Avatar>
                      </Grid>
                      <Grid item xs={9} container direction='column' textAlign='start'>
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
            </Grid>
          </Grid>
          <Grid
            mt='5vh'
            alignItems='center'
            justifyContent='center'
            height='82vh'
            item xs={9} sm={9} lg={9} md={9} xl={9}>
            <Grid
              container
              direction='column'
              alignItems='star'
              justifyContent='start'
              ml='20px'
              mt='20px'
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
                        <Typography>{pet.nombre}</Typography>
                        <Typography>{pet.raza}</Typography>
                        <Typography>{pet.edad}</Typography>
                        <Typography>{pet.sexo}</Typography>
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
                        <Typography mt='20px' height='70px' ml='20px' fontWeight='bold'>¿Presenta alguna condicion especial o alergia?</Typography>
                        <Typography ml='20px' fontWeight='bold'>Foto</Typography>
                      </Grid>
                      <Grid
                        container
                        width='50%'
                        height='90%'
                        direction='column'>
                        <Typography height='70px' mt='20px' ml='20px'>{pet.condicion}</Typography>
                        <Avatar sx={{ mt:'5px', ml: '20px', width: '50%', height: '50%' }}>M</Avatar>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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
                      Historial de servicios
                    </Typography>
                    <Grid
                      container
                      height='80%'
                      width='50%'
                      sx={{ borderRight: '1px solid #000000' }}>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container >
    </>
  )
}