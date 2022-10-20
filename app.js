require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fetch = require("node-fetch");
const { fetchLocations } = require("./controllers/location_controller");
const { fetchWeatherData } = require("./controllers/weather_controller");

const app = express();

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static('public'));

//Set templating engines
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set("view engine", "ejs");

//Navigation Routes
app.get('/', async (req, res) => {
    let location = req.query.loc || "";
    let page = parseInt(req.query.page) || 1;

    const locationList = await fetchLocations(page);
    let data = locationList.data;
    data.queryLoc = location;
    data.title = 'Weather App Home';

    data.weatherInfo = await fetchWeatherData(location);
    res.render("index", data);
});

//Listen to port 3000
app.listen(process.env.PORT, () => {
    console.log(`Weather app listening on http://localhost:${process.env.PORT}`);
});