import { Container, Grid, Box, Typography, TextField, Button } from "@mui/material";
import Navbar from "./UserNavbar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
/*import LockOutlinedIcon from '@mui/icons-material/LockOutlined';*/


export default function Recover() {
    return (
      <><Navbar></Navbar>
       <Container maxWidth='md'fixed>
       <Box height='100px'></Box>
        <Grid container
          direction='column'
          justifyContent='flex-start'
          alignItems="center"
          mr='100px'
          ml='100px'
          mb='50px'
          width='100vh'
          height='75vh'
          maxHeight='700px'
          minHeight='550px'
          sx={{
            overflow: 'hidden',
            border: '1px solid #BABBBF',
            borderRadius: '20px',
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
          }}>
        <Grid container
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
            sx={{ ml: '25px', mr: '10px', mt: '30px' }} />
        </Grid>
        <Button 
            variant="outlined"
            size='large'
            type="submit"
            sx={{
                color: '#000000',
                ml: '150px',
                mr: '150px',
                mt: '30px',
                borderColor: '#000000',
                borderRadius: '50px',
                textTransform: 'none'
                }}> Cancelar
        </Button>
        </Grid>
      </Container></>
    )
}