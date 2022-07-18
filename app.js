require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static("public")) // Using static assets in the public folder

// Setting up view engine
app.set('view engine', 'ejs')


app.get("/", (req, res) => {
    res.render("main", {
        cityName: "",
        country: "",
        temperature:  "",
        image:  "",
        min:  "",
        max:  "",
        humidity:  "",
        pressure:  "",
        windSpeed: "",
        windDegrees: ""
    })  
})

app.post("/", (req, res) => {
    const cityName = req.body.cityName
    const key = process.env.WEATHERMAN_API_TOKEN
    const units = "metric"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=${units}`;
    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

            
            res.render("main", {
                cityName: cityName,
                country: ` - ${weatherData.sys.country}`,
                temperature: `${temp}`,
                image: imageURL,
                min: weatherData.main.temp_min,
                max: weatherData.main.temp_max,
                humidity: weatherData.main.humidity,
                pressure: weatherData.main.pressure,
                windSpeed: weatherData.wind.speed,
                windDegrees: weatherData.wind.deg

            })
        })
    }); 
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => console.log('Server has started successfully'));