const mongoose = require('mongoose');
let bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    index: { unique: true } 
  },
  password: { 
    type: String, 
    required: [true, 'password is required'] 
  },
  firstname: {
    type: String,
    required: [true, 'firstname is required'] 
  },
  secondname: {
    type: String,
  },
  lastname: {
    type: String,
    required: [true, 'lastname is required'] 
  },
  role: {
    type: String,
    enum: ['AUDITOR', 'ADMINISTRATOR'],
    default: 'AUDITOR'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});
// excerpt from http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
module.exports = mongoose.model('user', userSchema)
