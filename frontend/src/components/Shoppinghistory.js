import { Box, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "./UserNavbar";

export default function Shoppinghistory() {

    const [ordersProducts, setOrdersProducts] = useState([])

    const [products, setProducts] = useState([])

    const loadOrders = async () => {

        const id = sessionStorage.getItem('id')

        const res = await fetch(`http://localhost:4000/ordersProducts/${1}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        setOrdersProducts(data)
    }

    useEffect(() => {
        loadOrders();
    }, []);

    const loadProducts = async () => {

        const res = await fetch(`http://localhost:4000/products/${1}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        setProducts(data)

    }
    useEffect(() => {
        loadProducts();
    }, []);




    return (
        <>
            <Navbar></Navbar>
            <Container maxWidth='xl' fixed>
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
                                <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Historial de compras</Typography>
                                <Typography textAlign='start' ml='20px' mr='20px' mt='30px' mb='50px' variant="body1">
                                    Aquí puedes ver las compras que has realizado
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
                            <Grid
                                container
                                alignItems='start'
                                justifyContent='center'
                                direction='column'>
                                <Typography ml='20px' mt='20px' fontWeight='bold'>
                                    Fecha: {ordersProducts.fecha}
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
                                            item xs={1} sm={1} lg={1} md={1} xl={1}>
                                            <Typography ml='10px'>
                                            </Typography>
                                            <Typography ml='10px'>
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item xs={3} sm={3} lg={3} md={3} xl={3}>
                                            <Typography>
                                                Referencia:
                                            </Typography>
                                            <Typography>
                                                {ordersProducts.pdid}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item xs={4} sm={4} lg={4} md={4} xl={4}>
                                            <Typography>
                                                Nombre del producto:
                                            </Typography>
                                            <Typography>
                                                {products.nombre}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item xs={4} sm={4} lg={4} md={4} xl={4}>
                                            <Typography>
                                                Total:
                                            </Typography>
                                            {products.precio}
                                            <Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}