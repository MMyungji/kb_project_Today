const express = require('express');
const router = express.Router();

const postFeeling = require('./postFeeling');
router.use('/feeling', postFeeling);


module.exports = router;
