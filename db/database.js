var mongoose = require('mongoose');

var connectionString = process.env.DB;

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('Mongoose is connected to: ' + connectionString);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose has encounted an error: '+ err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected from: '+ connectionString);
});
