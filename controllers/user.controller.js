const bcrypt = require('bcryptjs');
const User = require("../models/User.js");
const jwt = require('jsonwebtoken');

// create user
exports.signup = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    try {
        await newUser.save();
        res.status(200).send('user added successfully');
    } catch (err) {
        next(err)
    }
};