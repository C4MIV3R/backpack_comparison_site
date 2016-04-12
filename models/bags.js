var mongoose = require('mongoose');

var BagsSchema = new mongoose.Schema({
  manufacturer      : String,
  model             : String,
  price             : String,
  dimensionLength   : String,
  dimensionWidth    : String,
  dimensionHeight   : String,
  totalRating       : String
});

module.exports = mongoose.model('Bags', BagsSchema);
