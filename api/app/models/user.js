const
  mongoose = require('mongoose');

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

UserSchema.statics.getAllByPage = function(page){
  const User = this;
  return new Promise((resolve, reject)=>{
    User.find()
      .skip(page.index * page.size)
      .limit(page.size)
      .sort({_id: 1})
      .exec(function (error, users) {
        if (error) {
          return reject(error);
        }
        resolve(users);
      });
  });
};

const User = mongoose.model('User', UserSchema);


module.exports = User;
