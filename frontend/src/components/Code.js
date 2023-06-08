import { Container, Grid, TextField, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";


export default function Code() {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("");

    const [code, setCode] = useState({ codigo: '' })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (code.codigo === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        const res = await fetch('http://localhost:4000/clients', {
            method: 'POST',
            body: JSON.stringify(code),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (res.status === 200) {
            sessionStorage.setItem('codigo', data.codigo)
            navigate("/contraseña")
        }
    }

    const handleChange = e => {
        setCode({
            ...code,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        navigate("/contraseña")
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
                    <Typography color='#CD0227' mt='20px' variant="h5" fontWeight='bold'>Error</Typography>
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
                    <Grid  component={'form'} onSubmit={handleSubmit}
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
                                name="codigo"
                                label="codigo de verificación"
                                variant="outlined"
                                value={code.codigo}
                                onChange={handleChange}
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
                            sx={{ width: '80vw', maxWidth: '400px' }}>
                        </TextField>
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            sx={{ mt: '30px', borderRadius: '50px', width: '130px' }}>Continuar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}