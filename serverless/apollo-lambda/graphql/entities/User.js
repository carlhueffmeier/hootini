const { gql, AuthenticationError } = require('apollo-server-lambda');
const { generateUserToken } = require('../../lib/utils');

exports.typeDef = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    signup(data: UserSignupInput!): UserAuthenticationResponse!
    signin(data: UserSigninInput!): UserAuthenticationResponse!
    requestReset(data: UserRequestResetInput!): SuccessMessage
    resetPassword(data: UserResetPasswordInput!): UserAuthenticationResponse!
  }

  type User {
    email: String!
    name: String!
  }

  type SuccessMessage {
    message: String
  }

  type UserAuthenticationResponse {
    email: String!
    name: String!
    token: String!
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

  input UserRequestResetInput {
    email: String!
  }

  input UserResetPasswordInput {
    resetToken: String!
    password: String!
  }
`;

const me = (_, __, { services }) => {
  return services.user.getCurrentUser();
};

const signup = async (_, { data: userInfo }, { services }) => {
  const newUser = await services.user.create(userInfo);
  return {
    email: newUser.email,
    name: newUser.name,
    token: generateUserToken(newUser)
  };
};

const signin = async (_, { data: credentials }, { services }) => {
  try {
    const user = services.user.authenticate(credentials);
    return {
      email: user.email,
      name: user.name,
      token: generateUserToken(user)
    };
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

const requestReset = () => {
  throw new Error('WIP');
};

const resetPassword = () => {
  throw new Error('WIP');
};

exports.resolvers = {
  Query: {
    me
  },

  Mutation: {
    signup,
    signin,
    requestReset,
    resetPassword
  }
};
