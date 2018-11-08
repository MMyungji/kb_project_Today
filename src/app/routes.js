var express = require('express');
var router = express.Router();

const user = require('./controller/user/user_routes');
router.use('/', user);


module.exports = router;