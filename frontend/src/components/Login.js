import { Box, Container, Grid } from "@mui/material";

export default function Login() {
    return (
      <Container maxWidth='lg' fixed>
          <Grid container
                spacing='2'
                direction='row'
                justifyContent='flex-start'
                alignItems="stretch"
                margin='140px 7.7vw 100px 7.7vw' 
                width='auto' 
                maxHeight='70vh' 
                height='75vw'
                sx={{border:'2px solid #BABBBF', borderRadius:'20px'}}>
              <Grid item xs='2' sm='2' lg='1' md='1' xl='5'
                    sx={{background:'linear-gradient(to bottom right, #0265CD, #1e2460)', borderRadius:'19px 0px 0px 19px'}}>
                  <Box width='50px' height='50px'>
                      <p>
                        a
                      </p>
                  </Box>
              </Grid>
              <Grid item xs='2' sm='2' lg='1' md='1' xl='7'>
                  <p>a</p>
              </Grid>
          </Grid>
      </Container>
      
    )
}