const express = require('express');
const router = express.Router();

const community = require('./community');
router.use('/community', community);


module.exports = router;