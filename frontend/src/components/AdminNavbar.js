import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function AdminNavbar() {
    return (
        <Grid
            container
            width='5.5vw'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            maxHeight='930px'
            maxWidth='83px'
            minWidth='50px'>
            <Grid
                container
                width='100%'
                height='85%'
                justifyContent='start'
                alignItems='center'
                borderRight='1px solid #BABBBF'
                borderRadius='10px'
                direction='column'
                textAlign='center'>
                <Grid
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <img src={process.env.PUBLIC_URL + "/LDLogo.png"}
                        alt="logo"
                        width='75%'>
                    </img>
                </Grid>
                <Grid
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <Typography>AAA</Typography>
                </Grid>
                <Grid
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <Typography>AAA</Typography>
                </Grid>
                <Grid
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <Typography>AAA</Typography>
                </Grid>
                <Grid
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <Typography>AAA</Typography>
                </Grid>
                <Grid
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <Typography>AAA</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}