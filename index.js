import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import 'dotenv/config'

const app = express();
const port = 3000;

app.use(express.static("public"));
const googleApiKey = process.env.GOOGLE_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

const weatherData = {
  weather:"default",
  temp:"",
  tempAttire:"",
  feels:"",
  city: "",
  state: ""
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {weatherData});
});

app.post("/submit", (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.zip}&key=${googleApiKey}`)
    .then(response => {
      weatherData.city = response.data.results[0].address_components[1].long_name;
      weatherData.state = response.data.results[0].address_components[3].short_name;
      const { lat, lng } = response.data.results[0].geometry.location;

      const exclude = "minutely,hourly,daily,alerts";
      axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=${exclude}&appid=${weatherApiKey}`)
        .then(response => {
          weatherData.weather = response.data.current.weather[0].main;
          if (["Thunderstorm", "Drizzle", "Rain"].includes(weatherData.weather)) {
            weatherData.weather = "rainy";
          } else if ([801, 802, 803].includes(response.data.current.weather[0].id)) {
            weatherData.weather = "partlyCloudy";
          } else if( [804].includes(response.data.current.weather[0].id)) {
            weatherData.weather = "cloudy";
          } else if (response.data.current.weather[0].id >= 700 &&response.data.current.weather[0].id < 800 ) {
            weatherData.weather = "default";
          }
          weatherData.temp = Math.floor(response.data.current.temp);
          weatherData.feels = Math.floor(response.data.current.feels_like);

          if (weatherData.temp >= 72) { weatherData.tempAttire = "tshirt";}
          else if (weatherData.temp >= 58) { weatherData.tempAttire = "sweater";}
          else if (weatherData.temp >= 32) { weatherData.tempAttire = "coat";}
          else { weatherData.tempAttire = "sweater coat beanie";}

          res.redirect("/");
        })
        .catch(error => {
          console.error("Error retrieving weather data:", error);
          res.redirect("/");
        });
      
    })
    .catch(error => {
      console.error("Error retrieving lat and lng:", error);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});