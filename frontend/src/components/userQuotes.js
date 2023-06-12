import { Chip, FormHelperText, Button, Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";

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

export default function UserQuotes() {

  const [quotes, setQuotes] = useState([])

  const [quote, SetQuote] = useState([])

  const [id, setID] = useState('')

  const [isHidden, setIsHidden] = useState(false)

  const [isHidden2, setIsHidden2] = useState(false)

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

  const hora1 = '07:00:00'
  const hora2 = '08:30:00'
  const hora3 = '10:00:00'
  const hora4 = '13:00:00'
  const hora5 = '14:30:00'
  const hora6 = '16:00:00'

  const loadQuotes = async () => {

    const id = sessionStorage.getItem('id')

    const body = {
      "id": id
    }

    const res = await fetch(`http://localhost:4000/quotes3`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json();

    if (res.status === 404) {
      setQuotes([])
      return
    }
    setIsHidden(true)
    setQuotes(data)
  }

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleClickEdit = e => {
    const id = e.currentTarget.id
    setID(id)
    setIsHidden2(true)
  }

  const handleClickDelete = e => {
    const id = e.currentTarget.id
    setID(id)
    setAdvertenceMenssage('¿Estás seguro que quieres cancelar esta cita?')
  }

  const loadQuote = async () => {
    if (id === '') {
      return
    }

    const res = await fetch(`http://localhost:4000/quotes/${id}`, {
      method: 'GET',
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json()

    SetQuote(data)
  }

  useEffect(() => {
    loadQuote()
  }, [id]);

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

    const formattedDate = `${day}/${month + 1}/${year}`

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

    const body = {
      'clid': sessionStorage.getItem('id'),
      'estado': 'Espera',
      'mcid': quote.mcid,
      'fecha': formattedDate,
      'hora': horario,
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
      await fetch('http://localhost:4000/quotesServices', {
        method: 'POST',
        body: JSON.stringify(body2),
        headers: { "content-Type": "application/json" }
      })
    }

    window.location.reload()
  }

  return (
    <>
      {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
      {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
      <Navbar></Navbar>
      <Container maxWidth='xl' fixed>
        <div hidden={isHidden2}>
          <Grid
            container
            alignItems='center'
            height='100vh'>
            <Grid
              container
              alignItems='center'
              height='100vh'>
              <Grid
                mt='5vh'
                alignItems='center'
                justifyContent='center'
                height='82vh'
                item xs={4} sm={4} lg={4} md={4} xl={4}
                borderRight='2px solid #BABBBF'>
                <Grid
                  container
                  alignItems='star'
                  justifyContent='start'>
                  <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Información de las citas</Typography>
                  <Typography textAlign='start' ml='20px' mr='20px' mt='30px' mb='50px' variant="body1">
                    Aquí puedes ver y modificar las citas que has agendado
                    como tambien cancelarlas. Para cancelar una cita tienes
                    que hacerlo con 1 día de anticipación.
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                mt='5vh'
                alignItems='start'
                height='82vh'
                direction='column'
                item xs={8} sm={8} lg={8} md={8} xl={8}>
                <div hidden={isHidden}>
                  <Grid container direction='row'>
                    <Typography ml='20px' mt='20px'>
                      Aún no tienes citas programadas.
                    </Typography>
                    <Typography component={Link} color='#0265CD' style={{marginTop:'20px', marginLeft:'5px'}} to='/citas'>{'Programa una cita ahora'}</Typography>
                  </Grid>
                </div>
                {quotes.map((quote) => (
                  <Grid
                    key={quote.ctsid}
                    container
                    alignItems='start'
                    justifyContent='center'
                    direction='column'>
                    <Typography ml='20px' mt='20px' fontWeight='bold'>
                      Fecha: {quote.fecha}
                    </Typography>
                    <Grid
                      component={Box}
                      border='1px solid #BABBBF'
                      borderRadius='15px'
                      mt='5px'
                      mr='20px'
                      ml='20px'
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
                        mt='5px'
                        mb='5px'>
                        <Grid
                          item xs={2} sm={2} lg={2} md={2} xl={2}>
                          <Typography ml='10px'>
                            Hora:
                          </Typography>
                          <Typography ml='10px'>
                            {quote.hora}
                          </Typography>
                        </Grid>
                        <Grid
                          item xs={2} sm={2} lg={2} md={2} xl={2}>
                          <Typography>
                            Mascota:
                          </Typography>
                          <Typography>
                            {quote.nombre}
                          </Typography>
                        </Grid>
                        <Grid
                          item xs={6} sm={6} lg={6} md={6} xl={6}>
                          <Typography>
                            Servicios:
                          </Typography>
                          <Typography>
                            {quote.servicios}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          direction='row-reverse'
                          id={quote.ctsid}
                          item xs={2} sm={2} lg={2} md={2} xl={2}>
                          <IconButton id={quote.ctsid} onClick={handleClickDelete} sx={{ mr: '5px', ":hover": { color: "white" } }}>
                            <HighlightOffIcon></HighlightOffIcon>
                          </IconButton>
                          <IconButton id={quote.ctsid} onClick={handleClickEdit} sx={{ mr: '5px', ":hover": { color: "white" } }}>
                            <EditIcon></EditIcon>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div hidden={!isHidden2}>
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
                  <Typography textAlign='start' mt='20px' variant="h5" fontWeight='bold'>Edita tu cita</Typography>
                  <Typography textAlign='start' mr='40px' mt='30px' mb='30px' variant="body1">
                    Aquí podrás reprogramar tu cita para
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
                  >{'Reprogramar cita ✔'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container >
    </>
  )
}