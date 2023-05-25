import { Container, Grid, Typography } from "@mui/material";

export default function CheckIn() {
    return (
      <Container maxWidth='lg'>
          <Grid container
                spacing='2'
                direction=''
                justifyContent='center'
                alignItems="flex-start"
                margin='140px 150px 100px 150px' 
                width='auto' 
                maxHeight='70vh' 
                height='75vw'
                sx={{border:'2px solid #BABBBF', borderRadius:'20px'}}>
              <Grid item xs='12' sm='12' lg='6' md='6' xl='6'
                    sx={{borderRadius:'19px 0px 0px 19px'}}>
                <Grid direction= 'colummn' mt='2vw' variant='h2' fontWeight='bold'>
                  <Grid items xs= '12' sm='12' lg='6' md='6' xl='6'>
                    <Typography variant="body1" fontWeight='bold' fontSize='1vw'>
                        Crea tu cuenta
                    </Typography>
                  </Grid>
                  </Grid>
                  <Grid direction= 'column' mt='2vw' variant='h2'>
                    <Grid items xs='12' sm='12' lg='6' md='6' xl='6' >
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