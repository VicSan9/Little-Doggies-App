import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Login() {
  return (
    <Container maxWidth='lg' fixed>
      <Grid container
        spacing='2'
        direction='row'
        justifyContent='flex-start'
        alignItems="center"
        mt='120px'
        mr='100px'
        ml='100px'
        width='auto'
        height='700px'
        sx={{
          overflow:'hidden',
          border: '2px solid #BABBBF',
          borderRadius: '20px',
          display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
        }}>
        <Grid item xs='5' sm='5' lg='5' md='5' xl='5'
          sx={{
            background: 'linear-gradient(to bottom right, #0265CD, #1e2460)'
          }}
          height='700px'>
        </Grid>
        <Grid item xs='7' sm='7' lg='7' md='7' xl='7'
          height='700px'>
          <Grid container
            direction='column'>
            <Typography textAlign='center'
              mt='60px'
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
              sx={{ ml: '20px', mr: '20px', mt: '40px' }} />
            <Button variant="outlined"
              size='large'
              sx={{
                color: '#0265CD',
                ml: '80px',
                mr: '80px',
                mt: '60px',
                borderColor: '#0265CD',
                borderRadius: '15px',
                textTransform: 'none'
              }}> Iniciar Sesión</Button>
          </Grid>
        </Grid>
      </Grid>
      {/*Sin parte azul*/}
      <Grid container
            sx={{display: {xl: 'none', lg: 'none'}}}
            direction='column'>
        <Typography textAlign='center'
          mt='120px'
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
                ml: '80px',
                mr: '80px',
                mt: '60px',
                borderColor: '#0265CD',
                borderRadius: '15px',
                textTransform: 'none'
              }}> Iniciar Sesión</Button>
      </Grid>
    </Container>
  )
}