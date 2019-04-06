const { gql } = require('apollo-server-lambda');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

exports.typeDef = gql`
  scalar DateTime
`;

exports.resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    // Value from the client
    parseValue(value) {
      return new Date(value).getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value).getTime();
      }
      return null;
    },
    // Value sent to the client
    serialize(value) {
      return new Date(value).toISOString();
    }
  })
};
