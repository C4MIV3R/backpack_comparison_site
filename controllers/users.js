var express = require('express');
var router = express.Router();

var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('account', { title: 'My Account' });
})
.post('/', function(req, res, next) {
  User.create(req.body, function(err, User) {
    if (err) return next(err);
    res.render('account');
  });
});

module.exports = router;
