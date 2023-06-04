import { Container, Grid, Typography } from "@mui/material";
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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(event.target.value)
    };

    const shouldDisableDate = (date) => {
        // Get the day of the week from the date
        const day = dayjs(date).day();

        // Disable Saturday and Sunday
        return day === 6 || day === 0;
    };

    const onChange = (newValue) => {
        setValue(newValue)
    }

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
                            <Typography textAlign='start' mr='20px' mt='50px' mb='50px' variant="body1">
                                Aquí podrás programar tus citas para
                                el día que desees, por favor asegúrate de
                                escoger el día en el calendario y luego seleccionar el
                                horario que más se adecue a tus necesidades, por último
                                escoge los servicios que necesitarás para tu mascota.
                            </Typography>
                            <Grid
                                container
                                justifyContent='center'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                        <DemoItem>
                                            <DateCalendar
                                                disablePast={true}
                                                value={value}
                                                onChange={onChange}
                                                shouldDisableDate={shouldDisableDate}
                                                sx={{ margin: '0px' }} />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        height='85vh'
                        item xs={6} sm={6} lg={6} md={6} xl={6}>
                        <Grid container mt='20px' ml='20px' mr='20px' width='auto'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}