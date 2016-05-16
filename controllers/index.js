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
  if (req.session.loggedIn === true) {
    console.log("You're already logged in!");
    res.redirect('/');
  } else res.render('login', { title: 'Login'});
}) // ------------------ post to Login ----------------------
.post('/login', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (user) {
      var enteredPassword = req.body.passwordHash;
      var comparison = bcrypt.compareSync(enteredPassword, user.passwordHash);
      if (comparison === true) {
        req.session.loggedIn = true;
        req.session.userID = user._id;
        var currentUser = user.username;
        console.log("Welcome to the site, "+ currentUser);
        console.log(req.session);
        res.redirect('/');
      } else {
          console.log("The username or password you entered was incorrect.");
          res.redirect('/login');
      }
    } else {
        console.log("User doesn't exist.");
        res.redirect('/register');
      }
  });
}) // ------------------ get Register -----------------------
.get('/register', function(req, res, next) {
  if (req.session.loggedIn === true) {
    console.log("You're already logged in!");
    res.redirect('/');
  } else res.render('register', { title: 'Register'});
}) // ----------------- post to Register --------------------
.post('/register', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (user) {
      console.log('This user already exists.');
      res.redirect('/register');
    } else {
        User.create({
          username      : req.body.username,
          passwordHash  : bcrypt.hashSync(req.body.passwordHash, dbSalt),
          email         : req.body.email,
          firstName     : req.body.firstName,
          lastName      : req.body.lastName
      }, function(err, user) {
        req.session.loggedIn = true;
        req.session.userID = user._id;
        var currentUser = user.username;
        console.log("You have created an account under the name "+ currentUser +" and been logged in.");
        console.log(req.session);
        res.redirect('/');
      });
    }
  });
})
.get('/logout', function(req, res, next) {
  req.session.loggedIn = null;
  res.redirect('/');
})
.get('/about', function(req, res, next) {
  res.render('about', { title: 'About TechBags'});
});

module.exports = router;
