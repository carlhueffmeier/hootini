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
    id: ID!
    email: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type SuccessMessage {
    message: String
  }

  type UserAuthenticationResponse {
    user: User!
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
  const newUser = await services.user.createUser(userInfo);
  return {
    user: newUser,
    token: generateUserToken(newUser)
  };
};

const signin = async (_, { data: credentials }, { services }) => {
  try {
    const user = await services.user.authenticate(credentials);
    return {
      user,
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
