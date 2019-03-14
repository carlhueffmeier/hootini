const { ApolloServer, gql } = require('apollo-server-lambda');
const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql`
  scalar JSON

  type Query {
    hello: String
    headers: JSON
    event: JSON
    context: JSON
  }
`;

const resolvers = {
  Query: {
    hello: (_, __, { functionName }) => `Hello from ${functionName}!`,
    headers: (_, __, { headers }) => headers,
    event: (_, __, { event }) => event,
    context: (_, __, { context }) => context,
  },
  JSON: GraphQLJSON
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  }
});
