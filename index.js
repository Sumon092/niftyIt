const express = require('express')
const app = express()
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const cors = require('cors');
const connect = require('./utils/dbConnect.js');
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
connect()

app.get('/', (req, res) => {
    res.send('niftyIt server running on vercel!')
})

app.listen(port, () => {

    console.log('niftyIt listening to port', port);
})