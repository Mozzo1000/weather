import axios from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const getWeather = (city, useMockData=false) => {
    if (!useMockData) {
        //Return data from OpenWeather API
        return axios.get(API_URL + city + "&units=metric" + "&appid=" + process.env.REACT_APP_OPENWEATHER_API_KEY);
    } else {
        /* Return mock data. This data is based on real data attained from OpenWeather API. 
           Some fields that we do not use have been removed. As axios return a promise we have to do the same.
        */
        let promise = new Promise(function(resolve, reject) {
            resolve({ data: {
                "weather": [
                    {
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03d"
                    }
                ],
                "main": {
                    "temp": 22.13,
                    "feels_like": 21.91,
                    "pressure": 1016,
                    "humidity": 58
                },
                "visibility": 10000,
                "wind": {
                    "speed": 0.45,
                },
                "dt": 1628617626,
                "sys": {
                    "country": "GB",
                    "sunrise": 1628570299,
                    "sunset": 1628624011
                },
                "timezone": 3600,
                "name": "London(fake)", // (fake) is added so we can easily see when we are using mock data.
            }
            }); 
        });
        return promise
    }
};

export default {
    getWeather,
};