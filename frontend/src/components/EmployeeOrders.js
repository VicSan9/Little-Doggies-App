import React, { useState, useEffect } from 'react'
import EmployeeNavbar from './EmployeeNavbar';
import { Grid, Typography, Card, Divider, IconButton, Tooltip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import dayjs from "dayjs";

export default function EmployeeOrders() {

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

        const res1 = await fetch(`http://localhost:4000/orders/${id}`, {
            method: 'GET',
            headers: { "content-Type": "application/json" }
        })

        const data1 = await res1.json()

        setOrder(data1)

        const body = { 'id': id }

        const res2 = await fetch(`http://localhost:4000/orders3`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data2 = await res2.json();

        setClient(data2)

        const body2 = { 'id': id }

        const res3 = await fetch(`http://localhost:4000/ordersProducts2`, {
            method: 'POST',
            body: JSON.stringify(body2),
            headers: { "content-Type": "application/json" }
        })

        const data3 = await res3.json();

        setOrdersProduct(data3)

        const body1 = { 'id': id }

        const res4 = await fetch(`http://localhost:4000/ordersProducts3`, {
            method: 'POST',
            body: JSON.stringify(body1),
            headers: { "content-Type": "application/json" }
        })

        const data4 = await res4.json();

        if (res4.status === 404) {
            setTotal([])
            return
        }

        setTotal(data4)
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

    const handleClickDelivery = async () => {

        const fecha = Date.now()
        const date = new Date(fecha)

        const day = (dayjs(date).date())
        const month = (dayjs(date).month())
        const year = (dayjs(date).year())

        const monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const formattedDate = `${day} de ${monthName[month]} del ${year}`

        const body = {
            clid: client.clid,
            fecha: formattedDate,
            'estado': 'Entregado'
        }

        const res = await fetch(`http://localhost:4000/orders/${order.pdid}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "content-Type": "application/json" }
        })

        const data = await res.json()

        console.log(data)

        const order1 = data.pdid

        const body2 = {
            pdid: order1,
            prid: ordersProduct.prid,
        }

        const res2 = await fetch(`http://localhost:4000/ordersProducts/${order.pdid}`, {
            method: 'PUT',
            body: JSON.stringify(body2),
            headers: { "content-Type": "application/json" }
        })

        const data2 = await res2.json()

        console.log(data2)

        //window.location.reload()
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
                <EmployeeNavbar></EmployeeNavbar>
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
                        overflow='scroll'
                        display='block'
                        sx={{
                            borderRight: '1px solid #BABBBF',
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
                        <Grid
                            container
                            width='100%'
                            height='100%'
                            paddingRight='8px'
                            paddingLeft='16px'
                            direction='column'>
                            <Grid
                                container
                                direction='column'
                                justifyContent='space-between'
                                alignItems='center'
                                width='100%'
                                mb='10px'>
                                <Typography width='100%' variant='h6' fontSize='bold' mb='10px'>Pedidos</Typography>
                                {orders.map((pedido) => (
                                    <Grid
                                        component={Card}
                                        key={pedido.pdid}
                                        id={pedido.pdid}
                                        onClick={handleClickOrder}
                                        container
                                        justifyContent='space-between'
                                        alignItems='center'
                                        width='100%'
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
                                        <Typography textAlign='start' width='62%' overflow='hidden'>{'Pedido Nro.' + pedido.pdid}</Typography>
                                        <Tooltip title='Marcar como entregado'>
                                            <IconButton id={pedido.pdid} onClick={handleClickDelivery} sx={{ '&:hover': { color: '#ffffff' } }}>
                                                <CheckIcon></CheckIcon>
                                            </IconButton>
                                        </Tooltip>
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
                                <Typography mt='8px' mb='8px'>Seleciona uno de los pedidos para ver su información.</Typography>
                            </div>
                            <div hidden={!isHidden1} style={{ width: '100%' }}>
                                <Typography variant='h6'>Información del pedido</Typography>
                                <Typography mb='15px' mt='15px' ml='10px' variant='h6' width='98%' sx={{ fontSize: '18px' }}>Información del cliente
                                    {client.map((cliente) => (
                                        <Grid
                                            key={cliente.clid}
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
                                            key={producto.prid}
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
                                            key={valortotal.pdid}
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
                    </Grid >
                </Grid >
            </Grid >
        </>
    )
}