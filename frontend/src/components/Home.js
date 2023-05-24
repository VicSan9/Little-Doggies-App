import { AppBar, Button, Container, Grid, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import Info from "./Info";

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
  [theme.breakpoints.down('sm')]: {
    height: '29%',
  },
}));

export default function Home() {
  return (
    <>
      <Container maxWidth='xl'
                 fixed>
        <Grid container
          maxHeight='460px'
          minHeight='57vw'
          spacing='2'
          direction='row'
          justifyContent='flex-start'
          alignItems="strech">
          <Grid item xs='5' sm='6' lg='6' md='6' xl='5'>
            <Typography fontSize='2.5vw' variant="h3" gutterBottom mt='100px' ml='2.5vw' mr='7vw' fontWeight='bold'>
              ¡Bienvenidos a Little Doggies, aquí podras encontrar lo mejor para tu mascota!
            </Typography>
            <Typography fontSize='2vw' variant="h4" gutterBottom mt='2vw' ml='4.5vw' mr='4.5vw'>
              <Grid container
                spacing='2'
                direction='row'
                justifyContent='flex-start'
                alignItems="strech">
                <Grid item xs='1' sm='2' lg='1' md='1' xl='1'>
                  <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                    alt="Viñeta"
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
                  <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                    alt="Viñeta"
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
                  <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                    alt="Viñeta"
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
                  <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                    alt="Viñeta"
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
                    sx={{
                      color: '#0265CD',
                      width: '15vw',
                      height: '3vw',
                      minHeight: '30px',
                      minWidth: '120px',
                      mt: '3vw',
                      borderColor: '#0265CD',
                      borderRadius: '15px'
                    }}>
                    <Link href="#"
                      to='/citas'
                      style={{
                        fontSize: '1vw',
                        textDecoration: "none",
                        color: "#ffffff"
                      }}> Agenda tu cita
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item xs='5' sm='2' lg='5' md='5' xl='7' mt='70px'>
            <RootImg>
              <img src={process.env.PUBLIC_URL + "/Collage.png"}
                alt="collage"
                height='100%'>
              </img>
            </RootImg>
          </Grid>
        </Grid>
      </Container>
      <AppBar position="static" sx={{boxShadow:'none', border:'none', backgroundColor:'#ffffff'}}>
        <img  src={process.env.PUBLIC_URL + "/Fondo.png"}
              alt="fondo"
              height='100%'> 
        </img>
        <Grid container 
              sx={{backgroundColor:'rgba(2,101,205,.2)', 
                  backdropFilter:'blur(5px)',
                  '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: [1, 1, 1]},
                  mt:'7%', 
                  ml:'34.5vw', 
                  borderRadius:'360px', 
                  color:'#000000'}} 
              position='absolute' 
              width='30vw'
              height='30vw'
              margi
              alignItems='center' 
              justifyContent='center'
              textAlign='center'>
            <Typography fontSize='2vw' 
                        variant="h3" 
                        fontWeight='bold'
                        gutterBottom 
                        sx={{color:'000000', padding:'5vw 50px 0px 50px'}} >
                ¡Compra los mejores productos para tu mascota a un excelente precio!
            </Typography>
            <Link href="#"
                  to='/productos'
                  style={{
                    marginBottom:'70px',
                    fontWeight:'900px',
                    color: "#000000",
                    fontSize: '2vw',
                  }}> {'Ir a comprar ->'}
            </Link>
        </Grid>
      </AppBar>
      <Info></Info>
    </>
  )
}
