const express = require('express');
const router = express.Router();

//signup
const signup = require('./signup');
router.use('/signup', signup);

// signin
const signin = require('./signin');
router.use('/signin', signin);

//const updateUser = require('./user');
//router.use('/user', updateUser);

module.exports = router;
