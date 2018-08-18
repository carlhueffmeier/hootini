const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  type FieldDefinition {
    key: String!
    type: String!
  }

  input UpdatedFieldDefinition {
    key: String
    type: String
  }

  input NewFieldDefinition {
    key: String!
    type: String!
  }
`;
