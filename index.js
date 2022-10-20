require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.write('<h1>Hello world!</h1>');
});