const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const { apiKey } = require('./key');
var PORT = process.env.PORT;

if (PORT == "" || PORT == null) {
    PORT = 3000;
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Weather Today' });
});

app.post('/', (req, res) => {

    const city = (req.body.cityInput).trim();
    // const apiKey = key;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    axios.get(url)
        .then(response => {
            const weatherData = response.data;
            const imgUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.render('weather', { title: city + ", " + weatherData.sys.country, temp: weatherData.main.temp, imgUrl: imgUrl, desc: weatherData.weather[0].description })
        })
        .catch(error => {
            res.render('error', { title: "ERROR" })
        });

});

app.listen(PORT, () => console.log("Server started at port 3000"));