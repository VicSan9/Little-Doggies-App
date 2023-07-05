import EmployeeNavbar from './EmployeeNavbar';
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Backdrop, Box, Button, Card, CardContent, Chip, Divider, Fab, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function AdminQuotes() {
    const [expanded, setExpanded] = useState(false);
    const [quotes0, setQuotes0] = useState([])
    const [quotes1, setQuotes1] = useState([])
    const [quotes2, setQuotes2] = useState([])
    const [quotes3, setQuotes3] = useState([])
    const [selectQuote, setSelectQuote] = useState([])
    const [isHidden1, setIsHidden1] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [isDisabled2, setIsDisabled2] = useState(true)
    const [open2, setOpen2] = React.useState(false);
    const [idCliente, setIdCliente] = useState('')
    const [quote, SetQuote] = useState([])
    const [servicios, setServicios] = useState([])
    const [servicio2, setServicio2] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [nota, setNota] = useState({ pregunta: 'No', nota: '' })


    const handleChange5 = (event) => {
        const {
            target: { value },
        } = event;
        setServicio2(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const loadServices = async () => {

        const res = await fetch('http://localhost:4000/services', {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        setServicios(data)
    }

    useEffect(() => {
        loadServices();
    }, []);

    const shouldDisableDate = (date) => {
        // Get the day of the week from the date
        const day = dayjs(date).day();

        // Disable Saturday and Sunday
        return day === 6 || day === 0;
    };

    const loadQuotes2 = async () => {
        const res = await fetch(`http://localhost:4000/quotes4`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setQuotes0(data)

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const today = new Date();

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const yesterdayList = [];
        const todayList = [];
        const tomorrowList = [];

        for (let i = 0; i < data.length; i++) {
            const dateString = data[i].fecha;

            const dateDiv = dateString.split(' ')

            const day = dateDiv[0]
            const month = dateDiv[2]
            const year = dateDiv[4]

            const monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

            const dateFormat = `${year}/${monthName.indexOf(month) + 1}/${day}`

            const date = new Date(dateFormat)
            const hora = data[i].hora
            const horadiv = hora.split(':')
            const hora2 = Number(horadiv[0])
            date.setHours(hora2, 0, 0, 0);

            if (date < today) {
                yesterdayList.push(data[i]);
            } else if (date > tomorrow) {
                tomorrowList.push(data[i]);
            } else {
                todayList.push(data[i]);
            }

        }
        setQuotes1(yesterdayList)
        setQuotes2(todayList)
        setQuotes3(tomorrowList)
    }

    useEffect(() => {
        loadQuotes2()
    }, [])

    const handleClickQuote = async (e) => {

        const id = Number(e.currentTarget.id)

        setIsHidden1(true)

        const res = await fetch(`http://localhost:4000/quotes/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        SetQuote(data)

        for (let i = 0; i < quotes0.length; i++) {
            if (quotes0[i].ctsid === id) {
                setSelectQuote(quotes0[i])
            }
        }
        for (let i = 0; i < quotes1.length; i++) {
            if (quotes1[i].ctsid === id) {
                setIsDisabled(false)
                return
            } else {
                setIsDisabled(true)
            }
        }
    }

    const colorFun = (id) => {
        if (Number(id) === selectQuote.ctsid) {
            return '#0265CD'
        } else {
            return 'transparent'
        }
    }

    const colorFun2 = (id) => {
        if (Number(id) === selectQuote.ctsid) {
            return '#FFFFFF'
        } else {
            return '#000000'
        }
    }

    const clienteColor1 = (id) => {
        if (Number(id) === idCliente) {
            return '#0265CD'
        } else {
            return 'transparent'
        }
    }

    const clienteColor2 = (id) => {
        if (Number(id) === idCliente) {
            return '#FFFFFF'
        } else {
            return '#000000'
        }
    }

    const handleClickReaInf = () => {
        setNota({ pregunta: 'No', nota: 'Ninguna' })
        setExpanded(false)
        setSelectQuote([])
        setIsHidden1(false)
        setOpen2(true)
    }

    const handleChange3 = (event) => {
        const value = event.target.value
        const name = event.target.name

        if (value === 'No') {
            setIsDisabled2(true)
            nota.nota = 'Ninguna'

        } else {
            setIsDisabled2(false)
            nota.nota = ''
        }

        setNota({
            ...nota,
            [name]: value
        });
    };

    const handleClickGuardarInfo = async () => {

        if (servicio2.length === 0) {
            setErrorMessage('Por favor selecciona los servicios primero')
            return
        }

        const body1 = {
            'clid': quote.clid,
            'mcid': quote.mcid,
            'fecha': quote.fecha,
            'hora': quote.hora,
            'estado': 'Atendido'
        }

        await fetch(`http://localhost:4000/quotes/${quote.ctsid}`, {
            method: 'PUT',
            body: JSON.stringify(body1),
            headers: { "content-Type": "application/json" }
        })

        const idMiembro = Number(sessionStorage.getItem('id'));
        const notaBody = nota.nota;
        const idCita = quote.ctsid;

        const body = {
            'mbid': idMiembro,
            'nota': notaBody,
            'ctsid': idCita
        }

        const res = await fetch('http://localhost:4000/reports', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        var id = []

        for (let i = 0; i < servicio2.length; i++) {
            for (let j = 0; j < servicios.length; j++) {
                if (servicio2[i] === servicios[j].nombre) {
                    id.push(servicios[j].svid)
                }
            }
        }

        for (let i = 0; i < id.length; i++) {
            var body2 = {
                'ifid': data.ifid,
                'svid': id[i]
            }
            await fetch('http://localhost:4000/reportsServices', {
                method: 'POST',
                body: JSON.stringify(body2),
                headers: { "content-Type": "application/json" }
            })
        }

        window.location.reload()
    }

    const handleClick3 = () => {
        setErrorMessage("");
    }

    const handleClose = () => {
        setOpen2(false);
    };

    const handleChange2 = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setSelectQuote([])
        setIsHidden1(false)
    };

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
                        onClick={handleClick3}
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
                        <Grid
                            container
                            mt='15px'
                            width='100%'
                            direction='row'
                            justifyContent='start'>
                            <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <Typography>¿Deseas agregar alguna nota sobre la cita?</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <Typography></Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            mt='15px'
                            width='100%'
                            direction='row'
                            justifyContent='start'>
                            <Grid container paddingRight='10px' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Horario</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={nota.pregunta}
                                        name='pregunta'
                                        label="Horario"
                                        onChange={handleChange3}>
                                        <MenuItem value='Si'>Si</MenuItem>
                                        <MenuItem value='No'>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container paddingLeft='10px' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <TextField
                                    label='Nota'
                                    fullWidth
                                    disabled={isDisabled2}
                                    name='nota'
                                    value={nota.nota}
                                    onChange={handleChange3}>

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            mt='15px'
                            width='100%'
                            direction='row'
                            justifyContent='start'>
                            <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <Typography>¿Qué servicios prestaste en la cita?</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <Typography></Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            mt='15px'
                            width='100%'
                            direction='row'
                            justifyContent='start'>
                            <Grid container paddingRight='10px' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label2">Servicios</InputLabel>
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label2"
                                        id="demo-simple-select2"
                                        value={servicio2}
                                        label="Servicios"
                                        onChange={handleChange5}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}>
                                        {servicios.map((servicio) => (
                                            <MenuItem
                                                key={servicio.svid}
                                                value={servicio.nombre}>
                                                {servicio.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Escoge uno o varios servicios, si ya no quieres un servicio solo dale click de nuevo para quitarlo</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button onClick={handleClickGuardarInfo} variant='outlined' sx={{ borderRadius: '20px' }}>Guardar informe</Button>
                </Grid >
            </Backdrop >
            <Grid
                container
                direction='row'
                width='100vw'
                height='100vh'
                justifyContent='start'
                alignItems='center'>
                <EmployeeNavbar></EmployeeNavbar>
                <Grid
                    container
                    width='95vw'
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
                                <Typography variant='h6' fontSize='bold'>Citas</Typography>
                            </Grid>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange2('panel1')} sx={{ boxShadow: 'none', '&:hover': { bgcolor: '#F5F5F5', borderRadius: '20px', } }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ paddingRight: '5px', paddingLeft: '5px' }}
                                >
                                    <Typography>{'Citas pendientes de realizar informe (' + quotes1.length + ')'}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingRight: '10px', paddingLeft: '10px' }}>
                                    <Grid
                                        container
                                        height='43vh'
                                        overflow='scroll'
                                        alignItems='center'
                                        justifyContent='start'
                                        display='block'
                                        direction='column'
                                        sx={{
                                            '&::-webkit-scrollbar': {
                                                width: '8px',
                                                height: '8px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                },
                                            },
                                            '&::-webkit-scrollbar: horizontal': {
                                                display: 'none',
                                            },
                                        }}>
                                        {quotes1.map((quote1) => (
                                            <Grid
                                                component={Card}
                                                key={quote1.ctsid}
                                                id={quote1.ctsid}
                                                onClick={handleClickQuote}
                                                container
                                                justifyContent='space-between'
                                                alignItems='center'
                                                width='98%'
                                                border='1px solid #0265CD'
                                                borderRadius='20px'
                                                mb='10px'
                                                paddingRight='8px'
                                                paddingLeft='8px'
                                                boxShadow='none'
                                                bgcolor={colorFun(quote1.ctsid)}
                                                color={colorFun2(quote1.ctsid)}
                                                sx={{
                                                    height: '60px',
                                                    '&:hover': {
                                                        backgroundColor: '#0265CD',
                                                        color: '#ffffff',
                                                        cursor: 'pointer'
                                                    }
                                                }}>
                                                <Typography>{quote1.hora}</Typography>
                                                <Typography>{quote1.nombres}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange2('panel2')} sx={{ boxShadow: 'none', '&:hover': { bgcolor: '#F5F5F5', borderRadius: '20px', } }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ paddingRight: '5px', paddingLeft: '5px' }}
                                >
                                    <Typography>{'Citas del día (' + quotes2.length + ')'}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingRight: '10px', paddingLeft: '10px' }}>
                                    <Grid
                                        container
                                        height='43vh'
                                        overflow='scroll'
                                        alignItems='center'
                                        justifyContent='start'
                                        display='block'
                                        direction='column'
                                        sx={{
                                            '&::-webkit-scrollbar': {
                                                width: '8px',
                                                height: '8px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                },
                                            },
                                            '&::-webkit-scrollbar: horizontal': {
                                                display: 'none',
                                            },
                                        }}>
                                        {quotes2.map((quote2) => (
                                            <Grid
                                                component={Card}
                                                key={quote2.ctsid}
                                                id={quote2.ctsid}
                                                onClick={handleClickQuote}
                                                container
                                                justifyContent='space-between'
                                                alignItems='center'
                                                width='98%'
                                                border='1px solid #0265CD'
                                                borderRadius='20px'
                                                mb='10px'
                                                paddingRight='8px'
                                                paddingLeft='8px'
                                                boxShadow='none'
                                                bgcolor={colorFun(quote2.ctsid)}
                                                color={colorFun2(quote2.ctsid)}
                                                sx={{
                                                    height: '60px',
                                                    '&:hover': {
                                                        backgroundColor: '#0265CD',
                                                        color: '#ffffff',
                                                        cursor: 'pointer'
                                                    }
                                                }}>
                                                <Typography>{quote2.hora}</Typography>
                                                <Typography>{quote2.nombres}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange2('panel3')} sx={{ boxShadow: 'none', '&:hover': { bgcolor: '#F5F5F5', borderRadius: '20px', } }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ paddingRight: '5px', paddingLeft: '5px' }}
                                >
                                    <Typography>{'Resto de citas (' + quotes3.length + ')'}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingRight: '10px', paddingLeft: '10px' }}>
                                    <Grid
                                        container
                                        height='43vh'
                                        overflow='scroll'
                                        alignItems='center'
                                        justifyContent='start'
                                        display='block'
                                        direction='column'
                                        sx={{
                                            '&::-webkit-scrollbar': {
                                                width: '8px',
                                                height: '8px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                },
                                            },
                                            '&::-webkit-scrollbar: horizontal': {
                                                display: 'none',
                                            },
                                        }}>
                                        {quotes3.map((quote3) => (
                                            <Grid
                                                component={Card}
                                                key={quote3.ctsid}
                                                id={quote3.ctsid}
                                                onClick={handleClickQuote}
                                                container
                                                justifyContent='space-between'
                                                alignItems='center'
                                                width='98%'
                                                border='1px solid #0265CD'
                                                borderRadius='20px'
                                                mb='10px'
                                                paddingRight='8px'
                                                paddingLeft='8px'
                                                boxShadow='none'
                                                bgcolor={colorFun(quote3.ctsid)}
                                                color={colorFun2(quote3.ctsid)}
                                                sx={{
                                                    height: '60px',
                                                    '&:hover': {
                                                        backgroundColor: '#0265CD',
                                                        color: '#ffffff',
                                                        cursor: 'pointer'
                                                    }
                                                }}>
                                                <Typography>{quote3.hora}</Typography>
                                                <Typography>{quote3.nombres}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
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
                            <Typography mt='8px' mb='8px'>Seleciona una de las citas para ver su información.</Typography>
                        </div>
                        <div hidden={!isHidden1} style={{ width: '100%' }}>
                            <Typography variant='h6'>Información de la cita</Typography>
                            <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información del cliente
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='center'>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombre</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Correo electrónico</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Número de telefono</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Dirección</Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                        <Typography mt='8px' variant='body1'>{selectQuote.nombres + ' ' + selectQuote.apellidos}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.correo}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.telefono}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.direccion}</Typography>
                                    </Grid>
                                </Grid>
                            </Typography>
                            <Divider></Divider>
                            <Typography mb='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Datos de la mascota
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='center'>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombre</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Raza</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Edad</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Sexo</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>condicion</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography mt='8px' variant='body1'>{selectQuote.nombre}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.raza}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.edad}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.sexo}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.condicion}</Typography>
                                    </Grid>
                                    <Grid container justifyContent='center' item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Avatar sx={{ width: '160px', height: '160px' }}></Avatar>
                                    </Grid>
                                </Grid>
                            </Typography>
                            <Divider></Divider>
                            <Typography ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Horario y servicios
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='center'>
                                    <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Hora</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Servicios</Typography>
                                        <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Fecha</Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                        <Typography mt='8px' variant='body1'>{selectQuote.hora}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.servicios}</Typography>
                                        <Typography mt='8px' variant='body1'>{selectQuote.fecha}</Typography>
                                    </Grid>
                                </Grid>
                            </Typography>
                            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                <Fab
                                    disabled={isDisabled}
                                    onClick={handleClickReaInf}
                                    variant="extended"
                                    sx={{
                                        color: '#0265CD',
                                        position: 'absolute',
                                        bottom: 40,
                                        right: 40,
                                        textTransform: 'none',
                                    }}>
                                    <CheckIcon sx={{ mr: 1, }} />
                                    Realizar informe
                                </Fab>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}