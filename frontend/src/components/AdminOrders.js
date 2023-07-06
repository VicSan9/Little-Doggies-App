import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { Grid, Typography, Card, Divider} from "@mui/material";

export default function AdminOrders() {

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState([])
    const [client, setClient] = useState([])
    const [ordersProduct, setOrdersProduct] = useState([])
    const [isHidden1, setIsHidden1] = useState(false)

    const loadOrders = async () => {

        const res = await fetch(`http://localhost:4000/orders`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setOrders(data)

    }

    useEffect(() => {
        loadOrders();
    }, []);

    const handleClickOrder = async (e) => {

        const id = Number(e.currentTarget.id)

        setIsHidden1(true)

        const res = await fetch(`http://localhost:4000/orders/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        setOrder(data)

        const res2 = await fetch(`http://localhost:4000/orders3`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data2 = await res2.json()

        const ids = []

        for (let i = 0; i < data2.length; i++) {
            if (data2[i].pdid === data.pdid) {
                ids.push(data2[i].clid)
            }
        }

        const clients = []

        for (let i = 0; i < ids.length; i++) {
            const res3 = await fetch(`http://localhost:4000/clients/${ids[i]}`, {
                method: 'GET',
                headers: { "content-Type": "application/json" }
            })

            const data3 = await res3.json();

            clients.push(data3)

        }

        setClient(clients)

        const body = { 'id': id }

        const res4 = await fetch(`http://localhost:4000/ordersProducts2`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data4 = await res4.json();

        if (res4.status === 404) {
            setOrdersProduct([])
            return
        }

        setOrdersProduct(data4)

        console.log(data4)

        const body1 = { 'id': id }

        const res3 = await fetch(`http://localhost:4000/ordersProducts3`, {
            method: 'POST',
            body: JSON.stringify(body1),
            headers: { "content-Type": "application/json" }
        })

        const data3 = await res3.json();

        if (res3.status === 404) {
            setTotal([])
            return
        }

        setTotal(data3)

        console.log(data3)
    }

    const colorFun = (id) => {
        if (Number(id) === order.pdid) {
            return '#0265CD'
        } else {
            return 'transparent'
        }
    }

    const colorFun2 = (id) => {
        if (Number(id) === order.pdid) {
            return '#FFFFFF'
        } else {
            return '#000000'
        }
    }

    return (
        <>
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
                    width='95vw'
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
                            paddingRight='8px'
                            paddingLeft='16px'
                            direction='column'>
                            <Grid
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                width='100%'
                                mb='10px'>
                                <Typography variant='h6' fontSize='bold'>Pedidos</Typography>
                                <Grid
                                    container
                                    alignItems='start'
                                    justifyContent='start'>
                                    <Typography textAlign='start' mr='5px' mt='5px' mb='5px' variant="body1">
                                        Pedidos pendientes
                                    </Typography>
                                </Grid>
                                {orders.map((pedido) => (
                                    <Grid
                                        component={Card}
                                        key={pedido.pdid}
                                        id={pedido.pdid}
                                        onClick={handleClickOrder}
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
                                        bgcolor={colorFun(pedido.pdid)}
                                        color={colorFun2(pedido.pdid)}
                                        sx={{
                                            height: '60px',
                                            '&:hover': {
                                                backgroundColor: '#0265CD',
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            }
                                        }}>
                                        <Typography textAlign='start' width='62%' overflow='hidden'>{pedido.pdid}</Typography>
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
                        paddingRight='16px'
                        paddingLeft='16px'
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
                                <Typography mt='8px' mb='8px'>Seleciona uno de los miembros para ver su información.</Typography>
                            </div>
                            <div hidden={!isHidden1} style={{ width: '100%' }}>
                                <Typography variant='h6'>Información del pedido</Typography>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información del cliente
                                    {client.map((cliente) => (
                                        <Grid
                                            container
                                            alignItems='start'
                                            justifyContent='start'>
                                            <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                                <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombre</Typography>
                                                <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Correo Eletrónico</Typography>
                                                <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>número telefonico</Typography>
                                                <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Dirección</Typography>
                                            </Grid>
                                            <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                                <Typography mt='8px' variant='body1'>{cliente.nombres + " " + cliente.apellidos}</Typography>
                                                <Typography mt='8px' variant='body1'>{cliente.correo}</Typography>
                                                <Typography mt='8px' variant='body1'>{cliente.telefono}</Typography>
                                                <Typography mt='8px' variant='body1'>{cliente.direccion}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Typography>
                                <Divider></Divider>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información del producto
                                    {ordersProduct.map((producto) => (
                                        <Grid
                                            container
                                            alignItems='start'
                                            justifyContent='start'>
                                            <Grid item xs={4} sm={4} lg={4} md={4} xl={4}>
                                                <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Nombre</Typography>
                                                <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Cantidad</Typography>
                                                <Typography ml='15px' mt='8px' variant='body1' fontWeight='500'>Precio por unidad</Typography>
                                            </Grid>
                                            <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                                <Typography mt='8px' variant='body1'>{producto.nombre}</Typography>
                                                <Typography mt='8px' variant='body1'>{producto.cantidad}</Typography>
                                                <Typography mt='8px' variant='body1'>{producto.subtotal}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Typography>
                                <Divider></Divider>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Valor a pagar
                                    {total.map((valortotal) => (
                                        <Grid
                                            container
                                            alignItems='start'
                                            justifyContent='start'>
                                            <Grid item xs={8} sm={8} lg={8} md={8} xl={8}>
                                                <Typography ml='15px' mt='10px' variant='body1'>{valortotal.total}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}