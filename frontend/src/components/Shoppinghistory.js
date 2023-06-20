import { Box, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "./UserNavbar";

export default function Shoppinghistory() {

    const [orders, setOrders] = useState([])

    const loadOrders = async () => {

        const id = sessionStorage.getItem('id')  

        const body = { 'id': id }

        const res = await fetch(`http://localhost:4000/orders2`, {
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
                                            item xs={2} sm={2} lg={2} md={2} xl={2}>
                                            <Typography ml='20px'>
                                                Referencia:
                                            </Typography>
                                            <Typography ml='20px'>
                                                {order.id_pedido}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item xs={8} sm={8} lg={8} md={8} xl={8}>
                                            <Typography>
                                                Nombre del producto:
                                            </Typography>
                                            <Typography>
                                                {order.string_agg}
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