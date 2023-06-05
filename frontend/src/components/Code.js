import { Container, Grid, TextField, Typography, Button } from "@mui/material";
import Navbar from "./Navbar";


export default function Code() {

    return (

        <><Navbar></Navbar>
            <Container maxWidth='lg' fixed>
                <Grid container
                    height='100vh'
                    alignItems='center'
                    justifyContent='center'
                    minHeight='700px' >
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                        border='1px solid #BABBBF'
                        borderRadius='20px'
                        height='350px'
                        width='450px'
                        sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                        <Typography
                            variant="h5"
                            fontWeight='bold'>Escribe tu código
                        </Typography>
                        <Typography
                            mt='30px'
                            mb='30px'
                            textAlign='center'
                            variant="body1">Te hemos enviado un código de recuperación al correo
                        </Typography>
                        <TextField
                            name="Código"
                            label="Código de verificación"
                            variant="outlined"
                            sx={{ width: '400px' }}>
                        </TextField>
                        <Button
                            variant="contained"
                            sx={{ mt: '30px', borderRadius: '50px', width: '130px' }}>Continuar
                        </Button>
                    </Grid>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                        borderRadius='20px'
                        sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', sx: 'none' } }}>
                        <Typography
                            textAlign='center'
                            variant="h5"
                            fontWeight='bold'>Escribe tu código
                        </Typography>
                        <Typography
                            mt='30px'
                            mb='30px'
                            textAlign='center'
                            variant="body1">Te hemos enviado un código de recuperación al correo
                        </Typography>
                        <TextField
                            name="Código"
                            label="Código de verificación"
                            variant="outlined"
                            sx={{ width: '80vw',  maxWidth: '400px' }}>
                        </TextField>
                        <Button
                            variant="contained"
                            sx={{ mt: '30px', borderRadius: '50px', width: '130px' }}>Continuar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}