import { Container, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container  maxWidth='xl'
                fixed>
        <Grid container
              spacing='2'
              direction='row'
              justifyContent='flex-start'
              alignItems="strech">
            <Grid item xs='3' sm='2' lg='2' md='0' xl='5'>
              <Typography variant="h3" gutterBottom mt='80px' ml='40px' mr='80px' fontWeight='bold'>
                  ¡Bienvenidos a Little Doggies, aquí podras encontrar lo mejor para tu mascota!
              </Typography>
              <Typography variant="h4" gutterBottom mt='30px' ml='80px' mr='80px'>
                  <Grid container
                        spacing='2'
                        direction='row'
                        justifyContent='flex-start'
                        alignItems="strech">
                      <Grid item xs='0' sm='0' lg='0' md='0' xl='1'>
                          <img src={process.env.PUBLIC_URL + "/Viñeta.png"}>
                          </img>
                      </Grid>
                      <Grid item xs='0' sm='0' lg='0' md='0' xl='11'>
                          <Typography variant="h4">
                              Peluqueria 
                          </Typography>
                      </Grid>
                  </Grid>
              </Typography>
            </Grid> 
            <Grid item xs='3' sm='2' lg='8' md='1' xl='7'>
                <img  src={process.env.PUBLIC_URL + "/Collage.png"}
                      alt="collage"
                      height='100%'>
                </img>
            </Grid> 
        </Grid>
    </Container>
  )
}
