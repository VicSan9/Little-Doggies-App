import { Container, Grid, Typography, TextField, Button, Box, Input } from "@mui/material";
import Navbar from "./Navbar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Recover() {
  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth='lg' fixed>
        <Grid
          container
          height='100vh'
          alignItems='center'
          justifyContent='center'>
          <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            border='1px solid #BABBBF'
            borderRadius='20px'
            height='600px'
            width='500px'
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <LockOutlinedIcon sx={{ fontSize: '67px' }}></LockOutlinedIcon>
            <Typography
              mt='30px'
              variant="h5"
              fontWeight='bold'>¿Tienes problemas para ingresar?
            </Typography>
            <Typography
              textAlign='center'
              mt='30px'
              mb='30px'
              variant="body1">Ingresa tu correo y te enviaremos un código de recuperación.
            </Typography>
            <Input
              variant="outlined"
              sx={{ width: '400px' }}>
            </Input>
            <Grid container mt='30px' direction='row' alignItems='center' justifyContent='center'>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#BABBBF", borderRadius: '50px', width: '130px' }}>Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{ ml: '20px', borderRadius: '50px', width: '130px' }}>Continuar
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            borderRadius='20px'
            sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', sx: 'none' } }}>
            <LockOutlinedIcon sx={{ fontSize: '67px' }}></LockOutlinedIcon>
            <Typography
              textAlign='center'
              mt='30px'
              mr='10px'
              ml='10px'
              variant="h5"
              fontWeight='bold'>¿Tienes problemas para ingresar?
            </Typography>
            <Typography
              textAlign='center'
              mt='30px'
              mr='10px'
              ml='10px'
              mb='30px'
              variant="body1">Ingresa tu correo y te enviaremos un código de recuperación.
            </Typography>
            <Input
              variant="outlined"
              sx={{ width: '80vw', maxWidth:'480px' }}>
            </Input>
            <Box sx={{height:'30px', width:'30px'}}></Box>
            <Grid 
              container 
              direction='row' 
              alignItems='center' 
              justifyContent='center'
              sx={{display:{xs: 'contents', sm: ' flex'}}}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#BABBBF", borderRadius: '50px', width: '130px' }}>Cancelar
              </Button>
              <Box sx={{height:'30px', width:'30px'}}></Box>
              <Button
                variant="contained"
                sx={{borderRadius: '50px', width: '130px' }}>Continuar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}