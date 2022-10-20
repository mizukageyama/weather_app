const fetch = require('node-fetch');

module.exports = {
    fetchWeatherData: async (location) => {
        let weatherInfo = {
            location: "Not found",
            temperature: "0",
            description: "---",
            image: "https://cdn-icons-png.flaticon.com/512/2965/2965314.png"
        };

        return new Promise(async function (resolve, reject) {
            if (!location) {
                resolve(weatherInfo);
            }

            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`);

                if (weatherResponse.status == 200) {
                    const weatherData = await weatherResponse.json();

                    const icon = weatherData.weather[0].icon;
                    weatherInfo.location = location;
                    weatherInfo.temperature = Math.floor(weatherData.main.temp);
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
            } catch (e) {
                console.log(e);
                weatherInfo.location = 'Something went wrong';
                resolve(weatherInfo);
            }
        });
    }
};