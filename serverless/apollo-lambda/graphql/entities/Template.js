const { gql } = require('apollo-server-lambda');

exports.typeDef = gql`
  type Template {
    id: ID!
    name: String!
    front: String
    back: String
  }

  input TemplateCreateInput {
    name: String!
    front: String!
    back: String!
  }

  input TemplateUpsertInput {
    id: ID
    name: String
    front: String
    back: String
  }
`;
