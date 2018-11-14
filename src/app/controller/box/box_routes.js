const express = require('express');
const router = express.Router();

const postBox = require('./postBox');
router.use('/box', postBox);

const getBox = require('./getBox');
router.use('/box', getBox);

module.exports = router;
