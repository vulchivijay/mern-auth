const express = require('express');
const router = express.Router();

// import controller
const { requireSignin } = require('./../controllers/auth');
const { addtodo, todoupdate, todos } = require('./../controllers/todos.js');

// import validators

//
router.post('/addtodo', requireSignin, addtodo);
router.post('/addtodo/:id', requireSignin, todoupdate);
router.get('/todos', requireSignin, todos);

module.exports = router; // default empty object