const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs, resolvers } = require('./graphql');
const { createContext } = require('./graphQLContext');

const apolloServerOptions = {
  typeDefs,
  resolvers,
  context: createContext,
  mocks: true,
  mockEntireSchema: false
};

const createHandlerOptions = {
  cors: {
    origin: '*',
    credentials: true
  }
};

const server = new ApolloServer(apolloServerOptions);

exports.graphqlHandler = server.createHandler(createHandlerOptions);
