const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You have to provide an name'
  },
  email: {
    type: String,
    trim: true,
    required: 'You have to provide an email address'
  },
  password: {
    type: String,
    required: 'You have to provide a password'
  },
  resetToken: String,
  resetTokenExpiry: String,
  permissions: [String]
});

module.exports = mongoose.model('User', userSchema);
