const express = require('express');
const router = express.Router();


const search = require('./search');
router.use('/search', search);


module.exports = router;