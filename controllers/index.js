var db = require('../db/database');
var User = require('../models/user'),
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
  var user = db.findOne(req.body.username);
  var plainPassword = req.body.passwordHash;
  var hashedPassword = bcrypt.hashSync(req.body.passwordHash, dbSalt);
  var comparison = bcrypt.compareSync(plainPassword, user.passwordHash);
  if (comparison === true) {
    req.session.loggedIn = true;
    console.log("YOU LOGGED IN");
  } else {
    console.log("FUCK YOU");
  }

  // --------- debuggin -----------------

  // console.log('-------------- POST LOGIN ----------------');
  // console.log(user);
  // console.log(req.body.username);
  // console.log(plainPassword);
  // console.log(hashedPassword);
  // console.log(bcrypt.hashSync(req.body.passwordHash, dbSalt));
  // console.log(bcrypt.compareSync(plainPassword, hashedPassword));
  // console.log('----------- END POST LOGIN ---------------');
  res.redirect('/');
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
    console.log(user.username);
    console.log(user.passwordHash);
    console.log('------------- END CALLBACK -----------------');
    // req.session.loggedIn = true;
  });
  res.redirect('/');
});

module.exports = router;
