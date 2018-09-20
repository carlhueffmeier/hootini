const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { AuthenticationError } = require('apollo-server-express');

const throwAuthError = () => {
  try {
    throw new AuthenticationError("You don't have sufficient access rights");
  } catch (error) {
    console.error('Authentication Error');
    console.error(error);
    throw error;
  }
};

const checkAuth = user => {
  if (!user) {
    throwAuthError();
  }
};

const addUserInfo = user => ({
  owner: ObjectId(user.id || user._id)
});

const createFilter = (where, user) => {
  if (!user) {
    throw new Error("Don't forget to pass a user to createFilter");
  }
  if (where.id) {
    return { _id: where.id, ...addUserInfo(user) };
  }
  return { ...where, ...addUserInfo(user) };
};

module.exports = {
  checkAuth,
  addUserInfo,
  createFilter,
  throwAuthError
};
