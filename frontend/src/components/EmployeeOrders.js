import React from 'react'
import EmployeeNavbar from './EmployeeNavbar';
import { Grid } from "@mui/material";

export default function EmployeeOrders() {
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
                <div>Pedidos</div>
            </Grid>
        </>
    )
}