const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => `Hello there`
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = apolloServer;
