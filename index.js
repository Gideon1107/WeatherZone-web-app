import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const  GEO_API_URL  = "http://api.openweathermap.org/geo/1.0/direct";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/search", async (req, res) => {
    const geoParams = {
        q: req.body.query,
        appid: "287c09b3cea989a71939eb3692e22768"
    };
    try {
        const geoResponse = await axios.get(GEO_API_URL, {params: geoParams});

        const lat = geoResponse.data[0]["lat"];
        const lon = geoResponse.data[0]["lon"];
        // console.log(lat, lon);

        try {
            const weatherParams = {
                lat: lat,
                lon: lon,
                appid: "287c09b3cea989a71939eb3692e22768",
                units: "metric"
            };
            const weatherResponse = await axios.get(WEATHER_API_URL, {params: weatherParams});
            const data = weatherResponse.data;
            const time = new Date();
            // console.log(JSON.stringify(data));
            res.render("index.ejs", {
                data: data,
                time: time,
            });
        } catch(error) {
            console.log(error.response.data);
            res.status(500);
        }
    } catch(error) {
        // console.log(error.response.data);
        res.status(500);
        res.render("index.ejs", {error: "No city found by that entry. Please try again with a different city."})
    }
    // console.log(req.body.query);
    // res.render("index.ejs")
   
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });