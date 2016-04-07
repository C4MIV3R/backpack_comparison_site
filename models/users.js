var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  username          : String,
  passwordHash      : String,
  email             : String,
  firstName         : String,
  lastName          : String
});

module.exports = mongoose.model('User', UsersSchema);
