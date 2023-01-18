const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const dbConnect = require("./utils/dbConnect.js");
const app = require("./app");


// database connection
dbConnect();

// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`NiftyIt app listening on port ${port}`);
})
