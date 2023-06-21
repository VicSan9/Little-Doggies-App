import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

export default function ShoppingCart() {

  const [products, setProducts] = useState([])

  const loadProducts = async () => {

    const productsId = JSON.parse(localStorage.getItem('productList'))

    const products = []

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
      }
    }
    setProducts(uniqueArray)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth='xl' fixed>
        <Grid
          container
          width='100%'
          height='100vh'
          justifyContent='center'
          alignItems='start'>
          <Box height='60px'>a</Box>
          <Grid
            alignItems='center'
            justifyContent='center'
            container
            width='100%'
            height='85vh'
            direction='column'>
            <Typography variant="h5" fontWeight='bold'>Carrito de compras</Typography>
            <Grid
              mt='10px'
              container
              width='100%'
              borderBottom='1px solid #BABBBF'>
              <Grid container justifyContent='start' item xs={6} sm={6} lg={6} md={6} xl={6}>
                <Typography ml='30px' fontWeight='bold'>Productos</Typography>
              </Grid>
              <Grid container justifyContent='end' item xs={6} sm={6} lg={6} md={6} xl={6}>
                <Typography mr='30px' fontWeight='bold'>Subtotal</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems='start'
              width='100%'
              height='80%'
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
                  mb='20px'>
                  <Grid container justifyContent='start' item xs={6} sm={6} lg={6} md={6} xl={6}>
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
                          component={Button}
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
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container alignContent='center' justifyContent='end' item xs={6} sm={6} lg={6} md={6} xl={6}>
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
                <Typography ml='30px' fontWeight='bold'>Total a pagar</Typography>
              </Grid>
              <Grid container justifyContent='end' item xs={6} sm={6} lg={6} md={6} xl={6}>
                <Typography mr='30px' fontWeight='bold'>Total</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container >
    </>
  )
}

