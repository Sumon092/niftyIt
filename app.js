const express = require('express')
const app = express()
const cors = require('cors');
require("dotenv").config();
const cookieParser = require("cookie-parser");

// middleware
// app.use(bodyParser.urlencoded());
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}))

//routes
const userRoute = require("./routes/user.route");



app.get('/', (req, res) => {
    res.send('niftyIt server running!')
});
app.use("/api/v1/user", userRoute);


module.exports = app;
