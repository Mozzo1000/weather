import React, {useState, useEffect} from 'react'
import { Container, Grid, Typography, Box, TextField} from '@material-ui/core';
import Image from 'material-ui-image'
import "./Home.css"
import WeatherCard from '../components/WeatherCard'
import SvgIcon from '@material-ui/core/SvgIcon';
import WeatherData from '../services/WeatherData'
import convertTime from '../Utils'

function Home() {
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        WeatherData.getWeather('London', true).then(
            response => {
                setWeatherData({...response.data});
                console.log(response);
            },
            error => {
                console.log(error.response)
            }
        )
    }, []);

    var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return weatherData && !weatherData.message ? (
        <Container style={{marginTop: 50}}> {/*FIXME: Actually center dynamically instead of setting a fixed value*/}
            <Box className="grid-container">
                <Grid container>
                    <Grid className="grid-primary" item xs={12} sm={6} md={4}>
                        <Typography variant="h4" style={{paddingTop: 10}}>{weatherData.name}, {weatherData.sys.country}</Typography>
                        <Typography variant="subtitle1">{weatherData.weather[0].description}</Typography>
                        <Image src="/icons/04d.svg" imageStyle={{height: 300}} style={{backgroundColor: "transparent", paddingTop: "calc(70%)"}}/>
                        <Typography variant="h2"><strong>{Math.round(weatherData.main.temp)}°C</strong></Typography>
                        <Typography variant="subtitle1">Feels like {Math.round(weatherData.main.feels_like)}°C</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} className="grid-secondary">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={6}>
                            <Typography align="center" variant="h5"><strong>{weekday[new Date(convertTime(weatherData.dt, weatherData.timezone).input).getUTCDay()]}, {parseInt(
                  convertTime(weatherData.dt, weatherData.timezone)[0].split(
                    ":"
                  )[0])}:00</strong></Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={6}>
                            <TextField label="Search by city" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/04d.svg" name="Humidity" value={weatherData.main.humidity + "%"} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/04d.svg" name="Wind speed" value={weatherData.wind.speed + "m/s"} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/04d.svg" name="Visibilty" value={(weatherData.visibility / 1000).toPrecision(2) + "km"} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/04d.svg" name="Sunrise" value={parseInt(convertTime(weatherData.sys.sunrise, weatherData.timezone)[0].split(":")[0]) + ":" + parseInt(convertTime(weatherData.sys.sunrise, weatherData.timezone)[0].split(":")[1])} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/04d.svg" name="Sunset" value={parseInt(convertTime(weatherData.sys.sunset, weatherData.timezone)[0].split(":")[0]) + ":" + parseInt(convertTime(weatherData.sys.sunset, weatherData.timezone)[0].split(":")[1])} />
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    ) : weatherData && weatherData.message ? (   
        <p>City not found</p>
    ) : (
        <p>Loading...</p>
    );
}

export default Home
