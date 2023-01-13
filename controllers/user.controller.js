const bcrypt = require('bcryptjs');
const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const createError = require('../middlewares/error.middleware.js');

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

// login user
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(createError(404, "User not found"))
        }
        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) {
            return next(createError(400, "Wrong Credential"))
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...other } = user._doc;

        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);
    } catch (err) {
        next(err)
    }
}

// update a user
exports.updateUser = async (req, res, next) => {

    let conditions = { _id: req.params.id }
    User.updateOne(conditions, req.body)
        .then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            else {
                return res.status(200).json(doc);
            }

        }).catch(error => next(error))
};



// get user
exports.getUserById = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};
exports.getUser = async (req, res, next) => {

    try {
        const user = await User.find(req.body)
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};

