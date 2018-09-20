const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  type NoteField {
    key: String!
    value: String
  }

  input NoteFieldCreateInput {
    key: String!
    value: String
  }

  input NoteFieldUpdateInput {
    key: String!
    value: String
  }
`;
