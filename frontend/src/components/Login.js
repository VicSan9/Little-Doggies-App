import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Container maxWidth='lg' fixed>
      <Grid container
        direction='row'
        justifyContent='flex-start'
        alignItems="center"
        mt='120px'
        mr='100px'
        ml='100px'
        mb='50px'
        width='auto'
        height='75vh'
        maxHeight='700px'
        minHeight='550px'
        sx={{
          overflow: 'hidden',
          border: '2px solid #BABBBF',
          borderRadius: '20px',
          display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
        }}>
        <Grid item xs='5' sm='5' lg='5' md='5' xl='5'
          sx={{
            overflow:'hidden',
            backgroundImage: 'linear-gradient(to bottom right, #0265CD, #1e2460)'
          }}
          height='75vh'
          minHeight='550px'
          textAlign='center'>
          <img 
              src={process.env.PUBLIC_URL + "/pexels-anna-shvets-4587987.png"}
              alt="collage"
              style={{height:'75vh', minHeight:'590px'}}>
          </img>
        </Grid>
        <Grid item xs='7' sm='7' lg='7' md='7' xl='7'
          height='75vh'
          minHeight='550px'>
          <Grid container
            direction='column'>
            <Typography textAlign='center'
              mt='25px'
              variant='h5'
              fontWeight='bold'>
              <AccountCircleIcon sx={{ fontSize: '100px', color: '#0265CD' }}></AccountCircleIcon>
            </Typography>
            <Typography textAlign='center'
              mt='10px'
              variant='h5'
              fontWeight='bold'>
              Iniciar Sesión
            </Typography>
            <TextField id="outlined-basic"
              label="Usuario"
              variant="outlined"
              sx={{ ml: '20px', mr: '20px', mt: '40px' }} />
            <TextField id="outlined-basic"
              label="Contraseña"
              variant="outlined"
              sx={{ ml: '20px', mr: '20px', mt: '30px' }} />
            <Button variant="outlined"
              size='large'
              sx={{
                color: '#0265CD',
                ml: '80px',
                mr: '80px',
                mt: '40px',
                borderColor: '#0265CD',
                borderRadius: '50px',
                textTransform: 'none'
              }}> Iniciar Sesión
            </Button>
            <Grid container
              direction='row'
              textAlign='center'
              justifyContent='center'>
              <Typography
                sx={{ fontSize: '15px' }}
                textAlign='center'
                mt='30px'
                mr='5px'
                variant='body1'>
                ¿Olvidaste tu contraseña?
              </Typography>
              <Link href="#"
                to='/recuperar'
                style={{
                  marginLeft: '5px',
                  marginTop: '30px',
                  color: "#0265CD",
                  fontSize: '15px',
                }}> {' Recuperar contraseña'}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/*Sin parte azul*/}
      <Grid container
        minWidth= '280px'
        mb='50px'
        sx={{ display: { xl: 'none', lg: 'none' } }}
        direction='column'>
        <Typography textAlign='center'
          mt='85px'
          variant='h5'
          fontWeight='bold'>
          <AccountCircleIcon sx={{ fontSize: '100px', color: '#0265CD' }}></AccountCircleIcon>
        </Typography>
        <Typography textAlign='center'
          mt='20px'
          variant='h5'
          fontWeight='bold'>
          Iniciar Sesión
        </Typography>
        <TextField id="outlined-basic"
          label="Usuario"
          variant="outlined"
          sx={{ ml: '20px', mr: '20px', mt: '80px' }} />
        <TextField id="outlined-basic"
          label="Contraseña"
          variant="outlined"
          sx={{ ml: '20px', mr: '20px', mt: '40px' }}
        />
        <Button variant="outlined"
          size='large'
          sx={{
            color: '#0265CD',
            ml: '40px',
            mr: '40px',
            mt: '60px',
            minWidth: '200px',
            borderColor: '#0265CD',
            borderRadius: '50px',
            textTransform: 'none'
          }}> Iniciar Sesión
        </Button>
        <Grid container
          direction='row'
          textAlign='center'
          justifyContent='center'>
          <Typography
            sx={{ fontSize: '15px' }}
            textAlign='center'
            mt='50px'
            variant='body1'>
            ¿Olvidaste tu contraseña?
          </Typography>
          <Box width='10px'>
          </Box>
          <Link href="#"
            to='/recuperar'
            style={{
              marginTop: '50px',
              color: "#0265CD",
              fontSize: '15px',
            }}> {' Recuperar contraseña'}
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}