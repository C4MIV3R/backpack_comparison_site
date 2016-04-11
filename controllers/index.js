var User          = require('../models/user'),
    express       = require('express'),
    router        = express.Router(),
    bcrypt        = require('bcrypt'),
    dbSalt        = bcrypt.genSaltSync(10);

// ------------------ get Root -----------------------
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TechBags' });
})
// ------------------ get Login -----------------------
.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login'});
}) // ------------------ post to Login ----------------------
.post('/login', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (user) {
      var enteredPassword = req.body.passwordHash;
      var comparison = bcrypt.compareSync(enteredPassword, user.passwordHash);
      if (comparison === true) {
        req.session.loggedIn = true;
        console.log("Welcome to the site.");
        res.redirect('/');
      } else {
        console.log("The username or password you entered was incorrect.");
        res.redirect('/login');
      }
    } else {
      console.log("User doesn't exist.")
        res.redirect('/login');
      }
  });
}) // ------------------ get Register -----------------------
.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register'});
}) // ----------------- post to Register --------------------
.post('/register', function(req, res, next) {
  User.create({
    username      : req.body.username,
    passwordHash  : bcrypt.hashSync(req.body.passwordHash, dbSalt),
    email         : req.body.email,
    firstName     : req.body.firstName,
    lastName      : req.body.lastName
  }, function(err, user) {
    req.session.loggedIn = true;
    console.log("You have created an account and been logged in.");
    res.redirect('/');
  });
});

module.exports = router;
