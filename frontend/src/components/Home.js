import { AppBar, Button, Container, Grid, Typography, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import Info from "./Info";

const RootImg = styled('img')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    height: '90vw',
  },
  [theme.breakpoints.down('sm')]: {
    height: '90vw',
  },
}));

export default function Home() {
  return (
    <>{/*Primer apartado*/}
      <Container maxWidth='xl'
        fixed>
        <Grid container
          spacing='2'
          direction='row'
          alignItems="strech"
          textAlign='center'>
          <Grid item xs='12' sm='12' lg='12' md='12' xl='5'
            mt='140px'>
            <Typography fontSize='43px' variant="h3" gutterBottom fontWeight='bold'>
              ¡Bienvenidos a Little Doggies, aquí podras encontrar lo mejor para tu mascota!
            </Typography>
            <Typography fontSize='30px' variant="h4" mt='50px'>
              <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                alt="Viñeta"
                height='25px'>
              </img>
              {""} Peluqueria
            </Typography>
            <Typography fontSize='30px' variant="h4" mt='10px'>
              <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                alt="Viñeta"
                height='25px'>
              </img>
              {""} Vacunación
            </Typography>
            <Typography fontSize='30px' variant="h4" mt='10px'>
              <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                alt="Viñeta"
                height='25px'>
              </img>
              {""} Jugueteria
            </Typography>
            <Typography fontSize='30px' variant="h4" mt='10px'>
              <img src={process.env.PUBLIC_URL + "/Viñeta.png"}
                alt="Viñeta"
                height='25px'>
              </img>
              {""} Desparacitación
            </Typography>
            <Typography fontSize='32px' variant="h4" mt='50px' sx={{ fontWeight: '500' }}>
              {""} ¡Y mucho más!
            </Typography>
            <Button variant="contained"
              size='small'
              sx={{
                color: '#0265CD',
                width: '250px',
                height: '45px',
                mt: '50px',
                borderColor: '#0265CD',
                borderRadius: '15px'
              }}>
              <Link href="#"
                to='/citas'
                style={{
                  fontSize: '15px',
                  textDecoration: "none",
                  color: "#ffffff"
                }}> Agenda tu cita
              </Link>
            </Button>
          </Grid>
          <Grid item xs='5' sm='2' lg='12' md='5' xl='7' mt='70px' sx={{ display: { xs: 'none', xl: 'block' } }}>
            <img src={process.env.PUBLIC_URL + "/Collage.png"}
              alt="collage"
              height='100%'>
            </img>
          </Grid>
        </Grid>
        <Grid container xs='12' sm='12' lg='12' md='12' xl='12'
          sx={{ display: { xl: 'none' } }}
          mt='50px'
          mb='100px'
          spacing='2'
          direction='row'
          alignItems="strech"
          textAlign='center'
          justifyContent='center'>
          <RootImg
            src={process.env.PUBLIC_URL + "/Collage.png"}
            alt="collage"
            height='100%'>
          </RootImg>
        </Grid>
      </Container>
      {/*Segundo apartado*/}
      <AppBar position="static" sx={{ mt:'12vw', mb:'10vw', boxShadow: 'none', border: 'none', backgroundColor: '#ffffff' }}>
        <img src={process.env.PUBLIC_URL + "/Fondo.png"}
          alt="fondo"
          height='100%'>
        </img>
        {/*Circulo pequeño*/}
        <Grid container
          position='absolute'
          width='100%'
          height='42vw'
          alignItems='center'
          justifyContent='center'
          textAlign='center'>
          <Grid container
            sx={{
              display: { xl:'none'},
              backgroundColor: 'rgba(0,0,0,.2)',
              backdropFilter: 'blur(5px)',
              '&:hover': {
                backgroundColor: 'rgba(2,101,205,.2)',
                backdropFilter: 'blur(5px)'
              },
              borderRadius: '360px',
              color: '#000000'
            }}
            position='absolute'
            width='35vw'
            minWidth='300px'
            height='35vw'
            minHeight='300px'
            alignItems='center'
            justifyContent='center'
            textAlign='center'>
            <Typography fontSize='26px'
              variant="h3"
              fontWeight='bold'
              gutterBottom
              sx={{ color: '000000', padding: '5vw 50px 0px 50px' }} >
              ¡Compra los mejores productos para tu mascota a un excelente precio!
            </Typography>
            <Link href="#"
              to='/productos'
              style={{
                marginBottom: '70px',
                fontWeight: '900px',
                color: "#0265CD",
                fontSize: '20px',
              }}> {'Ir a comprar ->'}
            </Link>
          </Grid>
          {/*Circulo grande*/}
          <Grid container
            sx={{
              display: { sm:'none', xs:'none', md:'none', xl:'block'},
              backgroundColor: 'rgba(0,0,0,.2)',
              backdropFilter: 'blur(5px)',
              '&:hover': {
                backgroundColor: 'rgba(2,101,205,.2)',
                backdropFilter: 'blur(5px)'
              },
              borderRadius: '360px',
              color: '#000000'
            }}
            position='absolute'
            width='35vw'
            minWidth='300px'
            height='35vw'
            minHeight='300px'
            alignItems='center'
            justifyContent='center'
            textAlign='center'>
            <Typography fontSize='40px'
              variant="h3"
              fontWeight='bold'
              gutterBottom
              sx={{ color: '000000', padding: '130px 70px 70px 70px' }} >
              ¡Compra los mejores productos para tu mascota a un excelente precio!
            </Typography>
            <Link href="#"
              to='/productos'
              style={{
                marginBottom: '70px',
                fontWeight: '900px',
                color: "#0265CD",
                fontSize: '32px',
              }}> {'Ir a comprar ->'}
            </Link>
          </Grid>
        </Grid>
        <Grid height='23vw'sx={{display: { xl:'none', lg:'none', md:'none', sm:'none'}}}>
        </Grid>
      </AppBar>
      {/*Pie de página */}
      <Info></Info>
    </>
  )
}
