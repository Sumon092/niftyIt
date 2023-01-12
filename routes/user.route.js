const express = require('express');
const { signup, login, updateUser } = require('../controllers/user.controller');
const verifyJwt = require('../middlewares/verifyJwt');
const User = require('../models/User');



const router = express.Router();

router.post("/signup", signup);
router.post("/login", verifyJwt, login);
router.put("/updateUser/:id", updateUser);

module.exports = router;