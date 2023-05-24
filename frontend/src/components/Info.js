import { Container, Grid, Typography, styled } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const RootImg = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('xl')]: {
      height: '65%',
    },
    [theme.breakpoints.down('lg')]: {
      height: '45%',
    },
    [theme.breakpoints.down('md')]: {
      height: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      height: '29%',
    },
  }));
  
export default function Info() {
  return (
    <Container  maxWidth='xl'
                        fixed >
                <Grid container
                    sx={{
                        borderRadius: '10px',
                        borderTop: '2px solid #0265CD'
                    }}
                    spacing='2'
                    direction='row'
                    justifyContent='flex-start'
                    alignItems="strech"
                    mt='6vw'>
                            <Grid item xs='1' sm='1' lg='1' md='1' xl='1'>
                            </Grid>
                            <Grid item xs='4' sm='4' lg='4' md='4' xl='4' >
                                <RootImg>
                                    <img src={process.env.PUBLIC_URL + "/LDLogo2.png"}
                                        alt="logo2"
                                        height='100%'>
                                    </img>
                                </RootImg>
                            </Grid>
                            <Grid item xs='7' sm='7' lg='7' md='7' xl='7' >
                                <Typography mt='1.5vw' fontSize='1.5vw' variant="h5" fontWeight='bold'>
                                    Contactanos:
                                </Typography>
                                <Grid container direction='row' mt='2vw'>
                                        <Grid item xs='2' sm='2' lg='2' md='2' xl='3'>
                                                <LocationOnIcon sx={{fontSize:'4vw'}}></LocationOnIcon>
                                                <Typography variant="body1" fontWeight='bold' fontSize='1vw'>
                                                    Manzana C casa 02 
                                                </Typography>
                                                <Typography variant="body1" fontWeight='bold' fontSize='1vw'>
                                                    La Lorena 
                                                </Typography>
                                                <Typography variant="body1" fontWeight='bold' fontSize='1vw'>
                                                    Pradera Valle
                                                </Typography>
                                        </Grid>
                                        <Grid item xs='2' sm='2' lg='2' md='2' xl='3'>
                                                <WhatsAppIcon sx={{fontSize:'4vw'}}></WhatsAppIcon>
                                                <Typography variant="body1" fontWeight='bold' fontSize='1vw'>
                                                    3206928153
                                                </Typography>
                                        </Grid>
                                        <Grid item xs='2' sm='2' lg='2' md='2' xl='3'>
                                                <MailOutlineIcon sx={{fontSize:'4vw'}}></MailOutlineIcon>
                                                <Typography variant="body1" fontWeight='bold' fontSize='1vw'>
                                                    veterinario0711@gmail.com
                                                </Typography>
                                        </Grid>
                                </Grid>
                            </Grid>
                </Grid>
    </Container>
  )
}
