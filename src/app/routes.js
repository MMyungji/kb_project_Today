var express = require('express');
var router = express.Router();

const user = require('./controller/user/user_routes');
router.use('/', user);

const feeling = require('./controller/feeling/feeling_routes');
router.use('/', feeling);

const saving = require('./controller/saving/saving_routes');
router.use('/', saving);

const follow = require('./controller/follow/follow_routes');
router.use('/', follow);

const search = require('./controller/search/search_routes');
router.use('/', search);

const box = require('./controller/box/box_routes');
router.use('/', box);

const change = require('./controller/change');
router.use('/change', change);

module.exports = router;