const express = require('express');
const router = express.Router();

const postFollow = require('./postFollow');
router.use('/follow', postFollow);



module.exports = router;
