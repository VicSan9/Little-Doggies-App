import { Button, Box, Card, CardContent, CircularProgress, Container, Grid, Typography, Avatar } from "@mui/material";
import UserNavbar from "./UserNavbar";
import { useEffect, useState } from "react";

export default function Quotes() {

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

  return (
    <>
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
          direction='column'
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          height='100vh'
          width='auto'>
          <Typography
            variant="h5"
            fontWeight='bold'>
            ¿Para cuál de tus mascotas es la cita?
          </Typography>
          <Typography
            mt='25px'
            mb='25px'
            variant="body1">
            Escoge una de las mascotas que tengas registradas, si aún no tienes una podrás registrarla.
          </Typography>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            direction='row'>
            {pets.map((pet) => (
              <Card 
                component={Button}
                key={pet.mcid} 
                sx={{ color:'#0265CD', border:'1px solid #BABBBF', borderRadius:'10px', textTransform: 'none', mb: '25px', mt: '5px', mr: '20px', height: '85px', width: '250px' }}>
                <CardContent sx={{width:'230px',padding:'0px'}}>
                  <Grid container direction='row'>
                    <Grid item xs={5}>
                      <Avatar sx={{ ml:'15px', width: 50, height: 50}}>M</Avatar>
                    </Grid>
                    <Grid item xs={7} container direction='column' textAlign='start'>
                      <Typography sx={{color:'#000000'}}>
                        {pet.nombre}
                      </Typography>
                      <Typography sx={{color:'#000000'}}>
                        {pet.raza}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Button
            variant="outlined"
            size="large"
            sx={{ fontWeight: 'bold', width: '270px', borderRadius: '20px', textTransform: 'none' }}
          > Continuar
          </Button>
        </Grid>
      </Container>
    </>
  )
}