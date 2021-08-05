const express = require('express');
const router = express.Router();

// import controller
const { requireSignin } = require('./../controllers/auth');
const { readuser } = require('./../controllers/user.js');

// import validators

// route paths
router.post('/user/:id', requireSignin, readuser);


module.exports = router; // default empty object