import { Typography, Container, Grid, TextField, Button, Box } from "@mui/material";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Password() {

    const navigate = useNavigate();

    const [password, setPassword] = useState({ contraseña: '' });

    const [newpassword, setNewPassword] = useState({ nuevacontraseña: '' });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = e => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleChange1 = e => {
        setNewPassword({
            ...newpassword,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.contraseña.trim() === '' || newpassword.nuevacontraseña.trim() === '') {
            setErrorMessage("Ingrese su nueva contraseña");
            setPassword({ contraseña: '' })
            setNewPassword({ nuevacontraseña: '' })
            return
        }

        if (password.toString === newpassword.toString) {
            navigate('/login')
        } else {
            setErrorMessage("Las contraseñas no coinciden")
        }

    }

    const handleClick = () => {
        setErrorMessage("");
    }



    const ErrorComponent = ({ errorMessage }) => {
        return (
            <Grid container
                zIndex='2'
                width='100vw'
                height='100vh'
                position='absolute'
                alignItems='center'
                textAlign='center'
                justifyContent='center'
                sx={{ backgroundColor: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', }}>
                <Box
                    width='300px'
                    height='200px'
                    borderRadius='20px'
                    border='1px solid #BABBBF'
                    sx={{ backgroundColor: '#ffffff' }}>
                    <Typography color='#CD0227' mt='20px' variant="h5" fontWeight='bold'>Alerta</Typography>
                    <p>{errorMessage}</p>
                    <Button variant="outlined"
                        size='medium'
                        onClick={handleClick}
                        sx={{
                            color: '#0265CD',
                            mt: '30px',
                            borderColor: '#0265CD',
                            borderRadius: '50px',
                            textTransform: 'none'
                        }}> Volver
                    </Button>
                </Box>
            </Grid>
        );
    };

    return (

        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            <Navbar></Navbar>
            <Container maxWidth='lg' fixed>
                <Grid container
                    height='100vh'
                    alignItems='center'
                    justifyContent='center'
                    minHeight='700px' >
                    <Grid component={'form'} onSubmit={handleSubmit}
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
                            type="password"
                            label="Contraseña"
                            variant="outlined"
                            value={password.contraseña}
                            onChange={handleChange}
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
                            name="nuevacontraseña"
                            type="password"
                            label="Nueva contraseña"
                            variant="outlined"
                            value={newpassword.nuevacontraseña}
                            onChange={handleChange1}
                            sx={{ width: '400px' }}>
                        </TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: '30px', borderRadius: '50px', width: '130px' }}>Continuar
                        </Button>
                    </Grid>
                    <Grid component={'form'} onSubmit={handleSubmit}
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
                            type="password"
                            label="Contraseña"
                            variant="outlined"
                            value={password.contraseña}
                            onChange={handleChange}
                            sx={{ width: '80vw', maxWidth: '400px' }}>
                        </TextField>
                        <Typography
                            mt='30px'
                            mb='10px'
                            variant="body1">Confirmar Contraseña
                        </Typography>
                        <TextField
                            name="nuevacontraseña"
                            type="password"
                            label="Nueva contraseña"
                            variant="outlined"
                            value={newpassword.nuevacontraseña}
                            onChange={handleChange1}
                            sx={{ width: '80vw', maxWidth: '400px' }}>
                        </TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: '30px', borderRadius: '50px', width: '130px' }}>Continuar
                        </Button>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}