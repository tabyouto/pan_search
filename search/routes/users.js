var express = require('express');
var router = express.Router();


var common = require('../common/common');
var async = require('async');
var Base = require('../action/fun');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
