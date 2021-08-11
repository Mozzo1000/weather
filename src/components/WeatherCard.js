import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core';
import Image from 'material-ui-image'
import './WeatherCard.css'

function WeatherCard(props) {
    return (
        <Box className="card">
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={6} sm={6} md={6}>
                    <Image src={props.image} style={{backgroundColor: "transparent"}} />
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">{props.name}</Typography>
                    <Typography variant="h5"><strong>{props.value}</strong></Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WeatherCard
