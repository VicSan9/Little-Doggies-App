import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, Box, TextField, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AdminNewservice() {
    return (
        <>
            <Grid
                container
                direction='row'
                width='100vw'
                height='100vh'
                justifyContent='start'
                alignItems='center'>
                <AdminNavbar></AdminNavbar>
                <Grid
                    container
                    item xs={4} sm={4} lg={4} md={4} xl={4}
                    justifyContent='center'
                    alignItems='start'
                    height='90%'
                    sx={{ borderRight: '1px solid #BABBBF' }}>
                    <Grid
                        container
                        width='93%'
                        height='100%'
                        direction='column'>
                        <Grid
                            container
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            width='100%'
                            mb='10px'>
                            <Typography variant='h6' fontSize='bold'>Servicios</Typography>
                            <Grid
                                component={Box}
                                border='1px solid #BABBBF'
                                borderRadius='15px'
                                mt='15px'
                                mr='5px'
                                ml='5px'
                                width='95%'
                                sx={{
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: '#0265CD'
                                    },
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    textAlign: 'start',
                                }}>
                                <Grid
                                    container
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='flex-start'
                                    mt='10px'
                                    mb='5px'>
                                    <Grid
                                        item xs={2} sm={2} lg={2} md={2} xl={2}>
                                        <Typography ml='20px'>
                                            Servicio:
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            mt='5vh'
                            alignItems='start'
                            height='82vh'
                            direction='column'
                            item xs={10} sm={10} lg={10} md={10} xl={10}>
                            <Grid
                                container
                                alignItems='start'
                                justifyContent='center'
                                direction='column'>
                                <TextField
                                    name="nombre"
                                    label="Nombre del servicio"
                                    variant="outlined"
                                    sx={{ ml: '25px', mr: '10px', mt: '10px', width: '500px' }} />
                                <TextField
                                    name="categoria"
                                    label="Categoria"
                                    variant="outlined"
                                    sx={{ ml: '25px', mr: '10px', mt: '10px', width: '500px' }} />
                                <TextField
                                    name="descripcion"
                                    label="Descripción"
                                    variant="outlined"
                                    sx={{ ml: '25px', mr: '10px', mt: '10px', width: '500px' }} />
                                <Typography mt='20px' ml='30px' mr='10px'>Selecciona los encargados para este servicio</Typography>
                                <FormControl fullWidth
                                    sx={{ ml: '25px', mr: '10px', mt: '10px' }} >
                                    <InputLabel id="demo-simple-select-label">Encargado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Encargado">
                                    </Select>
                                </FormControl>
                                <Grid
                                    container
                                    direction='row'
                                    sx={{ ml: '550px', mr: '10px'}} >
                                    <Button
                                        variant="contained"
                                        sx={{ mt: '150px', borderRadius: '50px', width: '130px' }}>Guardar
                                    </Button>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}