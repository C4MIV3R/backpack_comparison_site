var User = require('../models/user'),
    express   = require('express'),
    router    = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn) {
    console.log(req.body); // empty object?
    console.log(req.session);
    res.render('account', { title: 'My Account' });
  } else res.redirect('/');
});

module.exports = router;
