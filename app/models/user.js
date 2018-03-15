const
  mongoose = require('mongoose'),
  validator = require('validator'),
  jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  languages: [
    {id: {type: String, required: true, trim: true}}
  ],
  favoriteActors: [
    {name: {type: String, required: true, trim: true}}
  ],
  favoriteDirectors: [
    {name: {type: String, required: true, trim: true}}
  ]
});



UserSchema.statics.findByUserId = function(userId){
  return User.findOne({userId});
};

const User = mongoose.model('User', UserSchema);


module.exports = User;