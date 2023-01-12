const express = require('express');
const { signup, login } = require('../controllers/user.controller');
const verifyJwt = require('../middlewares/verifyJwt');



const router = express.Router();

router.post("/signup", signup);
router.post("/login", verifyJwt, login);

module.exports = router;