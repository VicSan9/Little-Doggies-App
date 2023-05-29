import { Container, Grid, Typography, styled } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const RootImg = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    height: '250px',
  },
}));

export default function Info() {
  return (
    <Container maxWidth='xl'
      fixed >
      <Grid container
        sx={{
          borderRadius: '10px',
          borderTop: '2px solid #0265CD'
        }}
        spacing='2'
        direction='column'
        justifyContent='center'
        alignItems="center"
        textAlign='center'>
        <Grid item xs={4} sm={4} lg={4} md={4} xl={1} >
          <RootImg>
            <img src={process.env.PUBLIC_URL + "/LDLogo2.png"}
              alt="logo2"
              height='100%'>
            </img>
          </RootImg>
        </Grid>
        {/*Pantalla grande*/}
        <Grid container
          sx={{ display: { md: 'block', xs:'none'} }}
          spacing='2'
          direction='column'
          justifyContent='center'
          alignItems="center"
          textAlign='center'>
          <Grid item xs={8} sm={6} lg={7} md={6} xl={11}>
            <Typography fontSize='24px' variant="h5" fontWeight='bold'>
              Contactanos:
            </Typography>
            <Grid container direction='row' mt='2vw'>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                <LocationOnIcon sx={{ fontSize: '65px' }}></LocationOnIcon>
                <Typography variant="body1" fontSize='17px'>
                  Manzana C casa 02
                </Typography>
                <Typography variant="body1" fontSize='17px'>
                  La Lorena
                </Typography>
                <Typography variant="body1" fontSize='17px'>
                  Pradera Valle
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                <WhatsAppIcon sx={{ fontSize: '65px' }}></WhatsAppIcon>
                <Typography variant="body1" fontSize='17px'>
                  3206928153
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4} mb='100px'>
                <MailOutlineIcon sx={{ fontSize: '65px' }}></MailOutlineIcon>
                <Typography variant="body1" fontSize='17px'>
                  veterinario0711@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*Pantalla pequeña*/}
        <Grid container
          sx={{ display: { xs:'none', sm:'block', xl:'none', lg:'none', md:'none'} }}
          spacing='2'
          direction='column'
          justifyContent='center'
          alignItems="center"
          textAlign='center'>
          <Grid item xs={11} sm={11} lg={11} md={11} xl={11}>
            <Typography fontSize='24px' variant="h5" fontWeight='bold'>
              Contactanos:
            </Typography>
            <Grid container direction='row' mt='2vw'>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                <LocationOnIcon sx={{ fontSize: '65px' }}></LocationOnIcon>
                <Typography variant="body1" fontSize='12px'>
                  Manzana C casa 02
                </Typography>
                <Typography variant="body1" fontSize='12px'>
                  La Lorena
                </Typography>
                <Typography variant="body1" fontSize='12px'>
                  Pradera Valle
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                <WhatsAppIcon sx={{ fontSize: '65px' }}></WhatsAppIcon>
                <Typography variant="body1" fontSize='12px'>
                  3206928153
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4} mb='50px'>
                <MailOutlineIcon sx={{ fontSize: '65px' }}></MailOutlineIcon>
                <Typography variant="body1" fontSize='12px'>
                  veterinario0711@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*Pantalla muy pequeña*/}
        <Grid container
          sx={{ display: { xs:'block', sm:'none', xl:'none', lg:'none', md:'none'}}}
          spacing='2'
          direction='column'
          justifyContent='center'
          alignItems="center"
          textAlign='center'>
          <Grid item xs={11} sm={11} lg={11} md={11} xl={11}>
            <Typography fontSize='24px' variant="h5" fontWeight='bold'>
              Contactanos:
            </Typography>
            <Grid container direction='row' mt='2vw'>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                <LocationOnIcon sx={{ fontSize: '55px' }}></LocationOnIcon>
                <Typography variant="body1" fontSize='9px'>
                  Manzana C casa 02
                </Typography>
                <Typography variant="body1" fontSize='9px'>
                  La Lorena
                </Typography>
                <Typography variant="body1" fontSize='9px'>
                  Pradera Valle
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                <WhatsAppIcon sx={{ fontSize: '55px' }}></WhatsAppIcon>
                <Typography variant="body1" fontSize='9px'>
                  3206928153
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} md={4} xl={4} mb='50px'>
                <MailOutlineIcon sx={{ fontSize: '55px' }}></MailOutlineIcon>
                <Typography overflow='scroll' variant="body1" fontSize='9px'>
                  veterinario0711@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
