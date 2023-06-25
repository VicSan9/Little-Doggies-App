import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Backdrop, Box, Button, Card, Chip, Divider, Fab, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PersonIcon from '@mui/icons-material/Person';

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
    const [open, setOpen] = React.useState(false);
    const [clients, setClients] = useState([])

    const [quote, SetQuote] = useState([])
    const [id, setID] = useState('')
    const [isHidden, setIsHidden] = useState(true)
    //const [isHidden2, setIsHidden2] = useState(false)
    const [value, setValue] = useState(null);
    const [fecha, setFecha] = useState({ fecha: '' })
    const [servicios, setServicios] = useState([])
    const [servicio2, setServicio2] = useState([])
    const [horario, setHorario] = useState('');
    const [isLoggedIn1, setIsLoggedIn1] = useState(false);
    const [isLoggedIn2, setIsLoggedIn2] = useState(false);
    const [isLoggedIn3, setIsLoggedIn3] = useState(false);
    const [isLoggedIn4, setIsLoggedIn4] = useState(false);
    const [isLoggedIn5, setIsLoggedIn5] = useState(false);
    const [isLoggedIn6, setIsLoggedIn6] = useState(false);
    const [isDisable, setIsDisable] = useState(true)
    const [isDisable2, setIsDisable2] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");
    const [search, setSearch] = useState({ search: '' })

    const hora1 = '07:00:00'
    const hora2 = '08:30:00'
    const hora3 = '10:00:00'
    const hora4 = '13:00:00'
    const hora5 = '14:30:00'
    const hora6 = '16:00:00'

    /*
    const handleClickEdit = e => {
        const id = e.currentTarget.id
        setID(id)
    }

    const handleClickDelete = e => {
        const id = e.currentTarget.id
        setID(id)
        setAdvertenceMenssage('¿Estás seguro que quieres cancelar esta cita?')
    }
    */

    const handleClange = e => {
        const value = e.target.value
        const name = e.target.name

        setSearch({
            ...search,
            [name]: value
        })
    }

    const handleChange5 = (event) => {
        const {
            target: { value },
        } = event;
        setServicio2(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClick3 = () => {
        setErrorMessage("");
    }

    const handleClickAV2Can = () => {
        setAdvertenceMenssage("");
    }

    const handleClickAVConf = async () => {
        const body1 = {
            'clid': quote.clid,
            'mcid': quote.mcid,
            'fecha': quote.fecha,
            'hora': quote.hora,
            'estado': 'Cancelada'
        }

        await fetch(`http://localhost:4000/quotes/${quote.ctsid}`, {
            method: 'PUT',
            body: JSON.stringify(body1),
            headers: { "content-Type": "application/json" }
        })

        setAdvertenceMenssage("");

        window.location.reload()
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

    const AdvertenceComponent = ({ advertenceMenssage }) => {
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
                    <Typography color='#000000' mt='20px' variant="h5" fontWeight='bold'>Advertencia</Typography>
                    <p>{advertenceMenssage}</p>
                    <Button variant="outlined"
                        size='medium'
                        onClick={handleClickAV2Can}
                        sx={{
                            color: '#0265CD',
                            width: '80px',
                            mt: '20px',
                            borderColor: '#0265CD',
                            borderRadius: '50px',
                            textTransform: 'none'
                        }}> Volver
                    </Button>
                    <Button variant="outlined"
                        size='medium'
                        onClick={handleClickAVConf}
                        sx={{
                            width: '80px',
                            color: '#0265CD',
                            mt: '20px',
                            ml: '20px',
                            borderColor: '#0265CD',
                            borderRadius: '50px',
                            textTransform: 'none'
                        }}> Confirmar
                    </Button>
                </Box>
            </Grid>
        );
    };

    const handleClick = async () => {
        if (sessionStorage.getItem('id') === null) {
            return
        }
        if (fecha.fecha === '') {
            setErrorMessage('Escoge un día primero')
            return
        }

        setIsDisable(false)
        setIsDisable2(true)

        const res = await fetch('http://localhost:4000/quotes2', {
            method: 'POST',
            body: JSON.stringify(fecha),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (res.status === 404) {
            setIsLoggedIn1(false)
            setIsLoggedIn2(false)
            setIsLoggedIn3(false)
            setIsLoggedIn4(false)
            setIsLoggedIn5(false)
            setIsLoggedIn6(false)
            return
        }

        var i = 0
        while (i <= data.length - 1) {
            if (data[i].hora === hora1) {
                setIsLoggedIn1(true)
                break
            }
            setIsLoggedIn1(false)
            i += 1
        }

        var i2 = 0
        while (i2 <= data.length - 1) {
            if (data[i2].hora === hora2) {
                setIsLoggedIn2(true)
                break
            }
            setIsLoggedIn2(false)
            i2 += 1
        }

        var i3 = 0
        while (i3 <= data.length - 1) {
            if (data[i3].hora === hora3) {
                setIsLoggedIn3(true)
                break
            }
            setIsLoggedIn3(false)
            i3 += 1
        }

        var i4 = 0
        while (i4 <= data.length - 1) {
            if (data[i4].hora === hora4) {
                setIsLoggedIn4(true)
                break
            }
            setIsLoggedIn4(false)
            i4 += 1
        }

        var i5 = 0
        while (i5 <= data.length - 1) {
            if (data[i5].hora === hora5) {
                setIsLoggedIn5(true)
                break
            }
            setIsLoggedIn5(false)
            i5 += 1
        }

        var i6 = 0
        while (i6 <= data.length - 1) {
            if (data[i6].hora === hora6) {
                setIsLoggedIn6(true)
                break
            }
            setIsLoggedIn6(false)
            i6 += 1
        }
    }

    useEffect(() => {
    }, [isLoggedIn1]);

    useEffect(() => {
    }, [isLoggedIn2]);

    useEffect(() => {
    }, [isLoggedIn3]);

    useEffect(() => {
    }, [isLoggedIn4]);

    useEffect(() => {
    }, [isLoggedIn5]);

    useEffect(() => {
    }, [isLoggedIn6]);

    const handleClick2 = () => {
        setIsDisable(true)
        setIsDisable2(false)
        setHorario('')
        setServicio2([])
    }

    useEffect(() => {
    }, [isDisable]);

    const handleChange = (event) => {
        setHorario(event.target.value);
    };

    const onChange = async (newValue) => {

        const date = newValue

        const day = (dayjs(date).date())
        const month = (dayjs(date).month())
        const year = (dayjs(date).year())

        const monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const formattedDate = `${day} de ${monthName[month]} del ${year}`

        setValue(newValue)

        setFecha({
            fecha: formattedDate
        })
    }

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

    const onClick = async () => {
        if (sessionStorage.getItem('id') === null) {
            return
        }
        if (horario === '') {
            setErrorMessage('Por favor selecciona un horario primero')
            return
        }
        if (servicio2.length === 0) {
            setErrorMessage('Por favor selecciona los servicios primero')
            return
        }

        const day = (dayjs(value).date())
        const month = (dayjs(value).month())
        const year = (dayjs(value).year())

        const monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const formattedDate = `${day} de ${monthName[month]} del ${year}`

        const body = {
            'clid': sessionStorage.getItem('id'),
            'estado': 'Espera',
            'mcid': quote.mcid,
            'fecha': formattedDate,
            'hora': horario,
        }

        const res = await fetch('http://localhost:4000/quotes', {
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
                'ctsid': data.ctsid,
                'svid': id[i]
            }
            await fetch('http://localhost:4000/quotesServices', {
                method: 'POST',
                body: JSON.stringify(body2),
                headers: { "content-Type": "application/json" }
            })
        }

        window.location.reload()
    }

    const handleChange2 = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setSelectQuote([])
        setIsHidden1(false)
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
        loadQuotes2()
    }, [])

    const handleClickQuote = async (e) => {
        const id = Number(e.currentTarget.id)
        setIsHidden1(true)
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

        const res = await fetch(`http://localhost:4000/quotes/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        SetQuote(data)
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

    const handleClicNewQuote = async () => {
        setOpen(true)

        const res = await fetch(`http://localhost:4000/clients`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setClients(data)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const onClickVolver = () => {
        setIsHidden(true)
    }

    const onClickSiguiente = () => {
        setIsHidden(false)
    }

    return (
        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
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
                    <div hidden={isHidden}>
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
                            height='65vh'>
                            <Grid
                                alignItems='start'
                                justifyContent='center'
                                height='65vh'
                                item xs={6} sm={6} lg={6} md={6} xl={6}
                                borderRight='1px solid #BABBBF'
                                overflow='scroll'
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
                                <Grid
                                    container
                                    alignItems='star'
                                    justifyContent='start'>
                                    <Typography textAlign='start' variant="h6" fontWeight='bold'>Programa citas</Typography>
                                    <Typography textAlign='start' mr='40px' mt='10px' mb='10px' variant="body1">
                                        Aquí podrás programar citas para tus clientes, por favor asegúrate de
                                        escoger el día en el calendario, darle click en confirmar y luego seleccionar el
                                        horario, por último escoge los servicios que necesitara el cliente.
                                    </Typography>
                                    <Grid
                                        container
                                        justifyContent='center'
                                        alignItems='center'
                                        direction='column'
                                        mr='20px'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                                <DemoItem>
                                                    <DateCalendar
                                                        disabled={isDisable2}
                                                        disablePast={true}
                                                        value={value}
                                                        onChange={onChange}
                                                        shouldDisableDate={shouldDisableDate}
                                                        sx={{ margin: '0px' }} />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <Button
                                            sx={{ mb: '20px', borderRadius: '20px' }}
                                            fullWidth
                                            disabled={isDisable2}
                                            variant="outlined"
                                            onClick={handleClick}
                                        >{'Confirmar ➦'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                height='85vh'
                                item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <Grid container mt='20px' ml='20px' mr='20px' width='auto'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Horario</InputLabel>
                                        <Select
                                            disabled={isDisable}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={horario}
                                            label="Horario"
                                            onChange={handleChange}>
                                            <MenuItem disabled={isLoggedIn1} value={hora1}>7:00 A.M</MenuItem>
                                            <MenuItem disabled={isLoggedIn2} value={hora2}>8:30 A.M</MenuItem>
                                            <MenuItem disabled={isLoggedIn3} value={hora3}>10:00 A.M</MenuItem>
                                            <MenuItem disabled={isLoggedIn4} value={hora4}>1:00 P.M</MenuItem>
                                            <MenuItem disabled={isLoggedIn5} value={hora5}>2:30 P.M</MenuItem>
                                            <MenuItem disabled={isLoggedIn6} value={hora6}>4:00 P.M</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth sx={{ mt: '20px' }}>
                                        <InputLabel id="demo-simple-select-label2">Servicios</InputLabel>
                                        <Select
                                            multiple
                                            disabled={isDisable}
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
                                    <Button
                                        sx={{ mt: '40px', borderRadius: '20px' }}
                                        fullWidth
                                        disabled={isDisable}
                                        variant="outlined"
                                        onClick={handleClick2}
                                    >{'⮪ Cambiar fecha'}
                                    </Button>
                                    <Button
                                        sx={{ mt: '20px', borderRadius: '20px' }}
                                        fullWidth
                                        disabled={isDisable}
                                        variant="outlined"
                                        onClick={onClick}
                                    >{'Programar cita ✔'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <IconButton onClick={onClickVolver} sx={{ borderRadius: '20px', '&:hover': { color: '#0265CD', bgcolor: '#FFFFFF' } }}>
                            <Typography>{'⮪ Volver'}</Typography>
                        </IconButton>
                    </div>
                    <div hidden={!isHidden} style={{ width: '100%' }}>
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
                            height='65vh'>
                            <Grid
                                alignItems='start'
                                justifyContent='center'
                                height='65vh'
                                item xs={6} sm={6} lg={6} md={6} xl={6}
                                borderRight='1px solid #BABBBF'>
                                <Grid
                                    container
                                    alignItems='star'
                                    justifyContent='start'
                                    direction='column'
                                    height='100%'>
                                    <Typography textAlign='start' variant="h6" fontWeight='bold'>Crea una nueva cita</Typography>
                                    <Typography textAlign='start' mr='40px' mt='10px' mb='10px' variant="body1">Selecione el cliente</Typography>
                                    <Grid
                                        container
                                        direction='column'
                                        width='90%'
                                        height='80%'
                                        borderRadius='20px'
                                        backgroundColor='#F5F5F5'
                                        border='1px solid #F5F5F5'>
                                        <Grid
                                            mt='15px'
                                            container
                                            direction='row'
                                            alignItems='center'
                                            justifyContent='center'>
                                            <Typography mr='10px'>{'Buscar '}</Typography>
                                            <TextField
                                                variant='outlined'
                                                onChange={handleClange}
                                                name='search'
                                                value={search.search}
                                                InputProps={{ sx: { borderRadius: '20px', height: '50px' } }}
                                                sx={{
                                                    width: '80%',
                                                }}>
                                            </TextField>
                                        </Grid>
                                        <Grid
                                            container
                                            direction='column'
                                            display='block'
                                            overflow='scroll'
                                            height='78%'
                                            alignItems='center'
                                            justifyContent='center'
                                            paddingLeft='20px'
                                            paddingRight='10px'
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
                                            {clients.filter(client => client.nombres.toLowerCase().includes(search.search.toLowerCase().trim()) === true || client.apellidos.toLowerCase().includes(search.search.toLowerCase().trim()) === true).map((client) => (
                                                <Grid
                                                    key={client.clid}
                                                    component={Button}
                                                    container
                                                    width='100%'
                                                    height='70px'
                                                    border='1px solid #0265CD'
                                                    borderRadius='20px'
                                                    alignItems='center'
                                                    justifyContent='space-between'
                                                    mt='15px'
                                                    sx={{
                                                        p:'0px',
                                                        color:'#000000',
                                                        textTransform:'none',
                                                        '&:hover': {
                                                            backgroundColor: '#0265CD',
                                                            color: '#FFFFFF',
                                                        }
                                                    }}>
                                                    <Box ml='10px' width='60px' height='60px' border='1px solid #000000' borderRadius='90px' textAlign='center'>
                                                        <PersonIcon sx={{ mt: '10px', color: '#000000', fontSize: 40 }}></PersonIcon>
                                                    </Box>
                                                    <Typography mr='10px' overflow='hidden'>{client.nombres + ' ' + client.apellidos}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                height='100%'
                                item xs={6} sm={6} lg={6} md={6} xl={6}>
                                <Grid container ml='20px' mr='20px' width='auto'>
                                    <Typography>Seleciona la mascota</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            width='100%'
                            direction='row'
                            justifyContent='end'>
                            <IconButton onClick={onClickSiguiente} sx={{ borderRadius: '20px', '&:hover': { color: '#0265CD', bgcolor: '#FFFFFF' } }}>
                                <Typography>{'Siguiente ➦'}</Typography>
                            </IconButton>
                        </Grid>
                    </div>
                </Grid>
            </Backdrop>
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
                                <IconButton onClick={handleClicNewQuote} sx={{ width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                    <Typography>+</Typography>
                                </IconButton>
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
