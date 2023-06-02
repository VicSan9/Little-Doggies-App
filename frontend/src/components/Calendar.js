import { Container, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";

export default function Calendar() {
    return (
        <>
            <Navbar></Navbar>
            <Container
                maxWidth='xl'
                fixed>
                <Grid
                    mt='88px'
                    container
                    alignItems='center'
                    justifyContent='flex-start'
                    height='85vh'>
                    <Grid
                        height='85vh'
                        item xs={6} sm={6} lg={6} md={6} xl={6}
                        borderRight='2px solid #BABBBF'>
                        <Typography mt='20px' variant="h5" fontWeight='bold'>Agenda tu cita</Typography>
                        <Typography mr='80px' mt='20px' variant="body1">
                            Aquí podrás programar tus citas para
                            el día que desees, por favor asegúrate de
                            escoger el día en el calendario y luego seleccionar el
                            horario que más se adecue a tus necesidades, por último
                            escoge los servicios que necesitarás para tu mascota.
                        </Typography>
                        <p>calendar</p>
                    </Grid>
                    <Grid
                        height='85vh'
                        item xs={6} sm={6} lg={6} md={6} xl={6}>
                        <p>Derecha</p>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}