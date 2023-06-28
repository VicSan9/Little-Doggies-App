import { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, IconButton, Backdrop, Button } from "@mui/material";

export default function AdminClient() {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [isHidden1, setIsHidden1] = useState(false)

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
        setOpen2(false);
    };

    const handleClicNewService = async () => {
        setOpen(true)
    }

    return (
        <>
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open2}>
                <Grid
                    container
                    alignContent='start'
                    justifyContent='start'
                    height='65vh'
                    width='80vw'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='25px'
                    sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Grid
                        container
                        direction='row'
                        width='100%'
                        justifyContent='end'>
                        <IconButton sx={{ mt: '10px', width: 25, height: 25, '&:hover': { color: '#CD0227', bgcolor: '#FFFFFF' } }} onClick={handleClose}>
                            <Typography fontWeight='bold'>X</Typography>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        height='80%'
                        width='99%'
                        direction='column'>
                        <Typography textAlign='start' variant="h6" fontWeight='bold'>Realizar informe</Typography>

                    </Grid>
                    <Button variant='outlined' sx={{ borderRadius: '20px' }}>Guardar informe</Button>
                </Grid >
            </Backdrop >
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open1}>
                <Grid
                    container
                    alignItems='start'
                    height='80vh'
                    width='80vw'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='25px'
                    sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Grid
                        container
                        direction='row'
                        width='100%'
                        justifyContent='end'>
                        <IconButton sx={{ mt: '10px', width: 25, height: 25, '&:hover': { color: '#CD0227', bgcolor: '#FFFFFF' } }} onClick={handleClose}>
                            <Typography fontWeight='bold'>X</Typography>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        height='75vh'>
                    </Grid>
                </Grid >
            </Backdrop >
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open}>
                <Grid
                    container
                    alignItems='start'
                    height='80vh'
                    width='80vw'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='25px'
                    sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Grid
                        container
                        direction='row'
                        width='100%'
                        justifyContent='end'>
                        <IconButton sx={{ mt: '10px', width: 25, height: 25, '&:hover': { color: '#CD0227', bgcolor: '#FFFFFF' } }} onClick={handleClose}>
                            <Typography fontWeight='bold'>X</Typography>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        height='75vh'>
                    </Grid>
                </Grid >
            </Backdrop >
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
                    width='95.2vw'
                    height='90%'
                    maxHeight='930px'
                    direction='row'
                    justifyContent='start'
                    alignItems='center'>
                    <Grid
                        container
                        item xs={4} sm={4} lg={4} md={4} xl={4}
                        justifyContent='center'
                        alignItems='start'
                        height='100%'
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
                                mb='10px'
                            >
                                <Typography variant='h6' fontSize='bold'>Clientes</Typography>
                                <IconButton onClick={handleClicNewService} sx={{ width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                    <Typography>+</Typography>
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid
                        container
                        height='100%'
                        justifyContent='start'
                        alignItems='start'
                        direction='column'
                        paddingRight='16px'
                        paddingLeft='16px'
                        item xs={8} sm={8} lg={8} md={8} xl={8}>
                        <div hidden={isHidden1}>
                            <Typography mt='8px' mb='8px'>Seleciona uno de los clientes para ver su información</Typography>
                        </div>
                        <div hidden={!isHidden1} style={{ width: '100%' }}>
                            <Typography variant='h6'>Información del Cliente</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}