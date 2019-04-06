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
  return services.noteType.findOneBySlug(where.slug);
};

const allNoteTypes = (_, { where }, { services }) => {
  return services.noteType.find(where);
};

const createNoteType = (_, { data: noteTypeData }, { services }) => {
  return services.noteType.createDeck(noteTypeData);
};

const updateNoteType = (_, { data: changes }, { services }) => {
  return services.noteType.updateDeck(changes);
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
