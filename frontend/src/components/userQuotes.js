import { Container, Grid, Typography } from "@mui/material";
import Navbar from "./UserNavbar";
import { useEffect, useState } from "react";

export default function UserQuotes() {

  const [quotes, setQuotes] = useState([])
  const [isHidden, setIsHidden] = useState(false)

  const loadQuotes = async () => {

    const id = sessionStorage.getItem('id')

    const body = {
      "id": id
    }

    const res = await fetch(`http://localhost:4000/quotes3`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { "content-Type": "application/json" }
    })

    const data = await res.json();

    if (res.status === 404) {
      setQuotes([])
      return
    }
    setIsHidden(true)
    setQuotes(data)
  }

  useEffect(() => {
    loadQuotes();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth='xl' fixed>
        <Container
          maxWidth='xl'
          fixed>
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
                  <Typography textAlign='start' ml='20px' mt='20px' variant="h5" fontWeight='bold'>Información de las citas</Typography>
                  <Typography textAlign='start' ml='20px' mr='20px' mt='30px' mb='50px' variant="body1">
                    Aquí puedes ver y modificar las citas que has agendado
                    como tambien cancelarlas. Para cancelar una cita tienes
                    que hacerlo con 1 día de anticipación.
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
                <div hidden={isHidden}>
                  <Typography ml='20px' mt='20px'>
                    Aún no tienes citas programas
                  </Typography>
                </div>
                {quotes.map((quote) => (
                  <Grid
                    key={quote.ctsid}
                    container
                    alignItems='start'
                    justifyContent='center'
                    direction='column'>
                    <Typography ml='20px' mt='20px'>
                      {quote.fecha}
                    </Typography>
                    <Grid
                      alignItems='center'
                      justifyContent='start'
                      border='1px solid #BABBBF'
                      borderRadius='15px'
                      mt='20px'
                      mr='20px'
                      ml='20px'
                      height='60px'
                      width='900px'>
                      <Grid
                        container
                        height='60px'
                        direction='row'
                        alignItems='center'
                        justifyContent='flex-start'>
                        <Grid
                          item xs={2} sm={2} lg={2} md={2} xl={2}>
                          <Typography ml='10px'>
                            Hora:
                          </Typography>
                          <Typography ml='10px'>
                            {quote.hora}
                          </Typography>
                        </Grid>
                        <Grid
                          item xs={2} sm={2} lg={2} md={2} xl={2}>
                          <Typography>
                            Mascota:
                          </Typography>
                          <Typography>
                            {quote.nombre}
                          </Typography>
                        </Grid>
                        <Grid
                          item xs={6} sm={6} lg={6} md={6} xl={6}>
                          <Typography>
                            Servicios:
                          </Typography>
                          <Typography>
                            {quote.servicios}
                          </Typography>
                        </Grid>
                        <Grid
                          item xs={2} sm={2} lg={2} md={2} xl={2}>
                          <Typography>
                            Acciones
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
      </Container >
    </>
  )
}