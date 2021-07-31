const express = require('express');
const router = express.Router();

// import controller
const { signup, accountActivation, signin } = require('./../controllers/auth.js');

// import validators
const { userSignupValidator, userSigninValidator } = require('./../validators/auth');
const { runValidation } = require('./../validators')

//
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);

module.exports = router; // default empty object