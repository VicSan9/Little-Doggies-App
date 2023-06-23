import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Grid } from "@mui/material";

export default function AdminClient() {
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
                <div>Clientes admin</div>
            </Grid>
        </>
    )
}