import { Box, Card, CardContent, CircularProgress, Container, Grid, Typography } from "@mui/material";
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
              <Card key={pet.mcid} sx={{ mt: '5px', mr: '20px', height: '85px', width: '230px' }}>
                <CardContent>
                  <Typography>
                    {pet.nombre}
                  </Typography>
                  <Typography>
                    {pet.raza}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Typography>
            Boton
          </Typography>
        </Grid>
      </Container>
    </>
  )
}