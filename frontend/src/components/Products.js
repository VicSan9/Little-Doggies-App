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
import { AppBar, Backdrop, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Info from './Info';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Products() {

  const theme = useTheme();
  const [activeStep1, setActiveStep1] = useState(0);
  const [activeStep2, setActiveStep2] = useState(0);
  const [activeStep3, setActiveStep3] = useState(0);
  const [activeStep4, setActiveStep4] = useState(0);
  const [products, setProducts] = useState([])
  const [maxSteps1, setMaxSteps1] = useState(0)
  const [maxSteps2, setMaxSteps2] = useState(0)
  const [maxSteps3, setMaxSteps3] = useState(0)
  const [maxSteps4, setMaxSteps4] = useState(0)
  const [open, setOpen] = useState(false);
  const [foto, setFoto] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [search, setSearch] = useState({ search: '' })
  const [newProduct, setNewProduct] = useState([])
  const [shoppingCart, setShoppingCart] = useState(0)
  const [productList, setProductList] = useState([])

  const handleClose = () => {
    setOpen(false);
  };

  const navitate = useNavigate()

  const loadPorducts = async () => {
    const res = await fetch('http://localhost:4000/products', {
      method: 'GET',
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json()

    if (products.length === 0) {
      setProducts(data)
    }

    if (products.length !== 0) {
      const maxSteps1 = products.filter(product => product.tipo === 'Limpieza').length
      setMaxSteps1(maxSteps1)

      const maxSteps2 = products.filter(product => product.tipo === 'Medicamento').length
      setMaxSteps2(maxSteps2)

      const maxSteps3 = products.filter(product => product.tipo === 'Accesorio').length
      setMaxSteps3(maxSteps3)
    }
  }

  useEffect(() => {
    loadPorducts();
  },);

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

  const handleNext4 = () => {
    setActiveStep4((prevActiveStep) => prevActiveStep + 4);
  };

  const handleBack4 = () => {
    setActiveStep4((prevActiveStep) => prevActiveStep - 4);
  };

  const handleClick = (event) => {
    const foto = event.currentTarget.id
    setOpen(true);
    setFoto(foto)
  };

  const handleClange = e => {
    const value = e.target.value
    const name = e.target.name

    setSearch({
      ...search,
      [name]: value
    })

    if (value.trim() !== '') {
      setIsHidden(true)
      const newProduct = products.filter(product => product.nombre.toLowerCase().includes(value.toLowerCase().trim()) === true)
      const maxSteps4 = newProduct.length
      setNewProduct(newProduct)
      setMaxSteps4(maxSteps4)
    } else {
      setIsHidden(false)
    }
  }

  const loadNumProduct = () => {
    const list = JSON.parse(localStorage.getItem('productList'))
    const num = localStorage.getItem('numProductList')

    if(num != null && list != null){
      setShoppingCart(num)
      setProductList(list)
    }
  }

  useEffect(() => {
    loadNumProduct();
  },[]);

  const handleClickAdd = (e) => {
    const product = e.currentTarget.id
    productList.push(product)
    setShoppingCart(productList.length)
    localStorage.setItem('productList', JSON.stringify(productList))
    localStorage.setItem('numProductList', shoppingCart + 1)
  }

  const handleClickShoppCard = () => {
    navitate('/carrito')
  }

  const handleClickDelete = () => {
    setShoppingCart(0)
    setProductList([])
    localStorage.removeItem('productList')
    localStorage.removeItem('numProductList')
  }

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
      <AppBar
        sx={{
          borderTop: '1px solid #ffffff',
          mt: '62.5px',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          position: 'fixed',
          zIndex: '1'
        }}>
        <Container maxWidth='xl'
          fixed >
          <Grid container position='absulute'
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(50px)',
              borderRadius: '10px',
            }}
            height='90px'
            direction='row'
            justifyContent='center'
            alignItems="center"
            textAlign='center'>
            <Typography color='#000000' mr='20px'>Buscar:</Typography>
            <TextField
              onChange={handleClange}
              name='search'
              value={search.search}
              InputProps={{ sx: { borderRadius: '20px', height: '50px' } }}
              variant='outlined'
              sx={{
                mr: '15px',
                outline: '1000',
                width: '35%',
              }}>
            </TextField>
            <Tooltip title='Carrito de compras'>
              <IconButton
                onClick={handleClickShoppCard}
                aria-label="Carrito de compras"
                sx={{
                  mr: '10px',
                  '&:hover': {
                    color: '#0265CD'
                  }
                }}>
                <StyledBadge
                  badgeContent={shoppingCart} color='primary'>
                  <ShoppingCartIcon sx={{ fontSize: '30px' }} />
                </StyledBadge>
              </IconButton>
            </Tooltip>
            <Tooltip title='Limpiar carrito de compras'>
              <IconButton
                onClick={handleClickDelete}
                aria-label="Carrito de compras"
                sx={{
                  '&:hover': {
                    color: '#CD0227'
                  }
                }}>
                <RemoveShoppingCartIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Container>
      </AppBar>
      <Container maxWidth='xl' fixed>
        <div hidden={isHidden}>
          <Typography mt='126px'></Typography>
          <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>
            <Typography paddingTop='20px' ml='75px' mr='90px' borderBottom='1px solid #BABBBF' height='40px' fontWeight='bold' variant='h6'>Higiene</Typography>
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
                      height: 520,
                      pl: 0,
                      bgcolor: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#F5F5F5'
                      }
                    }}>
                    <Tooltip title='Ver foto' placement="right">
                      <Box textAlign='center' sx={{ height: 405, maxWidth: 300, width: '100%', p: 0 }}>
                        <Link id={product.foto} onClick={handleClick}>
                          <img
                            src={process.env.PUBLIC_URL + "/" + product.foto}
                            width='300px'
                            alt="foto">
                          </img>
                        </Link>
                      </Box>
                    </Tooltip>
                    <Grid container>
                      <Grid item xl={9} ml='25px'>
                        <Typography fontWeight='bold' mt='10px'>{product.nombre}</Typography>
                        <Typography mt='5px'>{'$' + product.precio}</Typography>
                      </Grid>
                      <Grid container alignContent='center' item xl={1}>
                        <Tooltip title='Agregar al carrito de compras'>
                          <IconButton id={product.prid} onClick={handleClickAdd} sx={{ mt: '10px', '&:hover': { color: '#0265CD' } }}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                          </IconButton>
                        </Tooltip>
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
              sx={{ bgcolor: '#ffffff', ml: '50px', mr: '70px', paddingTop: '20px', paddingBottom: '20px' }}
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
          <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>
            <Typography paddingTop='20px' ml='75px' mr='90px' borderBottom='1px solid #BABBBF' height='40px' fontWeight='bold' variant='h6'>Medicamentos</Typography>
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
                      height: 520,
                      pl: 0,
                      bgcolor: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#F5F5F5'
                      }
                    }}>
                    <Tooltip title='Ver foto' placement="right">
                      <Box textAlign='center' sx={{ height: 405, maxWidth: 300, width: '100%', p: 0 }}>
                        <Link id={product.foto} onClick={handleClick}>
                          <img
                            src={process.env.PUBLIC_URL + "/" + product.foto}
                            width='300px'
                            alt="foto">
                          </img>
                        </Link>
                      </Box>
                    </Tooltip>
                    <Grid container>
                      <Grid item xl={9} ml='25px'>
                        <Typography fontWeight='bold' mt='10px'>{product.nombre}</Typography>
                        <Typography mt='5px'>{'$' + product.precio}</Typography>
                      </Grid>
                      <Grid container alignContent='center' item xl={1}>
                        <Tooltip title='Agregar al carrito de compras'>
                          <IconButton id={product.prid} onClick={handleClickAdd} sx={{ mt: '10px', '&:hover': { color: '#0265CD' } }}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                          </IconButton>
                        </Tooltip>
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
              sx={{ bgcolor: '#ffffff', ml: '50px', mr: '70px', paddingTop: '20px', paddingBottom: '20px' }}
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
          <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>
            <Typography paddingTop='20px' ml='75px' mr='90px' borderBottom='1px solid #BABBBF' height='40px' fontWeight='bold' variant='h6'>Accesorios</Typography>
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
                      height: 520,
                      pl: 0,
                      bgcolor: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#F5F5F5'
                      }
                    }}>
                    <Tooltip title='Ver foto' placement="right">
                      <Box textAlign='center' sx={{ height: 405, maxWidth: 300, width: '100%', p: 0 }}>
                        <Link id={product.foto} onClick={handleClick}>
                          <img
                            src={process.env.PUBLIC_URL + "/" + product.foto}
                            width='300px'
                            alt="foto">
                          </img>
                        </Link>
                      </Box>
                    </Tooltip>
                    <Grid container>
                      <Grid item xl={9} ml='25px'>
                        <Typography fontWeight='bold' mt='10px'>{product.nombre}</Typography>
                        <Typography mt='5px'>{'$' + product.precio}</Typography>
                      </Grid>
                      <Grid container alignContent='center' item xl={1}>
                        <Tooltip title='Agregar al carrito de compras'>
                          <IconButton id={product.prid} onClick={handleClickAdd} sx={{ mt: '10px', '&:hover': { color: '#0265CD' } }}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                          </IconButton>
                        </Tooltip>
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
              sx={{ bgcolor: '#ffffff', ml: '50px', mr: '70px', paddingTop: '20px', paddingBottom: '20px' }}
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
        </div>
        <div hidden={!isHidden}>
          <Typography mt='126px'></Typography>
          <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>
            <Typography paddingTop='20px' ml='75px' mr='90px' borderBottom='1px solid #BABBBF' height='40px' fontWeight='bold' variant='h6'>Resultados de busqueda</Typography>
            <Grid container width='100%' direction='row' alignItems='center' justifyContent='center'>
              {newProduct.slice(activeStep4, activeStep4 + 4).map((product) => (
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
                      height: 520,
                      pl: 0,
                      bgcolor: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#F5F5F5'
                      }
                    }}>
                    <Tooltip title='Ver foto' placement="right">
                      <Box textAlign='center' sx={{ height: 405, maxWidth: 300, width: '100%', p: 0 }}>
                        <Link id={product.foto} onClick={handleClick}>
                          <img
                            src={process.env.PUBLIC_URL + "/" + product.foto}
                            width='300px'
                            alt="foto">
                          </img>
                        </Link>
                      </Box>
                    </Tooltip>
                    <Grid container>
                      <Grid item xl={9} ml='25px'>
                        <Typography fontWeight='bold' mt='10px'>{product.nombre}</Typography>
                        <Typography mt='5px'>{'$' + product.precio}</Typography>
                      </Grid>
                      <Grid container alignContent='center' item xl={1}>
                        <Tooltip title='Agregar al carrito de compras'>
                          <IconButton id={product.prid} onClick={handleClickAdd} sx={{ mt: '10px', '&:hover': { color: '#0265CD' } }}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <MobileStepper
              variant="text"
              steps={maxSteps4}
              position="static"
              activeStep={activeStep4}
              sx={{ bgcolor: '#ffffff', ml: '50px', mr: '70px', paddingTop: '20px', paddingBottom: '20px' }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext4}
                  disabled={activeStep4 >= maxSteps4 - 4}
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
                <Button size="small" onClick={handleBack4} disabled={activeStep4 === 0}>
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
        </div>
      </Container>
      <Info></Info>
    </>
  )
}