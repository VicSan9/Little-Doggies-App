import { Container, Grid, TextField, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useState } from "react";

export default function NewPet() {

    const [pet, setPet] = useState({ clid: '', nombre: '', raza: '', edad: '', sexo: '', condicion: '' })

    return (
        <>
            <Navbar></Navbar>
            <Container
                maxWidth='md'>
                <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                    height='100vh'>
                    <Grid
                        container
                        border='1px solid #BABBBF'
                        borderRadius='20px'
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        mr='60px'
                        ml='60px'>
                        <Typography variant="h5" fontWeight='bold' mt='20px'>Registra tu mascota</Typography>
                        <Typography mt='20px'>Registra tu mascota con toda su información</Typography>
                        <Grid
                            container
                            justifyContent='space-evenly'
                            alignItems='center'
                            direction='row'
                            mt='20px'>
                            <TextField
                                sx={{ width: '320px' }}
                                name="nombre"
                                label="Nombre de la mascota"
                                variant="outlined"
                                value={pet.nombre}>
                            </TextField>
                            <TextField
                                sx={{ width: '320px' }}
                                name="raza"
                                label="Raza"
                                variant="outlined"
                                value={pet.raza}>
                            </TextField>
                        </Grid>
                        <Grid
                            container
                            justifyContent='space-evenly'
                            alignItems='center'
                            direction='row'
                            mt='20px'>
                            <TextField
                                sx={{ width: '320px' }}
                                name="edad"
                                label="Edad"
                                variant="outlined"
                                value={pet.edad}>
                            </TextField>
                            <TextField
                                sx={{ width: '320px' }}
                                name="sexo"
                                label="Sexo"
                                variant="outlined"
                                value={pet.sexo}>
                            </TextField>
                        </Grid>
                        <Grid
                            container
                            justifyContent='space-evenly'
                            alignItems='center'
                            direction='row'
                            mt='20px'
                            mb='40px'>
                            <TextField
                                sx={{ width: '320px' }}
                                name="pregunta"
                                label="¿Presenta alguna condición?"
                                variant="outlined">
                            </TextField>
                            <TextField
                                sx={{ width: '320px' }}
                                name="condicion"
                                label="Descripción de la condición"
                                variant="outlined"
                                value={pet.condicion}>
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}