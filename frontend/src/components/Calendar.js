import { Box, Button, Chip, Container, FormHelperText, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";

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

export default function Calendar() {
    const [value, setValue] = React.useState(null);

    const [fecha, setFecha] = React.useState({ fecha: '' })

    const [servicios, setServicios] = React.useState([])

    const [servicio2, setServicio2] = React.useState([])

    const [horario, setHorario] = React.useState('');

    const [isLoggedIn1, setIsLoggedIn1] = React.useState(false);

    const [isLoggedIn2, setIsLoggedIn2] = React.useState(false);

    const [isLoggedIn3, setIsLoggedIn3] = React.useState(false);

    const [isLoggedIn4, setIsLoggedIn4] = React.useState(false);

    const [isLoggedIn5, setIsLoggedIn5] = React.useState(false);

    const [isLoggedIn6, setIsLoggedIn6] = React.useState(false);

    const [isDisable, setIsDisable] = React.useState(true)

    const [isDisable2, setIsDisable2] = React.useState(false)

    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate()

    const hora1 = '07:00:00'
    const hora2 = '08:30:00'
    const hora3 = '10:00:00'
    const hora4 = '13:00:00'
    const hora5 = '14:30:00'
    const hora6 = '16:00:00'

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

    React.useEffect(() => {
    }, [isLoggedIn1]);

    React.useEffect(() => {
    }, [isLoggedIn2]);

    React.useEffect(() => {
    }, [isLoggedIn3]);

    React.useEffect(() => {
    }, [isLoggedIn4]);

    React.useEffect(() => {
    }, [isLoggedIn5]);

    React.useEffect(() => {
    }, [isLoggedIn6]);

    const handleClick2 = () => {
        setIsDisable(true)
        setIsDisable2(false)
        setHorario('')
        setServicio2([])
    }

    React.useEffect(() => {
    }, [isDisable]);

    const handleChange = (event) => {
        setHorario(event.target.value);
    };

    const onChange = async (newValue) => {

        const date = newValue

        const day = (dayjs(date).date())
        const month = (dayjs(date).month())
        const year = (dayjs(date).year())

        const formattedDate = `${day}/${month + 1}/${year}`

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

    React.useEffect(() => {
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

        const formattedDate = `${day}/${month + 1}/${year}`

        const body = {
            'clid': sessionStorage.getItem('id'),
            'mcid': localStorage.getItem('idMascota'),
            'fecha': formattedDate,
            'hora': horario,
            'estado': 'Espera',
        }

        var id = []

        for (let i = 0; i < servicio2.length; i++) {
            for (let j = 0; j < servicios.length; j++) {
                if (servicio2[i] === servicios[j].nombre) {
                    id.push(servicios[j].svid)
                }
            }
        }

        const res = await fetch('http://localhost:4000/quotes', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        for (let i = 0; i < id.length; i++) {
            var body2 = {
                'ctsid': data.ctsid,
                'svid': id[i]
            }
            const res2 = await fetch('http://localhost:4000/quotesServices', {
                method: 'POST',
                body: JSON.stringify(body2),
                headers: { "content-Type": "application/json" }
            })

            const data2 = await res2.json();

            console.log(data2)
        }

        navigate('/mis-citas')
    }

    const checkMascota = () => {
        if (localStorage.getItem('idMascota') === null) {
            navigate('/citas')
        }
    }

    React.useEffect(() => {
        checkMascota()
        return
    },)


    return (
        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            <Navbar></Navbar>
            <Container
                maxWidth='xl'
                fixed>
                <Grid
                    container
                    alignItems='center'
                    height='100vh'>
                    <Grid
                        container
                        height='78vh'>
                        <Grid
                            alignItems='star'
                            justifyContent='center'
                            height='85vh'
                            item xs={6} sm={6} lg={6} md={6} xl={6}
                            borderRight='2px solid #BABBBF'>
                            <Grid
                                container
                                alignItems='star'
                                justifyContent='start'>
                                <Typography textAlign='start' mt='20px' variant="h5" fontWeight='bold'>Agenda tu cita</Typography>
                                <Typography textAlign='start' mr='40px' mt='30px' mb='30px' variant="body1">
                                    Aquí podrás programar tus citas para
                                    el día que desees, por favor asegúrate de
                                    escoger el día en el calendario, darle clic en confirmar y luego seleccionar el
                                    horario que más se adecue a tus necesidades, por último
                                    escoge los servicios que necesitarás para tu mascota.
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
                                        sx={{ mt: '20px', borderRadius: '20px' }}
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
                                >{'Agendar cita ✔'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}