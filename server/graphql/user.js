const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

exports.typeDef = gql`
  extend type Mutation {
    signup(input: UserSignupInput): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiry: String
    permissions: [Permission]
  }

  input UserSignupInput {
    email: String!
    password: String!
    name: String!
  }

  enum Permission {
    ADMIN
    USER
  }
`;

const signup = async (_, { input: { email, password, name } }, { res }) => {
  const newUser = await new User({
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10),
    name: name.trim(),
    permissions: ['USER']
  }).save();
  console.log('user info', newUser);
  const token = jwt.sign({ userId: newUser.id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });

  return newUser;
};

exports.resolvers = {
  Query: {},

  Mutation: {
    signup
  }
};
