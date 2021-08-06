const express = require('express');
const router = express.Router();

// import controller
const { requireSignin, adminMiddleware } = require('./../controllers/auth');
const { readuser, readusers, updateuser } = require('./../controllers/user.js');

// import validators

// route paths
router.get('/users', requireSignin, readusers);
router.get('/user/:id', requireSignin, readuser);
router.put('/user/update', requireSignin, updateuser);
router.put('/admin/update', requireSignin, adminMiddleware, updateuser);


module.exports = router; // default empty object