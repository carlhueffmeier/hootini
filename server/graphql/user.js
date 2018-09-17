const { gql } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.typeDef = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    signup(input: UserSignupInput): User!
    signin(input: UserSigninInput): User!
    signout: SuccessMessage
  }

  type User {
    id: ID!
    name: String!
    email: String!
    permissions: [Permission]
  }

  type SuccessMessage {
    message: String
  }

  input UserSignupInput {
    email: String!
    password: String!
    name: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  enum Permission {
    ADMIN
    USER
  }
`;

const me = (_, __, { req }) => {
  return req.user;
};

const signup = async (_, { input: { email, password, name } }, { db, res }) => {
  const newUser = await db.user.create({
    email: email,
    password: await bcrypt.hash(password, 10),
    name: name,
    permissions: ['USER']
  });
  const token = jwt.sign({ userId: newUser.id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });
  return newUser;
};

const signin = async (_, { input: { email, password } }, { db, res }) => {
  const user = await db.user.findOne({
    email: email.toLowerCase()
  });
  if (!user) {
    throw new Error(`No user found for email ${email}.`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error(`Invalid password.`);
  }
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });
  return user;
};

const signout = async (_, __, { res }) => {
  res.clearCookie('token');
  return { message: 'Goodbye 👋' };
};

exports.resolvers = {
  Query: {
    me
  },

  Mutation: {
    signup,
    signin,
    signout
  }
};
