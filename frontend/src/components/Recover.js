import { Container, Grid, Box, Typography, TextField, Button } from "@mui/material";
import Navbar from "./UserNavbar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
/*import LockOutlinedIcon from '@mui/icons-material/LockOutlined';*/


export default function Recover() {
    return (
      <><Navbar></Navbar>
       <Container maxWidth='lg'fixed>
       <Box height='100px'></Box>
        <Grid container
          direction='row'
          justifyContent='flex-start'
          alignItems="center"
          mr='400px'
          ml='250px'
          mb='50px'
          width='100vh'
          height='75vh'
          maxHeight='550px'
          minHeight='550px'
          sx={{
            overflow: 'hidden',
            border: '1px solid #BABBBF',
            borderRadius: '20px',
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
          }}>
        <Grid container item xs={6} sm={6} lg={12} md={12} xl={12}
            direction='column'>
            <Typography textAlign='center'
            mt='50px'
            variant='h5'
            fontWeight='bold'>
           <LockOutlinedIcon sx={{ fontSize: '130px', color: '#000000' }}></LockOutlinedIcon>
           </Typography>
           <Typography textAlign='center'
            mt='10px'
            variant='h5'
            fontWeight='bold'>
            ¿Tienes problemas para ingresar?
          </Typography>
          <Typography textAlign='center'
            mt='20px'
            variant='body1'>
            Ingresa tu nombre de usuario y te enviaremos un código de recuperación a tu correo electrónico
          </Typography>
          <TextField
            mt='20px'
            name="correo"
            label="Correo electrónico"
            variant="outlined"
            sx={{ ml: '40px', mr: '30px', mt: '30px' }} />
        </Grid>
        <Grid item container direction='row' xs={6} lg={12}> 
        <Button 
            variant="outlined"
            size='large'
            type="submit"
            sx={{
                color: '#000000',
                ml: '300px',
                mr: '20px',
                mt: '60px',
                borderColor: '#000000',
                borderRadius: '50px',
                textTransform: 'none'
                }}> Cancelar
        </Button>
        <Button 
            variant="contained"
            size='large'
            type="submit"
            sx={{
                color: '#ffffff',
                ml: '20px',
                mt: '60px',
                borderColor: '#000000',
                borderRadius: '50px',
                textTransform: 'none'
                }}> Continuar
        </Button>
        </Grid>
        </Grid>
      </Container></>
    )
}