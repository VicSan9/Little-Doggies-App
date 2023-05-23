import { Box, Button, Container, Grid } from "@mui/material"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <Container  maxWidth = 'lg'
                    fixed>
                <Grid container
                      sx={{
                        borderRadius: '10px',
                        borderBottom: '2px solid #0265CD'
                        }}
                      spacing= '2'
                      direction='row'
                      justifyContent='flex-start'
                      alignItems="strech">
                    <Grid item xs='3' sm='2' lg='1' md='1' xl='1'>
                        <img  src={process.env.PUBLIC_URL + "/LDLogo.png"} alt="logo"
                              height='55vh' /> 
                    </Grid>
                    <Grid   item xs='2' sm='2' lg='1' md='1' xl='1'  
                            sx={{backgroundColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [1, 1, 1]}
                                }}>
                        <Box mt='15px'>
                            <Link   href="#" 
                                    to='/'
                                    mt='15px'
                                    style={{
                                        textDecoration: "none",
                                        color: "#000000",
                                        fontWeight: "inherit"
                                    }}> Inicio
                            </Link>
                        </Box>
                    </Grid>
                    <Grid   item xs='2' sm='2' lg='1' md='1' xl='1'
                            sx={{backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]}
                            }}>
                        <Box mt='15px'>
                            <Link   href="#" 
                                    to='/citas'
                                    style={{
                                        textDecoration: "none",
                                        color: "#000000",
                                        fontWeight: "inherit"
                                    }}> Citas
                            </Link>
                        </Box>
                        
                    </Grid>
                    <Grid   item xs='2' sm='2' lg='1' md='1' xl='1'
                            sx={{backgroundColor: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [1, 1, 1]}
                            }}>
                        <Box mt='15px'>
                            <Link   href="#" 
                                    to='/productos'
                                    style={{
                                        textDecoration: "none",
                                        color: "#000000",
                                        fontWeight: "inherit"
                                    }}> Productos
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs='0' sm='0' lg='5' md='4' xl='5'>
                    </Grid>
                    <Grid item xs='2' sm='3' lg='3' md='4' xl='3'>
                        <Grid   container
                                spacing= '2'
                                direction='row'
                                justifyContent='flex-end'
                                alignItems='center'>
                            <Grid item xs='6' sm='6' lg='5' md='5' xl='5'>
                                <Button variant="outlined" 
                                        size='small'
                                        sx={{color:'#0265CD', 
                                            width:'104px',
                                            mt:'13px',
                                            borderColor:'#0265CD',
                                            borderRadius:'15px',
                                            textTransform:'none'}}>
                                    <Link   href="#" 
                                            to='/registrarse'
                                            style={{
                                                textDecoration: "none",
                                                color: "#0265CD"
                                            }}> Registrarse
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item xs='6' sm='6' lg='5' md='5' xl='5'>
                                <Button variant="outlined" 
                                        size='small'
                                        sx={{color:'#0265CD', 
                                            width:'104px',
                                            mt:'13px',
                                            borderColor:'#0265CD',
                                            borderRadius:'15px',
                                            textTransform:'none'}}>
                                    <Link   href="#" 
                                            to='/login'
                                            style={{
                                                textDecoration: "none",
                                                color: "#0265CD"
                                            }}> Iniciar Sesión
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>                        
                    </Grid>
                </Grid>
        </Container>
    )
}