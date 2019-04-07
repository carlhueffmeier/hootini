const { gql } = require('apollo-server-lambda');

exports.typeDef = gql`
  extend type Query {
    noteType(where: NoteTypeWhereUniqueInput!): NoteType!
    allNoteTypes(where: NoteTypeWhereInput): [NoteType]!
  }

  extend type Mutation {
    createNoteType(data: NoteTypeCreateInput!): NoteType!
    updateNoteType(where: NoteTypeWhereUniqueInput!, data: NoteTypeUpdateInput!): NoteType!
  }

  type NoteType {
    id: ID!
    name: String!
    slug: String!
    fields: [FieldDefinition!]!
    templates: [Template!]!
  }

  input NoteTypeCreateInput {
    name: String!
    fields: [FieldDefinitionCreateInput!]
    templates: [TemplateCreateInput!]
  }

  input NoteTypeUpdateInput {
    name: String
    fields: [FieldDefinitionUpsertInput!]
    templates: [TemplateUpsertInput!]
  }

  input NoteTypeWhereUniqueInput {
    slug: String
  }

  input NoteTypeWhereInput {
    name: String
  }
`;

const getNoteType = (_, { where }, { services }) => {
  return services.noteType.findOne(where);
};

const allNoteTypes = (_, { where }, { services }) => {
  return services.noteType.find(where);
};

const createNoteType = (_, { data }, { services }) => {
  return services.noteType.createDeck(data);
};

const updateNoteType = (_, { where, data }, { services }) => {
  return services.noteType.findOneAndUpdate(where, data);
};

exports.resolvers = {
  Query: {
    noteType: getNoteType,
    allNoteTypes
  },

  Mutation: {
    createNoteType,
    updateNoteType
  }
};
