const { ApolloServer } = require('apollo-server-express');
const generateModels = require('./db/generateModels');

// Import type definitions and resolvers for custom scalar types
const { typeDefs, resolvers } = require('./graphql');

// Putting the request and response objects into the context
// (for authentication)
// We are also generating the models based on the current
// user
function createContext({ req, res }) {
  return {
    db: generateModels({ user: req.user }),
    req,
    res
  };
}

const apolloServerOptions = {
  typeDefs,
  resolvers,
  // The context can be provided as an object or a factory function
  context: createContext
};

// Enable Apollo Engine integration if an API key is provided
// Further information: https://www.apollographql.com/engine
if (process.env.ENGINE_API_KEY) {
  apolloServerOptions.engine = { apiKey: process.env.ENGINE_API_KEY };
}

const apolloServer = new ApolloServer(apolloServerOptions);

module.exports = apolloServer;
