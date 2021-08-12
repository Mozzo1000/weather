import React, {useState, useEffect} from 'react'
import { Container, Grid, Typography, Box, TextField, InputAdornment } from '@material-ui/core';
import Image from 'material-ui-image'
import "./Home.css"
import WeatherCard from '../components/WeatherCard'
import SvgIcon from '@material-ui/core/SvgIcon';
import WeatherData from '../services/WeatherData'
import convertTime from '../Utils'
import SearchIcon from '@material-ui/icons/Search';

function Home() {
    const [input, setInput] = useState("London");
    const [weatherData, setWeatherData] = useState();

    const retrieveData = async () => {
        WeatherData.getWeather(input, false).then(
            response => {
                setWeatherData({...response.data});
                console.log(response);
            },
            error => {
                console.log(error.response)
            }
        )
    }

    useEffect(() => {
        retrieveData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (e) => {
        if (e.keyCode === 13) {
            retrieveData();
        }
    }

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
                        <Image src={`/icons/${weatherData.weather[0].icon}.svg`} imageStyle={{height: 200}} style={{backgroundColor: "transparent", paddingTop: "calc(60%)"}}/>
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
                            <TextField onKeyDown={onSubmit} onChange={(e) => setInput(e.target.value)} label="Search by city" variant="outlined" InputProps={{endAdornment: (<InputAdornment><SearchIcon/></InputAdornment>)}}fullWidth />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/humidity.png" name="Humidity" value={weatherData.main.humidity + "%"} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/wind.png" name="Wind speed" value={weatherData.wind.speed + "m/s"} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/binoculars.png" name="Visibilty" value={(weatherData.visibility / 1000).toPrecision(2) + "km"} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/sunrise.png" name="Sunrise" value={parseInt(convertTime(weatherData.sys.sunrise, weatherData.timezone)[0].split(":")[0]) + ":" + parseInt(convertTime(weatherData.sys.sunrise, weatherData.timezone)[0].split(":")[1])} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <WeatherCard image="/icons/sunset.png" name="Sunset" value={parseInt(convertTime(weatherData.sys.sunset, weatherData.timezone)[0].split(":")[0]) + ":" + parseInt(convertTime(weatherData.sys.sunset, weatherData.timezone)[0].split(":")[1])} />
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
