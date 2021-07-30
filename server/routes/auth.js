const express = require('express');
const router = express.Router();

// import controller
const { signup } = require('./../controllers/auth.js');

//
router.get('/signup', signup)

module.exports = router; // default empty object