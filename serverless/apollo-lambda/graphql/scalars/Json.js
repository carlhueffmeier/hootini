const { gql } = require('apollo-server-lambda');
const GraphQLJson = require('graphql-type-json');

exports.typeDef = gql`
  scalar Json
`;

exports.resolvers = {
  Json: GraphQLJson
};
