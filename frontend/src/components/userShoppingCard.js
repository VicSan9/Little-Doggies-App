import { Backdrop, Box, Button, Container, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function UserShoppingCart() {

    const [products, setProducts] = useState([])
    const [isHidden, setIsHidden] = useState(false)
    const [open, setOpen] = useState(false);
    const [advertenceMenssage, setAdvertenceMenssage] = useState("");

    const navigate = useNavigate()

    const loadProducts = async () => {

        const productsId = JSON.parse(localStorage.getItem('productList'))

        const products = []

        if (productsId === null) {
            setIsHidden(true)
            return
        }

        for (let i = 0; i < productsId.length; i++) {
            const res = await fetch(`http://localhost:4000/products/${productsId[i]}`, {
                method: 'GET',
                headers: { "content-Type": "application/json" }
            })
            const data = await res.json()
            products.push(data)
        }

        const uniqueArray = [];

        for (const item of products) {

            const found = uniqueArray.some((otherItem) => otherItem.prid === item.prid);

            if (!found) {
                uniqueArray.push({
                    ...item,
                    count: 1,
                });
            } else {
                const index = uniqueArray.findIndex((otherItem) => otherItem.prid === item.prid);
                uniqueArray[index].count++;
                if (uniqueArray[index].count >= products[index].cantidad) {
                    uniqueArray[index].count = products[index].cantidad;
                }
            }
        }
        setProducts(uniqueArray)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const handleClickRes = (e) => {
        const newState = []

        for (let i = 0; i < products.length; i++) {
            if (products[i].prid === Number(e.target.value)) {
                newState[i] = products[i]
                newState[i].count = products[i].count - 1;
                if (newState[i].count <= 0) {
                    newState[i].count = 0;
                }
            } else {
                newState[i] = products[i]
            }
        }
        setProducts(newState);
    }

    const handleClickSum = (e) => {
        const newState = []

        for (let i = 0; i < products.length; i++) {
            if (products[i].prid === Number(e.target.value)) {
                newState[i] = products[i]
                newState[i].count = products[i].count + 1;
                if (newState[i].count >= products[i].cantidad) {
                    newState[i].count = products[i].cantidad;
                }
            } else {
                newState[i] = products[i]
            }
        }
        setProducts(newState);
    }

    var totalPayable = 0;

    for (const product of products) {
        totalPayable += product.precio * product.count;
    }

    const handleClickPedido = () => {
        setAdvertenceMenssage("¿Estás seguro que quieres realizar este pedido?");
        setOpen(true);
    }

    const handleClickDelete = (e) => {
        const id = e.target.id
        const newProducts = products.filter((product) => product.prid !== Number(id));
        setProducts(newProducts);

        const productList = []

        for (let i = 0; i < newProducts.length; i++) {
            for (let j = 0; j < newProducts[i].count; j++) {
                productList.push(newProducts[i].prid)
            }
        }

        localStorage.setItem('productList', JSON.stringify(productList))
        localStorage.setItem('numProductList', productList.length)
    }

    const handleClickAV2Can = () => {
        setOpen(false);
        setAdvertenceMenssage("");
    }

    const handleClickAVConf = async () => {

        const clid = sessionStorage.getItem('id')
        const fecha = Date.now()
        const date = new Date(fecha)

        const day = (dayjs(date).date())
        const month = (dayjs(date).month())
        const year = (dayjs(date).year())

        const monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const formattedDate = `${day} de ${monthName[month]} del ${year}`

        const body = {
            clid: clid,
            fecha: formattedDate,
        }

        const res = await fetch('http://localhost:4000/orders', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        const orderId = data.pdid

        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < products[i].count; j++) {

                const body2 = {
                    pdid: orderId,
                    prid: products[i].prid,
                }

                const res2 = await fetch('http://localhost:4000/ordersProducts', {
                    method: 'POST',
                    body: JSON.stringify(body2),
                    headers: { "content-Type": "application/json" }
                })

                const data2 = await res2.json()

                console.log(data2)
            }
        }

        localStorage.clear()

        navigate('/historial-de-compras')
    }

    return (
        <>
            <Backdrop
                sx={{ backdropFilter: 'blur(5px)', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Grid
                    container
                    alignItems='center'
                    textAlign='center'
                    justifyContent='center'>
                    <Box
                        width='300px'
                        height='200px'
                        borderRadius='20px'
                        border='1px solid #BABBBF'
                        sx={{ backgroundColor: '#ffffff' }}>
                        <Typography color='#000000' mt='20px' variant="h5" fontWeight='bold'>Advertencia</Typography>
                        <Typography color='#000000' mt='20px'>{advertenceMenssage}</Typography>
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
            </Backdrop>
            <Navbar></Navbar>
            <Container maxWidth='xl' fixed>
                <div hidden={isHidden}>
                    <Grid
                        container
                        width='100%'
                        height='100vh'
                        justifyContent='center'
                        alignItems='start'>
                        <Box height='60px'>a</Box>
                        <Grid
                            alignItems='center'
                            justifyContent='start'
                            container
                            width='100%'
                            height='80vh'
                            direction='column'>
                            <Typography variant="h5" fontWeight='bold'>Carrito de compras</Typography>
                            <Grid
                                mt='10px'
                                container
                                width='100%'
                                borderBottom='1px solid #BABBBF'>
                                <Grid container justifyContent='start' item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Typography mb='10px' ml='30px' fontWeight='bold'>Productos</Typography>
                                </Grid>
                                <Grid container justifyContent='end' item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>
                                    <Typography mb='10px' mr='30px' fontWeight='bold'>Subtotal</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems='start'
                                width='100%'
                                height='63%'
                                overflow='scroll'
                                direction='column'
                                display='block'
                                mt='10px'
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
                                {products.map((product) => (
                                    <Grid
                                        key={product.prid}
                                        container
                                        width='100%'
                                        mb='20px'
                                        sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                                        <Grid container justifyContent='start' item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <img
                                                src={process.env.PUBLIC_URL + "/" + product.foto}
                                                width='200px'
                                                alt="foto">
                                            </img>
                                            <Grid>
                                                <Typography mt='30px' ml='30px'>{product.nombre}</Typography>
                                                <Typography ml='30px'>{'$' + product.precio}</Typography>
                                                <Grid mt='100px' ml='30px' container direction='row'>
                                                    <Box
                                                        width='40px'
                                                        height='40px'
                                                        component={Button}
                                                        value={product.prid}
                                                        onClick={handleClickRes}
                                                        sx={{
                                                            color: '#000000',
                                                            textDecoration: 'none',
                                                            textTransform: 'none',
                                                            minWidth: '40px',
                                                            boxShadow: 'none',
                                                            padding: '0px',
                                                            backgroundColor: '#F5F5F5',
                                                            borderRadius: '0px',
                                                        }}> -
                                                    </Box>
                                                    <Box
                                                        component={Grid}
                                                        container
                                                        width='40px'
                                                        height='40px'
                                                        alignContent='center'
                                                        justifyContent='center'
                                                        sx={{
                                                            boxShadow: 'none',
                                                            padding: '0px',
                                                            backgroundColor: '#F5F5F5',
                                                        }}> {product.count}
                                                    </Box>
                                                    <Box
                                                        width='40px'
                                                        height='40px'
                                                        value={product.prid}
                                                        component={Button}
                                                        onClick={handleClickSum}
                                                        sx={{
                                                            color: '#000000',
                                                            textDecoration: 'none',
                                                            textTransform: 'none',
                                                            minWidth: '40px',
                                                            boxShadow: 'none',
                                                            padding: '0px',
                                                            backgroundColor: '#F5F5F5',
                                                            borderRadius: '0px',
                                                        }}> +
                                                    </Box>
                                                    <Button
                                                        id={product.prid}
                                                        onClick={handleClickDelete}
                                                        variant="outlined"
                                                        color='error'
                                                        sx={{
                                                            ml: '10px',
                                                            borderRadius: '20px',
                                                            borderColor: '#CD0227',
                                                            textTransform: 'none',
                                                        }}>Eliminar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            alignContent='center'
                                            justifyContent='end'
                                            item xs={0} sm={0} md={0} lg={6} xl={6}
                                            sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>
                                            <Typography mr='20px'>{'$' + product.precio * product.count}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                                {products.map((product) => (
                                    <Grid
                                        key={product.prid}
                                        container
                                        width='100%'
                                        mb='20px'
                                        sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
                                        <Grid container justifyContent='start' item xs={12} sm={12} md={12} lg={6} xl={6} >
                                            <img
                                                src={process.env.PUBLIC_URL + "/" + product.foto}
                                                width='155px'
                                                alt="foto">
                                            </img>
                                            <Grid>
                                                <Typography mt='10px' ml='10px'>{product.nombre}</Typography>
                                                <Typography ml='10px'>{'$' + product.precio}</Typography>
                                                <Grid mt='100px' container direction='row'>
                                                    <Box
                                                        ml='10px'
                                                        width='25px'
                                                        height='30px'
                                                        component={Button}
                                                        value={product.prid}
                                                        onClick={handleClickRes}
                                                        sx={{
                                                            color: '#000000',
                                                            textDecoration: 'none',
                                                            textTransform: 'none',
                                                            minWidth: '40px',
                                                            boxShadow: 'none',
                                                            padding: '0px',
                                                            backgroundColor: '#F5F5F5',
                                                            borderRadius: '0px',
                                                        }}> -
                                                    </Box>
                                                    <Box
                                                        component={Grid}
                                                        container
                                                        width='25px'
                                                        height='30px'
                                                        alignContent='center'
                                                        justifyContent='center'
                                                        sx={{
                                                            boxShadow: 'none',
                                                            padding: '0px',
                                                            backgroundColor: '#F5F5F5',
                                                        }}> {product.count}
                                                    </Box>
                                                    <Box
                                                        width='25px'
                                                        height='30px'
                                                        value={product.prid}
                                                        component={Button}
                                                        onClick={handleClickSum}
                                                        sx={{
                                                            color: '#000000',
                                                            textDecoration: 'none',
                                                            textTransform: 'none',
                                                            minWidth: '40px',
                                                            boxShadow: 'none',
                                                            padding: '0px',
                                                            backgroundColor: '#F5F5F5',
                                                            borderRadius: '0px',
                                                        }}> +
                                                    </Box>
                                                    <Button
                                                        id={product.prid}
                                                        onClick={handleClickDelete}
                                                        variant="outlined"
                                                        color='error'
                                                        sx={{
                                                            ml: '10px',
                                                            borderRadius: '20px',
                                                            borderColor: '#CD0227',
                                                            textTransform: 'none',
                                                        }}>Eliminar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            alignContent='center'
                                            justifyContent='end'
                                            item xs={0} sm={0} md={0} lg={6} xl={6}
                                            sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>
                                            <Typography mr='20px'>{'$' + product.precio * product.count}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid
                                mt='10px'
                                container
                                width='100%'
                                borderTop='1px solid #BABBBF'>
                                <Grid container justifyContent='start' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <Typography mt='10px' ml='30px' fontWeight='bold'>Total a pagar</Typography>
                                </Grid>
                                <Grid container justifyContent='end' item xs={6} sm={6} lg={6} md={6} xl={6}>
                                    <Typography mt='10px' mr='30px' fontWeight='bold'>{'$' + totalPayable}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='flex-end'>
                                <Button variant="outlined" onClick={handleClickPedido} sx={{ mt: '20px', borderRadius: '20px', textTransform: 'none', width: '200px' }}>Realizar pedido</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div hidden={!isHidden}>
                    <Grid
                        container
                        justifyContent='center'
                        alignContent='center'
                        height='100vh'>
                        <Typography>Aun no has agregado ningun producto a tu carrito.
                            <Typography component={Link} color='#0265CD' to='/shop'>{' Ir a comprar'}</Typography>
                        </Typography>
                    </Grid>
                </div>
            </Container >
        </>
    )
}