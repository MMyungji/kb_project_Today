const express = require('express');
const router = express.Router();

const postFollow = require('./postFollow');
router.use('/follow', postFollow);

const getFollower = require('./getFollower');
router.use('/follower', getFollower);

const getFollowing = require('./getFollowing');
router.use('/following', getFollowing);

const deleteFollow = require('./deleteFollow');
router.use('/follow', deleteFollow);

module.exports = router;
