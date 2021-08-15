const express = require('express');
const router = express.Router();

// import controller
const { requireSignin } = require('./../controllers/auth');
const { addtodo, todoupdate, todos, readtask } = require('./../controllers/todos.js');

// import validators

//
router.post('/addtodo', requireSignin, addtodo);
router.get('/alltasks/:id', requireSignin, readtask);
router.put('/todo/update', requireSignin, todoupdate);
router.get('/todos/:email', requireSignin, todos);

module.exports = router; // default empty object