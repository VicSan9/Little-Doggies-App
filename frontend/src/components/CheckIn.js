import { Container, Grid, Typography, Link, TextField, Button } from "@mui/material";

export default function CheckIn() {
    return (
      <Container maxWidth='lg'>
          <Grid container
                spacing='2'
                direction='row'
                justifyContent='flex-start'
                alignItems="center"
                margin='140px 160px 100px 150px' 
                width='auto' 
                maxHeight='70vh' 
                height='65vw'
                sx={{
                  border:'2px solid #BABBBF', borderRadius:'20px'}}>
              <Grid style={{padding: "80px, 5px 0 5px"}} >
                      <Typography variant="h5" fontWeight='bold' align="center">
                        Crea tu cuenta
                      </Typography>
                      <Typography variant="subtitle1" fontSize='1vw' mt='1vw' align="center">
                       Registrate para poder acceder a nuestros servicios.
                      </Typography>
                      <form>
                        <Grid container spacing='1' mt='2vw'>
                          <Grid xs='12' sm='12'  lg='12' md='12' xl='12' item>
                          <TextField id="outlined-basic" 
                            label="Nombres"
                            variant="outlined"
                            sx={{ ml: '30px', mt:'1vw'}}>
                          </TextField>
                          <TextField id="outlined-basic"
                            label="Apellidos"
                            variant="outlined"
                            sx={{ ml: '30px', mt:'1vw'}}>
                          </TextField>
                          <TextField id="outlined-basic"
                            label="Telefono"
                            variant="outlined"
                            sx={{ ml: '30px', mt:'1vw'}}>
                          </TextField>
                          <TextField id="outlined-basic"
                            label="Correo Electrónico"
                            variant="outlined"
                            sx={{ ml: '30px', mt:'1vw'}}>
                          </TextField>
                          <TextField id="outlined-basic"
                            label="Usuario"
                            variant="outlined"
                            sx={{ ml: '30px', mt:'1vw'}}>
                          </TextField>
                          <TextField id="outlined-basic"
                            label="Contraseña"
                            variant="outlined"
                            sx={{ ml: '30px', mt:'1vw'}}>
                          </TextField>
                          <TextField id="outlined-basic"
                            label="Direccion"
                            variant="outlined"
                            sx={{ ml: '30px', mt:'1vw'}}>
                          </TextField>
                          <Button variant="contained" 
                            size='small'
                            sx={{
                            color: '#0265CD',
                            width: '200px',
                            height: '45px',
                            mt: '20px',
                            ml: '30px',
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
                      </Grid>
                      </form>
                  </Grid>
              </Grid>
        </Container>
    )
  }