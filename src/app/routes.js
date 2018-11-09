var express = require('express');
var router = express.Router();

const user = require('./controller/user/user_routes');
router.use('/', user);

const feeling = require('./controller/feeling/feeling_routes');
router.use('/', feeling);

const saving = require('./controller/saving/saving_routes');
router.use('/', saving);

module.exports = router;