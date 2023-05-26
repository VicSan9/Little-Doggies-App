import { Container, Grid, Typography } from "@mui/material";

export default function CheckIn() {
    return (
      <Container maxWidth='lg'>
          <Grid container
                spacing='2'
                direction='row'
                justifyContent='center'
                alignItems="flex-start"
                margin='140px 160px 100px 150px' 
                width='auto' 
                maxHeight='70vh' 
                height='75vw'
                sx={{border:'2px solid #BABBBF', borderRadius:'20px'}}>
              <Grid item xs='2' sm='2' lg='2' md='2' xl='3'
                    sx={{borderRadius:'19px 0px 0px 19px'}}>
                  <Grid direction= 'row' mt='2vw' variant='h2' fontWeight='bold'>
                    <Grid items xs= '2' sm='2' lg='2' md='2' xl='3'>
                      <Typography variant="body1" fontWeight='bold' fontSize='1vw'>
                      Crea tu cuenta
                      </Typography>
                    </Grid>
                  </Grid>
              <Grid direction= 'row' mt='2vw' variant='h2'>
                    <Grid items xs='2' sm='2' lg='2' md='2' xl='3' >
                    <Typography variant="body1" fontSize='1vw'>
                      Registrate para poder acceder a nuestros servicios.
                    </Typography>
                    </Grid>
              </Grid>  
            </Grid>
          </Grid>
        </Container>
    )
  }