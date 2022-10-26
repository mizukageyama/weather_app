const fetch = require('node-fetch');

module.exports = {
    fetchWeatherData: async (location) => {
        let weatherInfo = {
            location: "Not found",
            temperature: "0",
            description: "---",
            wind: "--",
            humidity: "--",
            image: "https://cdn-icons-png.flaticon.com/512/2965/2965314.png"
        };

        return new Promise(async function (resolve, reject) {
            if (!location) {
                resolve(weatherInfo);
            }

            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`)
                .then(async (weatherResponse) => {
                    const weatherData = await weatherResponse.json();

                    if (weatherResponse.status == 200) {
                        const icon = weatherData.weather[0].icon;
                        weatherInfo.location = location;
                        weatherInfo.temperature = Math.floor(weatherData.main.temp);
                        weatherInfo.humidity = weatherData.main.humidity;
                        weatherInfo.wind = Math.floor((weatherData.wind.speed * 3.6) * 100) / 100;
                        weatherInfo.description = weatherData.weather[0].description;
                        weatherInfo.image = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                        resolve(weatherInfo);

                    } else if (weatherResponse.status == 404) {
                        weatherInfo.location = `${location} not found`;
                        resolve(weatherInfo);

                    } else {
                        weatherInfo.location = 'Invalid API key';
                        resolve(weatherInfo);
                    }

                }).catch((err) => {
                    console.log(err);
                    weatherInfo.location = 'Something went wrong';
                    (weatherInfo);
                });
        });
    }
};