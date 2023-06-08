import { Container, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";

export default function PersonalInformation() {

    return (
        <>
            <Navbar></Navbar>
            <Container maxWidth='xl' fixed>
                <Container
                    maxWidth='xl'
                    fixed>
                    <Grid
                        container
                        alignItems='center'
                        height='100vh'>
                        <Grid
                            container
                            height='78vh'>
                            <Grid
                                alignItems='star'
                                justifyContent='center'
                                height='100vh'
                                item xs={6} sm={6} lg={6} md={6} xl={6}
                                borderRight='2px solid #BABBBF'>
                                <Grid
                                    container
                                    alignItems='star'
                                    justifyContent='start'>
                                    <Typography textAlign='start' mt='20px' variant="h5" fontWeight='bold'>Datos personales</Typography>
                                    <Typography textAlign='start' mr='40px' mt='30px' mb='30px' variant="body1">
                                        Aquí podrás programar tus citas para
                                        el día que desees, por favor asegúrate de
                                        escoger el día en el calendario, darle clic en confirmar y luego seleccionar el
                                        horario que más se adecue a tus necesidades, por último
                                        escoge los servicios que necesitarás para tu mascota.
                                    </Typography>
                                    <Grid container
                                        direction='column'
                                        border='1px solid  #BABBBF'
                                        height='400px'
                                        width='500px'>
                                        <Typography textAlign='start' ml='10px' mt='20px' variant="h5" fontWeight='bold'>Información personal</Typography>
                                        <Grid container mt='30px' direction='row'>
                                            <Typography textAlign='start' ml='20px' mr='50px' mt='30px' variant="body1" fontWeight='bold'> Foto</Typography>
                                            <Typography textAling='start' ml='200px' mr='10px' mt='30px' variant="body1" fontWeight='bold'>Foto</Typography>
                                            <Grid container mt='30px' direction='row'>
                                                <Typography textAling='start' ml='20px' mr='50px' mt='30px' variant="body1" fontWeight='bold'>Nombres</Typography>
                                                <Typography textAling='start' ml='165px' mr='10px' mt='30px' variant="body1" fontWeight='bold'>Nombres</Typography>
                                                <Grid container mt='30px' direction='row'>
                                                    <Typography textAling='start' ml='20px' mr='50px' mt='30px' variant="body1" fontWeight='bold'>Apellidos</Typography>
                                                    <Typography textAling='start' ml='165px' mr='10px' mt='30px' variant="body1" fontWeight='bold'>Apellidos</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </>

    )
}