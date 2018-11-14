const express = require('express');
const router = express.Router();

const community = require('./community');
router.use('/community', community);

const getFollowList = require('./getFollowList');
router.use('/follow', getFollowList);

const getUser = require('./getUser');
router.use('/user', getUser);

module.exports = router;