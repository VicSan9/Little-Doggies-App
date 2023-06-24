import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Card, Divider, Fab, Grid, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';

export default function AdminQuotes() {
    const [expanded, setExpanded] = useState(false);
    const [quotes, setQuotes] = useState([])
    const [quotes1, setQuotes1] = useState([])
    const [quotes2, setQuotes2] = useState([])
    const [quotes3, setQuotes3] = useState([])
    const [selectQuote, setSelectQuote] = useState([])
    const [isHidden, setIsHidden] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setSelectQuote([])
        setIsHidden(false)
    };

    const loadQuotes = async () => {
        const res = await fetch(`http://localhost:4000/quotes4`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setQuotes(data)

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const today = new Date();

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        console.log(yesterday)
        console.log(today)
        console.log(tomorrow)

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

            if (date < yesterday) {
                yesterdayList.push(data[i]);
            } else if (date > today) {
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
        loadQuotes()
    }, [])

    const handleClickQuote = (e) => {
        const id = Number(e.currentTarget.id)
        setIsHidden(true)
        for (let i = 0; i < quotes.length; i++) {
            if (quotes[i].ctsid === id) {
                setSelectQuote(quotes[i])
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
                                <Typography variant='h6' fontSize='bold'>Citas</Typography>
                                <IconButton sx={{ width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                    <Typography>+</Typography>
                                </IconButton>
                            </Grid>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ boxShadow: 'none', '&:hover': { bgcolor: '#F5F5F5', borderRadius: '20px', } }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ paddingRight: '5px', paddingLeft: '5px' }}
                                >
                                    <Typography>{'Citas pendientes de realizar informe (' + quotes1.length + ')' }</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingRight: '10px', paddingLeft: '10px' }}>
                                    <Grid
                                        container
                                        height='45vh'
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
                                                <Grid>
                                                    <IconButton disabled={!isDisabled} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                    <IconButton disabled={!isDisabled} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                        <HighlightOffIcon></HighlightOffIcon>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ boxShadow: 'none', '&:hover': { bgcolor: '#F5F5F5', borderRadius: '20px', } }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ paddingRight: '5px', paddingLeft: '5px' }}
                                >
                                    <Typography>{'Citas del día (' + quotes2.length + ')' }</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingRight: '10px', paddingLeft: '10px' }}>
                                    <Grid
                                        container
                                        height='45vh'
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
                                                <Grid>
                                                    <IconButton sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                    <IconButton sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                        <HighlightOffIcon></HighlightOffIcon>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ boxShadow: 'none', '&:hover': { bgcolor: '#F5F5F5', borderRadius: '20px', } }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ paddingRight: '5px', paddingLeft: '5px' }}
                                >
                                    <Typography>{'Resto de citas (' + quotes3.length + ')' }</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingRight: '10px', paddingLeft: '10px' }}>
                                    <Grid
                                        container
                                        height='45vh'
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
                                                <Grid>
                                                    <IconButton sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                    <IconButton sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                        <HighlightOffIcon></HighlightOffIcon>
                                                    </IconButton>
                                                </Grid>
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
                        <div hidden={isHidden}>
                            <Typography mt='8px' mb='8px'>Seleciona una de las citas para ver su información.</Typography>
                        </div>
                        <div hidden={!isHidden} style={{ width: '100%' }}>
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
