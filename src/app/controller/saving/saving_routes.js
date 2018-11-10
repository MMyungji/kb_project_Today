const express = require('express');
const router = express.Router();

const postSaving = require('./postSaving');
router.use('/saving', postSaving);

const getSaving = require('./getSaving');
router.use('/saving', getSaving);


const deleteSaving = require('./deleteSaving');
router.use('/saving', deleteSaving);

module.exports = router;
