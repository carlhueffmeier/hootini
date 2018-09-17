const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { AuthenticationError } = require('apollo-server-express');

const throwAuthError = () => {
  console.warn('auth error');
  throw new AuthenticationError("You don't have sufficient access rights");
};

const matchUserStage = user => ({
  $where: { owner: ObjectId(user.id) }
});

const checkAuth = user => {
  if (!user) {
    throwAuthError();
  }
};

const addUserInfo = user => ({
  owner: ObjectId(user.id)
});

const createFilter = (where, user) => {
  if (where.id) {
    return { _id: id, ...addUserInfo(user) };
  }
  return { ...where, ...addUserInfo(user) };
};

module.exports = {
  matchUserStage,
  checkAuth,
  addUserInfo,
  createFilter,
  throwAuthError
};
