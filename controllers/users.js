var express = require('express'),
    router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('account', { title: 'My Account' });
})

module.exports = router;
