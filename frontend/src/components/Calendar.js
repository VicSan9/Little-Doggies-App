import { Button, Container, Grid, Typography } from "@mui/material";
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


export default function Calendar() {
    const [value, setValue] = React.useState(null);

    const [fecha, setFecha] = React.useState({ fecha: '' })

    const [servicios, setServicios] = React.useState([])

    const [citas, setCitas] = React.useState([])

    const [servicio, setServicio] = React.useState('')

    const [horario, setHorario] = React.useState('');

    const [isLoggedIn1, setIsLoggedIn1] = React.useState(true);

    const [isDisable, setIsDisable] = React.useState(true)

    const [isDisable2, setIsDisable2] = React.useState(false)

    const hora1 = '7:00:00'
    const hora2 = '8:30:00'
    const hora3 = '10:00:00'
    const hora4 = '13:00:00'
    const hora5 = '14:30:00'
    const hora6 = '16:00:00'

    const isDisabled1 = () => {
       // var i = 0
        //while (i <= citas.length + 1){
       //     if(citas.hora[i] === hora1){
       //         setIsLoggedIn1(false)
       //     }
       // }
    };

    const handleClick = async () => {
        setIsDisable(false)
        setIsDisable2(true)

        const res = await fetch('http://localhost:4000/quotes2', {
            method: 'POST',
            body: JSON.stringify(fecha),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setCitas(data)
    }

    const handleClick2 = () => {
        setIsDisable(true)
        setIsDisable2(false)
        setHorario('')
        setServicio('')
    }

    React.useEffect(() => {
    }, [isDisable]);

    const handleChange = (event) => {
        setHorario(event.target.value);
        console.log(event.target.value)
    };

    const handleChange2 = (event) => {
        setServicio(event.target.value);
        console.log(event.target.value)
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

    return (
        <>
            <Navbar></Navbar>
            <Container
                maxWidth='xl'
                fixed>
                <Grid
                    mt='88px'
                    container
                    height='85vh'>
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
                            <Typography textAlign='start' mr='20px' mt='30px' mb='30px' variant="body1">
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
                                    fullWidth
                                    disabled={isDisable2}
                                    variant="text"
                                    onClick={handleClick}
                                >{'Confirmar ->'}
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
                                    <MenuItem disabled={isDisabled1()} value={hora1}>7:00 A.M</MenuItem>
                                    <MenuItem disabled={false} value={hora2}>8:30 A.M</MenuItem>
                                    <MenuItem disabled={false} value={hora3}>10:00 A.M</MenuItem>
                                    <MenuItem disabled={false} value={hora4}>1:00 P.M</MenuItem>
                                    <MenuItem disabled={false} value={hora5}>2:30 P.M</MenuItem>
                                    <MenuItem disabled={false} value={hora6}>4:00 P.M</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: '20px' }}>
                                <InputLabel id="demo-simple-select-label2">Servicios</InputLabel>
                                <Select
                                    disabled={isDisable}
                                    labelId="demo-simple-select-label2"
                                    id="demo-simple-select2"
                                    value={servicio}
                                    label="Servicios"
                                    onChange={handleChange2}>
                                    {servicios.map((servicio) => (
                                        <MenuItem key={servicio.svid} value={servicio.svid}>{servicio.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                sx={{ mt: '40px' }}
                                fullWidth
                                disabled={isDisable}
                                variant="text"
                                onClick={handleClick2}
                            >{' <- Cambiar fecha'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}