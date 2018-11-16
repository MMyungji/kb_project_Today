const express = require('express');
const router = express.Router();

//signup
const signup = require('./signup');
router.use('/signup', signup);

// signin
const signin = require('./signin');
router.use('/signin', signin);

const updateUser = require('./updateUser');
router.use('/user', updateUser);

const getUser = require('./getUser');
router.use('/user', getUser);

const getName = require('./getName');
router.use('/user', getName);

module.exports = router;
