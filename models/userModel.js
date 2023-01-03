const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Must be requires']
  },
  email: {
    type: String,
    required: [true, 'An Email must be Required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'A Password must be required'],
    minLength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A Confirm Password must be required'],
    validate: {
      // This only works on Create and Save
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  }
});

userSchema.pre('save', async function(next) {
    // Only run if the password is modified
  if (!this.isModified('password')) return next();
   // Hashing the password to 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete the passw0rd confirm
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
