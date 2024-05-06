import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const  GEO_API_URL  = "http://api.openweathermap.org/geo/1.0/direct";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/search", async (req, res) => {
    const params = {
        q: req.body.query,
        appid: "287c09b3cea989a71939eb3692e22768"
    }
    try {
        const response = await axios.get(GEO_API_URL, {params: params});

        const result = response.data;
        console.log(result[0]["lat"]);

    //     res.render("index.ejs", {
    //         secret: result.secret,
    //         user: result.username
    // });
    } catch(error) {
        console.log(error.response.data)
        res.status(500)
    }

    console.log(req.body.query);
    res.render("index.ejs")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });