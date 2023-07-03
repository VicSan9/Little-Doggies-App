import { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid, Typography, IconButton, Backdrop, Button, Box, Card, Divider, TextField, Tooltip, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
//import fs from 'fs-extra'

export default function AdminClient() {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [isHidden1, setIsHidden1] = useState(false)
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({ nombre: '', tipo: '', precio: '', cantidad: '', foto: '', estado: 'Activo' })
    const [errorMessage, setErrorMessage] = useState("");
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");
    const [newProduct, setNewProduct] = useState({ nombre: '', tipo: '', precio: '', cantidad: '', foto: 'Foto.png', estado: 'Activo' })
    const [search, setSearch] = useState({ search: '' })

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
    };

    const handleClicNewService = async () => {
        setOpen(true)
    }

    const handleClickEdit = e => {
        setOpen1(true)
    }

    const handleClickDelete = e => {
        setAdvertenceMenssage('¿Estás seguro que quieres eliminar este producto?')
    }

    /* const handleChangePic = async (event) => {
        const { files } = event.target;
        const img = files[0];

        // Save the image to the process.env.PUBLIC_URL folder
        const imgPath = `${process.env.PUBLIC_URL}/${img.name}`;
        //await fs.writeFile(imgPath, img.content);
    }; */

    const handleClickAV2Can = () => {
        setAdvertenceMenssage("");
    }

    const handleClickAVConf = async () => {

        const body = { 
            'nombre': product.nombre, 
            'tipo': product.tipo, 
            'precio': product.precio, 
            'cantidad': product.cantidad, 
            'foto': 'Foto.png',
            'estado' : 'Eliminado'
        }

        await fetch(`http://localhost:4000/products/${product.prid}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        setAdvertenceMenssage("");

        window.location.reload();
    }

    const handleClick3 = () => {
        setErrorMessage("");
    }

    const colorFun = (id) => {
        if (Number(id) === product.prid) {
            return '#0265CD'
        } else {
            return 'transparent'
        }
    }

    const colorFun2 = (id) => {
        if (Number(id) === product.prid) {
            return '#FFFFFF'
        } else {
            return '#000000'
        }
    }

    const handleChange = e => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleChange2 = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const loadProducts = async () => {

        const res = await fetch(`http://localhost:4000/products2`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setProducts(data)
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const handleClickProduct = async (e) => {

        const id = Number(e.currentTarget.id)

        setIsHidden1(true)

        const res = await fetch(`http://localhost:4000/products/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setProduct(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newProduct.nombre.trim() === '' || newProduct.tipo.trim() === '' || newProduct.precio.trim() === '' || newProduct.cantidad.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            setNewProduct({ nombre: '', tipo: '', precio: '', cantidad: '', foto: 'Foto.png', estado: 'Activo' })
            return
        }

        const res = await fetch('http://localhost:4000/products', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (!data.message) {
            window.location.reload();
            return
        }
    }

    const handleSubmit2 = async (e) => {
        e.preventDefault();

        console.log(product)

        if (product.nombre.trim() === '' || product.tipo.trim() === '') {
            setErrorMessage("Ingrese todos los datos primero");
            return
        }

        const res = await fetch(`http://localhost:4000/products/${product.prid}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        if (!data.message) {
            window.location.reload();
            return
        }
    }

    const ErrorComponent = ({ errorMessage }) => {
        return (
            <Grid container
                zIndex='3'
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
                zIndex='3'
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

    const handleClange = e => {
        const value = e.target.value
        const name = e.target.name

        setSearch({
            ...search,
            [name]: value
        })
    }

    return (
        <>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
            {advertenceMenssage && <AdvertenceComponent advertenceMenssage={advertenceMenssage} />}
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open1}>
                <Grid
                    container
                    alignItems='flex-start'
                    height='48vh'
                    width='70vw'
                    maxWidth='1200px'
                    maxHeight='600px'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='15px'
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
                        height='45vh'
                        maxHeight='550px'
                        alignItems='start'
                        component={'form'}
                        onSubmit={handleSubmit2}>
                        <Grid
                            container
                            width='100%'
                            justifyContent='center'
                            alignItems='center'
                            mb='10px'>
                            <Typography variant='h6'> Editar producto</Typography>
                        </Grid>
                        <Grid
                            container
                            width='100%'
                            justifyContent='start'
                            alignItems='start'
                            height='55%'>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="nombre"
                                        label="Nombre"
                                        variant="outlined"
                                        value={product.nombre}
                                        onChange={handleChange2}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tipo de producto</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={product.tipo}
                                            name='tipo'
                                            label="Tipo de producto"
                                            onChange={handleChange2}>
                                            <MenuItem value='Accesorio'>Accesorio</MenuItem>
                                            <MenuItem value='Medicamento'>Medicamento</MenuItem>
                                            <MenuItem value='Limpieza'>Limpieza</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="precio"
                                        label="Precio"
                                        variant="outlined"
                                        value={product.precio}
                                        onChange={handleChange2}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="cantidad"
                                        label="Cantidad"
                                        variant="outlined"
                                        value={product.cantidad}
                                        onChange={handleChange2}>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            paddingLeft='4vw'
                            paddingRight='4vw'
                            width='100%'
                            justifyContent='end'
                            mb='25px'>
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Registrar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Backdrop>
            <Backdrop
                sx={{ color: 'rgba(0,0,0,.2)', backdropFilter: 'blur(5px)', zIndex: 1 }}
                open={open}>
                <Grid
                    container
                    alignItems='flex-start'
                    height='48vh'
                    width='70vw'
                    maxWidth='1200px'
                    maxHeight='600px'
                    bgcolor='#ffffff'
                    borderRadius='20px'
                    paddingRight='15px'
                    paddingLeft='15px'
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
                        height='45vh'
                        maxHeight='550px'
                        alignItems='start'
                        component={'form'}
                        onSubmit={handleSubmit}>
                        <Grid
                            container
                            width='100%'
                            justifyContent='center'
                            alignItems='center'
                            mb='10px'>
                            <Typography variant='h6'>Registra un nuevo producto</Typography>
                        </Grid>
                        <Grid
                            container
                            width='100%'
                            justifyContent='start'
                            alignItems='start'
                            height='55%'>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="nombre"
                                        label="Nombre"
                                        variant="outlined"
                                        value={newProduct.nombre}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tipo de producto</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={newProduct.tipo}
                                            name='tipo'
                                            label="Tipo de producto"
                                            onChange={handleChange}>
                                            <MenuItem value='Accesorio'>Accesorio</MenuItem>
                                            <MenuItem value='Medicamento'>Medicamento</MenuItem>
                                            <MenuItem value='Limpieza'>Limpieza</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='center'
                                justifyContent='start'
                                direction='row'
                                width='100%'>
                                <Grid
                                    container
                                    paddingLeft='4vw'
                                    paddingRight='2vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="precio"
                                        label="Precio"
                                        variant="outlined"
                                        value={newProduct.precio}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    paddingLeft='2vw'
                                    paddingRight='4vw'
                                    item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <TextField
                                        fullWidth
                                        name="cantidad"
                                        label="Cantidad"
                                        variant="outlined"
                                        value={newProduct.cantidad}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            paddingLeft='4vw'
                            paddingRight='4vw'
                            width='100%'
                            justifyContent='end'
                            mb='25px'>
                            <Button type='submit' variant='outlined' sx={{ borderRadius: '20px' }}>Guardar</Button>
                        </Grid>
                    </Grid>
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
                            width='100%'
                            height='100%'
                            paddingLeft='16px'
                            paddingRight='2px'
                            direction='column'>
                            <Grid
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                width='100%'
                                mb='10px'
                            >
                                <Typography variant='h6' fontSize='bold'>{'Productos (' + products.length + ')'}</Typography>
                                <Tooltip title='Nuevo producto'>
                                    <IconButton onClick={handleClicNewService} sx={{ mr: '16px', width: 40, height: 40, bgcolor: '#F5F5F5', '&:hover': { bgcolor: '#BABBBF' } }}>
                                        <Typography>+</Typography>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid
                                mt='8px'
                                paddingRight='15px'
                                container
                                direction='row'
                                alignItems='center'
                                justifyContent='center'
                                mb='20px'>
                                <Typography mr='12px'>{'Buscar '}</Typography>
                                <TextField
                                    variant='outlined'
                                    onChange={handleClange}
                                    name='search'
                                    value={search.search}
                                    InputProps={{ sx: { borderRadius: '20px', height: '50px' } }}
                                    sx={{
                                        width: '77%',
                                    }}>
                                </TextField>
                            </Grid>
                            <Grid
                                container
                                height='77%'
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
                                {products.filter(product => product.nombre.toLowerCase().includes(search.search.toLowerCase().trim()) === true).map((product) => (
                                    <Grid
                                        component={Card}
                                        key={product.prid}
                                        id={product.prid}
                                        onClick={handleClickProduct}
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
                                        bgcolor={colorFun(product.prid)}
                                        color={colorFun2(product.prid)}
                                        sx={{
                                            height: '60px',
                                            '&:hover': {
                                                backgroundColor: '#0265CD',
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            }
                                        }}>
                                        <Typography textAlign='start' width='62%' overflow='hidden'>{product.nombre}</Typography>
                                        <Grid>
                                            <Tooltip title='Editar cliente'>
                                                <IconButton id={product.clid} onClick={handleClickEdit} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                    <EditIcon></EditIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Eliminar cliente'>
                                                <IconButton onClick={handleClickDelete} sx={{ width: '30px', height: '30px', ":hover": { color: "white" } }}>
                                                    <HighlightOffIcon></HighlightOffIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        height='100%'
                        justifyContent='start'
                        alignItems='start'
                        direction='column'
                        paddingLeft='16px'
                        paddingRight='2px'
                        item xs={8} sm={8} lg={8} md={8} xl={8}>
                        <Grid
                            container
                            height='100%'
                            overflow='scroll'
                            alignItems='center'
                            justifyContent='start'
                            display='block'
                            direction='column'
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
                            <div hidden={isHidden1}>
                                <Typography mt='8px' mb='8px'>Seleciona uno de los productos para ver su información.</Typography>
                            </div>
                            <div hidden={!isHidden1} style={{ width: '100%' }}>
                                <Typography variant='h6'>Información del producto</Typography>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>
                                    <Grid
                                        container
                                        alignItems='start'
                                        justifyContent='center'>
                                        <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombre del producto</Typography>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Sección</Typography>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Precio</Typography>
                                            <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Cantidad disponible</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                            <Typography mt='8px' variant='body1'>{product.nombre}</Typography>
                                            <Typography mt='8px' variant='body1'>{product.tipo}</Typography>
                                            <Typography mt='8px' variant='body1'>{product.precio}</Typography>
                                            <Typography mt='8px' variant='body1'>{product.cantidad}</Typography>
                                        </Grid>
                                    </Grid>
                                </Typography>
                                <Divider></Divider>
                                <Grid
                                    container
                                    width='100%'
                                    direction='row'
                                    alignItems='center'>
                                    <Typography variant='h6'>Foto</Typography>
                                </Grid>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='300px' sx={{ fontSize: '18px' }}>
                                    <Grid
                                        ml='15px'
                                        container
                                        alignItems='end'
                                        justifyContent='end'
                                        width='300px'
                                        height='400px'
                                        sx={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/" + product.foto})`, backgroundSize: 'cover' }}>
                                        <Tooltip title='Cambiar foto'>
                                            <IconButton
                                                sx={{ width: 30, height: 30, mb: '10px', mr: '10px', zIndex: '0' }}>
                                                <EditIcon></EditIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    {/* <TextField
                                        id="imgDer"
                                        type="file"
                                        onChange={handleChangePic}
                                    /> */}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}