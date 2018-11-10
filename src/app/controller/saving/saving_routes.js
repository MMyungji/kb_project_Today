const express = require('express');
const router = express.Router();

const postSaving = require('./postSaving');
router.use('/saving', postSaving);

const getSaving = require('./getSaving');
router.use('/saving', getSaving);

module.exports = router;
