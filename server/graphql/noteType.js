const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  extend type Query {
    NoteType(where: SearchNoteType): NoteType!
    allNoteTypes(where: SearchNoteType): [NoteType]!
  }

  extend type Mutation {
    createNoteType(input: NewNoteType!): NoteType!
    createNoteTypeAndConnectToTemplates(
      input: NewNoteTypeAndConnectedTemplates!
    ): NoteType!
    updateNoteType(input: UpdatedNoteType!): NoteType!
    updateNoteTypeAndConnectToTemplates(
      input: UpdatedNoteTypeAndConnectedTemplates
    ): NoteType!
    updateNoteTypeAndUpsertTemplates(
      input: UpdatedNoteTypeAndUpsertedTemplates
    ): NoteType!
  }

  type NoteType {
    id: ID!
    name: String!
    slug: String!
    fieldDefinitions: [FieldDefinition!]!
    templates: [Template!]!
  }

  input UpdatedNoteType {
    id: ID!
    name: String
    fieldDefinitions: [UpdatedFieldDefinition!]
  }

  input UpdatedNoteTypeAndConnectedTemplates {
    id: ID!
    name: String
    fieldDefinitions: [UpdatedFieldDefinition!]
    templates: [ID!]
  }

  input NewNoteType {
    name: String!
    fieldDefinitions: [NewFieldDefinition!]
    templates: [NewTemplate!]
  }

  input NewNoteTypeAndConnectedTemplates {
    name: String!
    fieldDefinitions: [NewFieldDefinition!]
    templates: [ID!]
  }

  input UpdatedNoteTypeAndUpsertedTemplates {
    id: ID!
    name: String
    fieldDefinitions: [UpsertedFieldDefinition!]
    templates: [UpsertedTemplate!]
  }

  input SearchNoteType {
    id: ID
    name: String
    slug: String
  }
`;

const getNoteType = async (_, { where = {} }, { db }) => {
  return db.noteType.findOne(where);
};

const allNoteTypes = (_, { where = {} }, { db }) => {
  return db.noteType.find(where);
};

const createNoteType = (_, { input }, { db }) => {
  return db.noteType.create(input);
};

const updateNoteTypeAndUpsertTemplates = async (_, { input }, { db }) => {
  let { id, templates, ...update } = input;
  if (templates && templates.length > 0) {
    const { allIds } = await db.template.upsertMany(templates);
    update.templates = allIds;
  }
  return db.noteType.findOneAndUpdate({ id }, update);
};

exports.resolvers = {
  Query: {
    NoteType: getNoteType,
    allNoteTypes
  },

  Mutation: {
    createNoteType,
    updateNoteTypeAndUpsertTemplates
  }
};
