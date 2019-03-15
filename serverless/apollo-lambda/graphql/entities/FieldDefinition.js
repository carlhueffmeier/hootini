const { gql } = require('apollo-server-lambda');

exports.typeDef = gql`
  type FieldDefinition {
    id: ID!
    key: String!
    type: String!
  }

  input FieldDefinitionUpdateInput {
    key: String
    type: String
  }

  input FieldDefinitionCreateInput {
    key: String!
    type: String
  }

  input FieldDefinitionUpsertInput {
    id: ID
    key: String
    type: String
  }
`;
