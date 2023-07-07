import { Box, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "./UserNavbar";

export default function Shoppinghistory() {

    const [orders, setOrders] = useState([])
    const [info, setInfo] = useState([])

    const loadOrders = async () => {

        const id = sessionStorage.getItem('id')

        const body = { 'id': id }

        const res = await fetch(`http://localhost:4000/orders4`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json();

        if (res.status === 404) {
            setOrders([])
            return
        }

        setOrders(data)

        const res2 = await fetch(`http://localhost:4000/orders2`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data2 = await res2.json()

        setInfo(data2)
    }

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <Container maxWidth='xl' fixed>
                <Grid
                    container
                    alignItems='center'
                    height='100vh'
                    sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                    <Grid
                        container
                        alignItems='center'
                        height='82vh'
                        mt='10px'>
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
                                    Aquí puedes ver las compras que has realizado, si deseas cancelar un pedido ponte en contacto con nosotros
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
                            {orders.map((order) => (
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='center'
                                    direction='column'>
                                    <Typography ml='20px' mt='20px' fontWeight='bold'>
                                        Fecha: {order.fecha}
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
                                                item xs={2} sm={2} lg={2} md={3} xl={2}
                                                container
                                                alignItems='start'
                                                justifyContent='start'
                                                direction='column'
                                                textAlign='start'>
                                                <Typography ml='20px'>
                                                    Referencia:
                                                </Typography>
                                                <Typography ml='20px'>
                                                    {order.id_pedido}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item xs={8} sm={8} lg={8} md={7} xl={8}>
                                                <Typography>
                                                    Productos:
                                                </Typography>
                                                {info.filter(inf => inf.id_pedido === order.id_pedido).map((inf) => (
                                                    <Typography>
                                                        {inf.nombre + ' x' + inf.count}
                                                    </Typography>
                                                ))}   
                                            </Grid>
                                            <Grid
                                                item xs={2} sm={2} lg={2} md={2} xl={2}>
                                                <Typography>
                                                    Total:
                                                </Typography>
                                                <Typography>
                                                    {order.valor_total_pedido}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems='center'
                    height='20vh'
                    sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
                    <Grid
                        container
                        alignItems='center'
                        height='20vh'>
                        <Grid
                            mt='10vh'
                            alignItems='center'
                            justifyContent='center'
                            height='12vh'
                            item xs={12} sm={4} lg={4} md={4} xl={4}>
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
                            paddingRight='20px'
                            item xs={12} sm={8} lg={8} md={8} xl={8}>
                            {orders.map((order) => (
                                <Grid
                                    key={order.id_pedido}
                                    container
                                    alignItems='start'
                                    justifyContent='center'
                                    direction='column'>
                                    <Typography ml='20px' mt='20px' fontWeight='bold'>
                                        Fecha: {order.fecha}
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
                                            alignItems='start'
                                            justifyContent='flex-start'
                                            mt='5px'
                                            mb='5px'>
                                            <Grid
                                                item xs={4} sm={2} lg={2} md={2} xl={2}>
                                                <Typography ml='20px'>
                                                    Referencia:
                                                </Typography>
                                                <Typography ml='20px'>
                                                    {order.id_pedido}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item xs={6} sm={8} lg={8} md={8} xl={8}>
                                                <Typography>
                                                    Nombre del producto:
                                                </Typography>
                                                <Typography>
                                                    {order.nombre}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item xs={2} sm={2} lg={2} md={2} xl={2}>
                                                <Typography>
                                                    Total:
                                                </Typography>
                                                <Typography>
                                                    {order.valor_total_pedido}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}