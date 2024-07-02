import express from "express";
import axios from "axios";

const router = express.Router();
export default router;

let STATUS;
// STATUS = "developement";
STATUS = "production";

router.get("/api/hello", async (req, res) => {
    let visitor_name = req.query['visitor_name'];
    // remove double quotes from string
    let ip = req.ip;
    STATUS === "developement" && (ip =  "105.113.19.250");

    if (visitor_name === undefined || visitor_name === '')
        res.json({"msg": "visitor_name parameter is missing"});

    const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
    const city = geoResponse.data.city;
    const lon = geoResponse.data.longitude;
    const lat = geoResponse.data.latitude;
    try {
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=09898c34a283cbd79e96c1a42fe0fee2&units=metric`);
    } catch(e) {
        res.json({"msg": "An error occured while fetching weather data", "more info": {
            "ip": ip,
            "georesponse": geoResponse.data,
        }});
    }
    const temp = data.data.main.temp;

    let to_rtn = {
        "client_ip": ip,
        "location": city,
        "greeting": `Hello, ${visitor_name}!, the temperature is ${temp} degrees Celsius in ${city}.`
    };
    
    res.json(to_rtn);
});