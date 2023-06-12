import { Container, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";

export default function Shoppinghistory() {
    return (
        <>
            <Navbar></Navbar>
            <Container maxWidth='xl' fixed>
                <Grid
                    container
                    alignItems='center'
                    height='100vh'>
                    <Grid
                        container
                        alignItems='center'
                        height='100vh'>
                        <Grid
                            mt='5vh'
                            alignItems='center'
                            justifyContent='center'
                            height='82vh'
                            item xs={4} sm={4} lg={4} md={4} xl={4}
                            borderRight='2px solid #BABBBF'>
                            <Grid
                                container
                                alignItems='star'
                                justifyContent='start'>
                                <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Historial de compras</Typography>
                                <Typography textAlign='start' ml='20px' mr='20px' mt='30px' mb='50px' variant="body1">
                                    Aquí puedes ver las compras que has realizado
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}