const mongoose = require('mongoose');
const User = mongoose.model('User');
const populateNewUserData = require('../populateNewUserData');

const fixQuery = query => {
  const { id, ...rest } = query;
  return id ? { _id: id, ...rest } : rest;
};

function generateUserModel() {
  const findOne = where => {
    return User.findOne(fixQuery(where));
  };

  const findOneAndUpdate = (where = {}, update) => {
    return User.findOneAndUpdate(fixQuery(where), update, { new: true });
  };

  const create = async input => {
    const newUser = await new User(input).save();
    // Add the welcome package 🎁
    populateNewUserData(newUser);
    return newUser;
  };

  return {
    findOne,
    findOneAndUpdate,
    create
  };
}

module.exports = generateUserModel;
