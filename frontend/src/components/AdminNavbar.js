import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function AdminNavbar() {
    return (
        <Grid
            container
            width='83px'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            maxHeight='930px'>
            <Grid
                container
                width='100%'
                height='85%'
                justifyContent='center'
                alignItems='center'
                borderRight='1px solid #BABBBF'
                borderRadius='10px'
                direction='column'>
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
                <Grid
                    item xs={1} sm={1} lg={1} md={1} xl={1}>
                    <Typography>AAA</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}