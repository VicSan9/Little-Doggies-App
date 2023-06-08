import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPet() {

    const [pet, setPet] = useState({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '' })

    const [condicion, setCondicion] = useState('')

    const [isDisabled, setIsDisabled] = useState(true)

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pet.nombre.trim() === '' || pet.raza.trim() === '' || pet.edad.trim() === '' || pet.sexo.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            setPet({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '' })
            return
        }

        pet.clid = sessionStorage.getItem('id')

        if (pet.condicion.trim() === '') {
            pet.condicion = 'Ninguna'
        }

        const res = await fetch('http://localhost:4000/pets2', {
            method: 'POST',
            body: JSON.stringify(pet),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        console.log(data)

        if (!data.menssage) {
            setPet({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '' })
            navigate('/mis-mascotas')
        }
    }

    const handleChange = e => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        })
    }

    const handleChange2 = (event) => {
        setCondicion(event.target.value);
        if (event.target.value === 'Si') {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    };

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
            <Container
                maxWidth='md'>
                <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                    height='100vh'>
                    <Grid
                        component={'form'}
                        onSubmit={handleSubmit}
                        container
                        border='1px solid #BABBBF'
                        borderRadius='20px'
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        mr='60px'
                        ml='60px'>
                        <Typography variant="h5" fontWeight='bold' mt='20px'>Registra tu mascota</Typography>
                        <Typography mt='30px'>Registra tu mascota con toda su información</Typography>
                        <Grid
                            container
                            justifyContent='space-evenly'
                            alignItems='center'
                            direction='row'
                            mt='30px'>
                            <TextField
                                sx={{ width: '320px' }}
                                name="nombre"
                                label="Nombre de la mascota"
                                variant="outlined"
                                value={pet.nombre}
                                onChange={handleChange}>
                            </TextField>
                            <TextField
                                sx={{ width: '320px' }}
                                name="raza"
                                label="Raza"
                                variant="outlined"
                                value={pet.raza}
                                onChange={handleChange}>
                            </TextField>
                        </Grid>
                        <Grid
                            container
                            justifyContent='space-evenly'
                            alignItems='center'
                            direction='row'
                            mt='30px'>
                            <TextField
                                sx={{ width: '320px' }}
                                name="edad"
                                label="Edad"
                                variant="outlined"
                                value={pet.edad}
                                onChange={handleChange}>
                            </TextField>
                            <FormControl sx={{ width: '320px' }}>
                                <InputLabel id="demo-simple-select-label2">Sexo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label2"
                                    id="demo-simple-select2"
                                    name="sexo"
                                    label="Sexo"
                                    onChange={handleChange}
                                    value={pet.sexo}>
                                    <MenuItem value={'Macho'}>Macho</MenuItem>
                                    <MenuItem value={'Hembra'}>Hembra</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            container
                            justifyContent='space-evenly'
                            alignItems='center'
                            direction='row'
                            mt='30px'
                            mb='40px'>
                            <FormControl sx={{ width: '320px' }}>
                                <InputLabel id="demo-simple-select-label2">¿Presenta alguna condición?</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label2"
                                    id="demo-simple-select2"
                                    label="¿Presenta alguna condición?"
                                    onChange={handleChange2}
                                    value={condicion}>
                                    <MenuItem value={'Si'}>Si</MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                </Select>
                                <FormHelperText>Si tu mascota tiene alguna enfermedad o condicion especial marca "Si"</FormHelperText>
                            </FormControl>
                            <TextField
                                disabled={isDisabled}
                                sx={{ width: '320px' }}
                                name="condicion"
                                label="Descripción de la condición"
                                variant="outlined"
                                value={pet.condicion}
                                onChange={handleChange}
                                helperText='Si escogiste "No" en la condición esta casilla no estará habilitada'>
                            </TextField>
                        </Grid>
                        <Button
                            variant="outlined"
                            type="submit"
                            sx={{ width: '380px', mb: '30px', borderRadius: '20px' }}>
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}