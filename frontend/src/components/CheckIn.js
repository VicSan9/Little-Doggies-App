import { Container, Grid, Typography, Link, TextField, Button } from "@mui/material";

export default function CheckIn() {
    return (
      <Container maxWidth='lg'>
          <Grid container
                spacing='1'
                direction='row'
                justifyContent='center'
                alignItems="flex-start"
                margin='140px 160px 100px 150px' 
                width='auto' 
                maxHeight='70vh' 
                height='65vw'
                sx={{border:'2px solid #BABBBF', borderRadius:'20px'}}>
              <Grid style={{padding: "80px, 5px 0 spx"}} mt='2vw'>
                      <Typography variant="h4" fontWeight='bold' fontSize='1vw' align="center">
                        Crea tu cuenta
                      </Typography>
                      <Typography variant="subtitle1" fontSize='1vw' mt='1vw' align="center">
                       Registrate para poder acceder a nuestros servicios.
                      </Typography>
                      <form>
                        <Grid container spacing='1' mt='2vw'>
                          <Grid xs='12' sm='6'  lg='6' md='6' xl='6' item>
                          <TextField 
                            placeholder="Ingrese sus nombres" 
                            label="Nombres" 
                            variant="outlined" 
                            fullWidth required>
                          </TextField>
                          </Grid>
                          <Grid xs='12' sm='6'  lg='6' md='6' xl='6' item>
                          <TextField 
                            placeholder="Ingrese sus apellidos" 
                            label="Apellidos" 
                            variant="outlined" 
                            fullWidth required>
                          </TextField>
                          </Grid>
                          <Grid xs='12' sm='6'  lg='6' md='6' xl='6' mt='1vw' item>
                          <TextField 
                            placeholder="Celular" 
                            label="Celular" 
                            variant="outlined" 
                            fullWidth required>
                          </TextField>
                          </Grid> 
                          <Grid xs='12' sm='6'  lg='6' md='6' xl='6' mt='1vw'  item>
                          <TextField 
                            placeholder="Correo Electronico" 
                            label="Correo" 
                            variant="outlined" 
                            fullWidth required>
                          </TextField>
                          </Grid> 
                          <Grid xs='12' sm='6'  lg='6' md='6' xl='6' mt='1vw' borderBottomitem>
                          <TextField 
                            placeholder="Usuario" 
                            label="Usuario" 
                            variant="outlined" 
                            fullWidth required>
                          </TextField>
                          </Grid> 
                          <Grid xs='12' sm='6'  lg='6' md='6' xl='6' mt='1vw' item>
                          <TextField 
                            placeholder="Contraseña" 
                            label="Contraseña" 
                            variant="outlined" 
                            fullWidth required>
                          </TextField>
                          </Grid> 
                          <Grid xs='12' sm='6'  lg='6' md='6' xl='6' mt='1vw' item>
                          <TextField 
                            placeholder="Dirección" 
                            label="Dirección" 
                            variant="outlined" 
                            fullWidth required>
                          </TextField>
                          </Grid> 
                          <Button variant="contained" m='1vw'
                            size='small'
                            sx={{
                            color: '#0265CD',
                            width: '200px',
                            height: '45px',
                            mt: '50px',
                            borderColor: '#0265CD',
                            borderRadius: '15px'
                               }}>
                          <Link href="#"
                            to='/Inicio'
                            style={{
                            fontSize: '15px',
                            textDecoration: "none",
                            color: "#ffffff"
                             }}> Continuar
                          </Link>
                          </Button>
                        </Grid>
                      </form>
                  </Grid>
              </Grid>
        </Container>
    )
  }