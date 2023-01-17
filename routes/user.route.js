const express = require('express');
const { signup, login, updateUser, getUser, getUserById } = require('../controllers/user.controller');
const verifyJwt = require('../middlewares/verifyJwt');




const router = express.Router();

router.post("/signup", signup);
router.post("/login", login, verifyJwt);
router.put("/updateUser/:id", updateUser);
router.get("/getuser/:id", getUserById);
router.get("/getuser", getUser);

module.exports = router;