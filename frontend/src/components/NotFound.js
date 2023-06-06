import { Card, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container maxWidth='lg'>
            <Card sx={{boxShadow:'none'}}>
                <Typography mt='100px' variant="h4">404 Not Found</Typography>
                <Typography>No se pudo encontrar la página que está buscando.</Typography>
                <Link to={'/home'}>Regregar a Little Doggies</Link>
            </Card>
        </Container>
    )
}