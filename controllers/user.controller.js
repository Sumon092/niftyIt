const bcrypt = require('bcryptjs');
const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const createError = require('../middlewares/error.middleware.js');
const mongoose = require('mongoose');

// create user
exports.signup = async (req, res, next) => {
    console.log('api heated');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    try {
        await newUser.save();
        return res.status(200).send('user added successfully');
    } catch (err) {
        next(err)
    }
};

// login user
exports.login = async (req, res, next) => {
    console.log("login api heated");
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
    var id = mongoose.Types.ObjectId();
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
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

const stripe = require('stripe')('sk_test_51MRMo9DneZwkHD1NG0lUMkockAoXpwud90RogHf1GEeCJZTg4A9hJbAfSchhkvGMKopt0BfZF8h4rYBInCClQ4RH00oHRFvsUn');

exports.apiStripe = async (req, res) => {
    try {
        const booking = req.body;
        const price = booking.price;
        const amount = price * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: amount,
            "payment_method_types": [
                "card"
            ]
        });
        res.status(200).text({
            clientSecret: paymentIntent.client_secret,
        })
        console.log('No error.');
    } catch (e) {
        switch (e.type) {
            case 'StripeCardError':
                console.log(`A payment error occurred: ${e.message}`);
                break;
            case 'StripeInvalidRequestError':
                console.log('An invalid request occurred.');
                break;
            default:
                console.log('Another problem occurred, maybe unrelated to Stripe.');
                break;
        }
    }
}

exports.updatePayment = async (req, res) => {
    const payment = req.body;
    const result = await User.insertOne(payment);
    const id = payment.bookingId
    const filter = { _id: ObjectId(id) }
    const updatedDoc = {
        $set: {
            paid: true,
            transactionId: payment.transactionId
        }
    }
    const updatedResult = await bookingsCollection.updateOne(filter, updatedDoc)
    res.send(result);
}

