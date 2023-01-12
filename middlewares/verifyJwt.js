const jwt = require('jsonwebtoken');
const createError = require('./error.middleware.js');

const verifyJwt = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(token);
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) next(createError(403, "Token is not valid"));
        req.user = user;
        next();
    })

}

module.exports = verifyJwt;