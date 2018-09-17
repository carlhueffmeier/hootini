const mongoose = require('mongoose');
const User = mongoose.model('User');

function generateUserModel() {
  const findOne = where => {
    return User.findOne(where);
  };

  const create = input => {
    return new User(input).save();
  };

  return {
    findOne,
    create
  };
}

module.exports = generateUserModel;
