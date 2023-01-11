const mongoose = require('mongoose');
const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb+srv://niftyIt:FxyPwDKJVl2ooLB2@cluster0.aj69dyq.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log('connected to mongoDb');
    }).catch((err) => {
        throw err;
    })
}

module.exports = connect;