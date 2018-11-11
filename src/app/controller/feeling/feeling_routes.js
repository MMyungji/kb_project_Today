const express = require('express');
const router = express.Router();

const postFeeling = require('./postFeeling');
router.use('/feeling', postFeeling);

const getcomfort = require('./getcomfort');
router.use('/comfort', getcomfort);

const updateFeeling = require('./updateFeeling');
router.use('/feeling', updateFeeling);

module.exports = router;
