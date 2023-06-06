import { Card, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container maxWidth='lg'>
            <Card sx={{boxShadow:'none'}}>
                <Typography mt='100px' variant="h4">404 Not Found</Typography>
                <Typography>The page you are looking for could not be found.</Typography>
                <Link to={'/home'}>Regregar a Little Doggies</Link>
            </Card>
        </Container>
    )
}