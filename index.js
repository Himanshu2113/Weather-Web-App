import express from "express";
import ejs from "ejs";
import env from "dotenv";
import axios from "axios";
import bodyparser from "body-parser";
const app = express();
app.set("view engine", "ejs");
env.config();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/faqs", (req, res) => {
  res.render("faqs.ejs");
});
app.post("/search", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
    params: { city: req.body.search },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.render("index.ejs", {
      city: req.body.search,
      maxtemp: response.data.max_temp,
      mintemp: response.data.min_temp,
      temp: response.data.temp,
      speed: response.data.wind_speed,
      maxspeed: response.data.wind_degrees,
      windgust: response.data.feels_like,
      precipitation: response.data.humidity,
      rain: response.data.cloud_pct,
      // snowfall: response.data.daily.snowfall_sum,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
