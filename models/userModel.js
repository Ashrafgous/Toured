const mongoose = require('mongoose');
const validator = require('validator');

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
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A Confirm Password must be required'],
    minLength: 8,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
