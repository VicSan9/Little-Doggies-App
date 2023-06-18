import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Navbar from "./Navbar";
import { Container } from '@mui/system';
import { Backdrop, Grid, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Info from './Info';

export default function Products() {

  const theme = useTheme();
  const [activeStep1, setActiveStep1] = useState(0);
  const [activeStep2, setActiveStep2] = useState(0);
  const [activeStep3, setActiveStep3] = useState(0);
  const [products, setProducts] = useState([])
  const [maxSteps1, setMaxSteps1] = useState(0)
  const [maxSteps2, setMaxSteps2] = useState(0)
  const [maxSteps3, setMaxSteps3] = useState(0)
  const [open, setOpen] = useState(false);
  const [foto, setFoto] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const loadPorducts = async () => {
    const res = await fetch('http://localhost:4000/products', {
      method: 'GET',
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json()

    if (products.length === 0) {
      setProducts(data)
    }

    if (products.length != 0) {
      
      const maxSteps1 = products.filter(product => product.tipo === 'Limpieza').length
      setMaxSteps1(maxSteps1)

      const maxSteps2 = products.filter(product => product.tipo === 'Medicamento').length
      setMaxSteps2(maxSteps2)

      const maxSteps3 = products.filter(product => product.tipo === 'Accesorio').length
      setMaxSteps3(maxSteps3)
    }

    console.log(products)
  }

  useEffect(() => {
    loadPorducts();
  }, [products]);

  const handleNext1 = () => {
    setActiveStep1((prevActiveStep) => prevActiveStep + 4);
  };

  const handleBack1 = () => {
    setActiveStep1((prevActiveStep) => prevActiveStep - 4);
  };

  const handleNext2 = () => {
    setActiveStep2((prevActiveStep) => prevActiveStep + 4);
  };

  const handleBack2 = () => {
    setActiveStep2((prevActiveStep) => prevActiveStep - 4);
  };

  const handleNext3 = () => {
    setActiveStep3((prevActiveStep) => prevActiveStep + 4);
  };

  const handleBack3 = () => {
    setActiveStep3((prevActiveStep) => prevActiveStep - 4);
  };

  const handleClick = (event) => {
    const foto = event.currentTarget.id
    setOpen(true);
    setFoto(foto)
  };

  return (
    <>
      <Backdrop
        sx={{ backdropFilter: 'blur(5px)', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img
          src={process.env.PUBLIC_URL + "/" + foto}
          alt="foto"
          width='30%'>
        </img>
      </Backdrop>
      <Navbar></Navbar>
      <Container maxWidth='xl' fixed>
        <Typography mt='63px'></Typography>
        <Box sx={{ flexGrow: 1, bgcolor: '#F9F9F9' }}>
          <Typography paddingTop='20px' ml='70px' height='40px' fontWeight='bold' variant='h6'>Categoria</Typography>
          <Grid container width='100%' direction='row' alignItems='center' justifyContent='center'>
            {products.filter(product => product.tipo === 'Limpieza').slice(activeStep1, activeStep1 + 4).map((product) => (
              <Grid key={product.prid} container width='340px' direction='column'>
                <Paper
                  mt='10px'
                  component={Grid}
                  container
                  direction='column'
                  square
                  elevation={0}
                  sx={{
                    justifyContent: 'center',
                    width: '320px',
                    display: 'flex',
                    alignItems: 'center',
                    height: 500,
                    pl: 0,
                    bgcolor: '#FFFFFF',
                  }}>
                  <Box textAlign='center' sx={{ height: 405, maxWidth: 300, width: '100%', p: 0 }}>
                    <Link id={product.foto} onClick={handleClick}>
                      <img
                        src={process.env.PUBLIC_URL + "/" + product.foto}
                        width='300px'
                        alt="foto">
                      </img>
                    </Link>
                  </Box>
                  <Grid container>
                    <Grid item xl={9} ml='25px'>
                      <Typography fontWeight='bold' mt='10px'>{product.nombre}</Typography>
                      <Typography mt='5px'>{'$' + product.precio}</Typography>
                    </Grid>
                    <Grid container alignContent='center' item xl={1}>
                      <IconButton sx={{ mt: '10px' }}>
                        <AddShoppingCartIcon></AddShoppingCartIcon>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <MobileStepper
            variant="text"
            steps={maxSteps1}
            position="static"
            activeStep={activeStep1}
            sx={{ bgcolor: '#F9F9F9', ml: '50px', mr: '70px', paddingTop: '20px', paddingBottom: '20px' }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext1}
                disabled={activeStep1 >= maxSteps1 - 4}
              >
                Siguiente
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack1} disabled={activeStep1 === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Volver
              </Button>
            }
          />
        </Box>
        <Box sx={{ flexGrow: 1, bgcolor: '#F9F9F9' }}>
          <Typography paddingTop='20px' ml='70px' height='40px' fontWeight='bold' variant='h6'>Categoria</Typography>
          <Grid container width='100%' direction='row' alignItems='center' justifyContent='center'>
            {products.filter(product => product.tipo === 'Medicamento').slice(activeStep2, activeStep2 + 4).map((product) => (
              <Grid key={product.prid} container width='340px' direction='column'>
                <Paper
                  mt='10px'
                  component={Grid}
                  container
                  direction='column'
                  square
                  elevation={0}
                  sx={{
                    justifyContent: 'center',
                    width: '320px',
                    display: 'flex',
                    alignItems: 'center',
                    height: 500,
                    pl: 0,
                    bgcolor: '#FFFFFF',
                  }}>
                  <Box textAlign='center' sx={{ height: 405, maxWidth: 300, width: '100%', p: 0 }}>
                    <Link id={product.foto} onClick={handleClick}>
                      <img
                        src={process.env.PUBLIC_URL + "/" + product.foto}
                        width='300px'
                        alt="foto">
                      </img>
                    </Link>
                  </Box>
                  <Grid container>
                    <Grid item xl={9} ml='25px'>
                      <Typography fontWeight='bold' mt='10px'>{product.nombre}</Typography>
                      <Typography mt='5px'>{'$' + product.precio}</Typography>
                    </Grid>
                    <Grid container alignContent='center' item xl={1}>
                      <IconButton sx={{ mt: '10px' }}>
                        <AddShoppingCartIcon></AddShoppingCartIcon>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <MobileStepper
            variant="text"
            steps={maxSteps2}
            position="static"
            activeStep={activeStep2}
            sx={{ bgcolor: '#F9F9F9', ml: '50px', mr: '70px', paddingTop: '20px', paddingBottom: '20px' }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext2}
                disabled={activeStep2 >= maxSteps2 - 4}
              >
                Siguiente
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack2} disabled={activeStep2 === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Volver
              </Button>
            }
          />
        </Box>
        <Box sx={{ flexGrow: 1, bgcolor: '#F9F9F9' }}>
          <Typography paddingTop='20px' ml='70px' height='40px' fontWeight='bold' variant='h6'>Categoria</Typography>
          <Grid container width='100%' direction='row' alignItems='center' justifyContent='center'>
            {products.filter(product => product.tipo === 'Accesorio').slice(activeStep3, activeStep3 + 4).map((product) => (
              <Grid key={product.prid} container width='340px' direction='column'>
                <Paper
                  mt='10px'
                  component={Grid}
                  container
                  direction='column'
                  square
                  elevation={0}
                  sx={{
                    justifyContent: 'center',
                    width: '320px',
                    display: 'flex',
                    alignItems: 'center',
                    height: 500,
                    pl: 0,
                    bgcolor: '#FFFFFF',
                  }}>
                  <Box textAlign='center' sx={{ height: 405, maxWidth: 300, width: '100%', p: 0 }}>
                    <Link id={product.foto} onClick={handleClick}>
                      <img
                        src={process.env.PUBLIC_URL + "/" + product.foto}
                        width='300px'
                        alt="foto">
                      </img>
                    </Link>
                  </Box>
                  <Grid container>
                    <Grid item xl={9} ml='25px'>
                      <Typography fontWeight='bold' mt='10px'>{product.nombre}</Typography>
                      <Typography mt='5px'>{'$' + product.precio}</Typography>
                    </Grid>
                    <Grid container alignContent='center' item xl={1}>
                      <IconButton sx={{ mt: '10px' }}>
                        <AddShoppingCartIcon></AddShoppingCartIcon>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <MobileStepper
            variant="text"
            steps={maxSteps3}
            position="static"
            activeStep={activeStep3}
            sx={{ bgcolor: '#F9F9F9', ml: '50px', mr: '70px', paddingTop: '20px', paddingBottom: '20px' }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext3}
                disabled={activeStep3 >= maxSteps3 - 4}
              >
                Siguiente
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack3} disabled={activeStep3 === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Volver
              </Button>
            }
          />
        </Box>
      </Container>
      <Info></Info>
    </>
  )
}