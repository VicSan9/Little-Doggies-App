import { Typography, Container, Grid, TextField, Button } from "@mui/material";
import Navbar from "./Navbar";

export default function Password() {

    return (

        <>
            <Navbar></Navbar>
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
                        height='500px'
                        width='550px'
                        sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                        <Typography
                            variant="h5"
                            fontWeight='bold'>Establece tu nueva contraseña
                        </Typography>
                        <Typography
                            mt='40px'
                            mb='10px'
                            mr='250px'
                            textAlign='center'
                            variant="body1">Nueva Contraseña
                        </Typography>
                        <TextField
                            name="contraseña"
                            variant="outlined"
                            sx={{ width: '400px' }}>
                        </TextField>
                        <Typography
                            mt='30px'
                            mb='10px'
                            mr='230px'
                            textAlign='center'
                            variant="body1">Confirmar Contraseña
                        </Typography>
                        <TextField
                            name="confirma contraseña"
                            variant="outlined"
                            sx={{ width: '400px' }}>
                        </TextField>
                        <Button
                            type="submit"
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
                            mr='20px'
                            ml='20px'
                            textAlign='center'
                            variant="h5"
                            fontWeight='bold'>Establece tu nueva contraseña
                        </Typography>
                        <Typography
                            mt='40px'
                            mb='10px'
                            variant="body1">Nueva Contraseña
                        </Typography>
                        <TextField
                            name="contraseña"
                            variant="outlined"
                            sx={{ width: '80vw', maxWidth: '400px' }}>
                        </TextField>
                        <Typography
                            mt='30px'
                            mb='10px'
                            variant="body1">Confirmar Contraseña
                        </Typography>
                        <TextField
                            name="Confirma tu contraseña"
                            variant="outlined"
                            sx={{ width: '80vw', maxWidth: '400px' }}>
                        </TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: '30px', borderRadius: '50px', width: '130px' }}>Continuar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}