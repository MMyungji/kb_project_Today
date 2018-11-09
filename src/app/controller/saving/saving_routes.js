const express = require('express');
const router = express.Router();

const postSaving = require('./postSaving');
router.use('/saving', postSaving);


module.exports = router;
