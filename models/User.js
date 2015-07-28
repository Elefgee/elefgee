var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  // add any additional properties here as well as routes/auth.js and routes/profile.js
  // newProperty: String,
  displayName: String,
  picture: String,
  steamId: String,
  games: Object
});

userSchema.pre('save', function(next) {
  var user = this;
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
