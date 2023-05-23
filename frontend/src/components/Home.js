import { Button, Container, Grid, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const RootImg = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('xl')]: {
    height: '65%',
  },
  [theme.breakpoints.down('lg')]: {
    height: '45%',
  },
  [theme.breakpoints.down('md')]: {
    height: '30%',
  },
}));

export default function Home() {
  return (
    <Container  maxWidth='xl'
                fixed>
        <Grid container
              spacing='2'
              direction='row'
              justifyContent='flex-start'
              alignItems="strech">
            <Grid item xs='5' sm='6' lg='6' md='6' xl='5'>
              <Typography fontSize='2.7vw' variant="h3" gutterBottom mt='3vw' ml='2vw' mr='4.5vw' fontWeight='bold'>
                  ¡Bienvenidos a Little Doggies, aquí podras encontrar lo mejor para tu mascota!
              </Typography>
              <Typography fontSize='2vw' variant="h4" gutterBottom mt='2vw' ml='4.5vw' mr='4.5vw'>
                  <Grid container
                        spacing='2'
                        direction='row'
                        justifyContent='flex-start'
                        alignItems="strech">
                      <Grid item xs='1' sm='2' lg='1' md='1' xl='1'>
                          <img  src={process.env.PUBLIC_URL + "/Viñeta.png"}
                                height='50%'>
                          </img>
                      </Grid>
                      <Grid item xs='0' sm='0' lg='0' md='0' xl='11'>
                          <Typography fontSize='2vw' variant="h4">
                              Peluqueria 
                          </Typography>
                      </Grid>
                  </Grid>
                  <Grid container
                        spacing='2'
                        direction='row'
                        justifyContent='flex-start'
                        alignItems="strech">
                      <Grid item xs='1' sm='2' lg='1' md='1' xl='1'>
                          <img  src={process.env.PUBLIC_URL + "/Viñeta.png"}
                                height='50%'>
                          </img>
                      </Grid>
                      <Grid item xs='0' sm='0' lg='0' md='0' xl='11'>
                          <Typography fontSize='2vw' variant="h4">
                              Vacunación 
                          </Typography>
                      </Grid>
                  </Grid>
                  <Grid container
                        spacing='2'
                        direction='row'
                        justifyContent='flex-start'
                        alignItems="strech">
                      <Grid item xs='1' sm='2' lg='1' md='1' xl='1'>
                          <img  src={process.env.PUBLIC_URL + "/Viñeta.png"}
                                height='50%'>
                          </img>
                      </Grid>
                      <Grid item xs='0' sm='0' lg='0' md='0' xl='11'>
                          <Typography fontSize='2vw' variant="h4">
                              Jugueteria 
                          </Typography>
                      </Grid>
                  </Grid>
                  <Grid container
                        spacing='2'
                        direction='row'
                        justifyContent='flex-start'
                        alignItems="strech">
                      <Grid item xs='1' sm='2' lg='1' md='1' xl='1'>
                          <img  src={process.env.PUBLIC_URL + "/Viñeta.png"}
                                height='50%'>
                          </img>
                      </Grid>
                      <Grid item xs='0' sm='0' lg='0' md='0' xl='11'>
                          <Typography fontSize='2vw' variant="h4">
                              Deparacitación 
                          </Typography>
                      </Grid>
                  </Grid>
                  <Grid container
                        spacing='2'
                        direction='row'
                        justifyContent='flex-start'
                        alignItems="strech">
                      <Grid item xs='11' sm='11' lg='11' md='11' xl='11'>
                          <Typography fontSize='2vw' variant="h4" mt='2vw'>
                              ¡Y mucho más! 
                          </Typography>
                      </Grid>
                      <Grid item xs='11' sm='11' lg='11' md='11' xl='11'>
                          <Button variant="contained" 
                                    size='small'
                                    sx={{color:'#0265CD', 
                                        width:'15vw',
                                        height: '3vw',
                                        minHeight: '40px',
                                        mt:'3vw',
                                        borderColor:'#0265CD',
                                        borderRadius:'15px'}}>
                                <Link   href="#" 
                                        to='/citas'
                                        style={{
                                            fontSize:'1vw',
                                            textDecoration: "none",
                                            color: "#ffffff"
                                        }}> Agenda tu cita
                                </Link>
                            </Button>
                      </Grid>
                  </Grid>
              </Typography>
            </Grid> 
            <Grid item xs='5' sm='2' lg='5' md='5' xl='7' mt='1vw'>
                <RootImg>
                    <img  src={process.env.PUBLIC_URL + "/Collage.png"}
                          alt="collage"
                          height='100%'>
                    </img>                   
                </RootImg>
            </Grid> 
        </Grid>
    </Container>
  )
}
