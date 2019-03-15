const { gql } = require('apollo-server-lambda');
const { createSearchFilter } = require('../../lib/utils');

exports.typeDef = gql`
  extend type Query {
    noteType(where: NoteTypeWhereUniqueInput): NoteType!
    allNoteTypes(where: NoteTypeWhereInput): [NoteType]!
  }

  extend type Mutation {
    createNoteType(data: NoteTypeCreateInput!): NoteType!
    updateNoteType(data: NoteTypeUpdateInput!): NoteType!
    updateNoteTypeAndUpsertTemplates(data: NoteTypeUpdateAndUpsertTemplatesInput!): NoteType!
  }

  type NoteType {
    id: ID!
    name: String!
    slug: String!
    fieldDefinitions: [FieldDefinition!]!
    templates: [Template!]!
  }

  input NoteTypeUpdateInput {
    id: ID!
    name: String
    fieldDefinitions: [FieldDefinitionUpdateInput!]
  }

  input NoteTypeCreateInput {
    name: String!
    fieldDefinitions: [FieldDefinitionCreateInput!]
    templates: [TemplateCreateInput!]
  }

  input NoteTypeUpdateAndUpsertTemplatesInput {
    id: ID!
    name: String
    fieldDefinitions: [FieldDefinitionUpsertInput!]
    templates: [TemplateUpsertInput!]
  }

  input NoteTypeWhereUniqueInput {
    id: ID
    slug: String
  }

  input NoteTypeWhereInput {
    name: String
  }
`;

const getNoteType = (_, { where }, { db }) => {
  return db.noteType.findOne(where);
};

const allNoteTypes = (_, { where = {} }, { db }) => {
  const filter = createSearchFilter(['name'], where);
  return db.noteType.find(filter);
};

const createNoteType = (_, { data }, { db }) => {
  return db.noteType.create(data);
};

const updateNoteTypeAndUpsertTemplates = async (_, { data }, { db }) => {
  let { id, templates, ...update } = data;
  if (templates && templates.length > 0) {
    const { allIds } = await db.template.upsertMany(templates);
    update.templates = allIds;
  }
  return db.noteType.findOneAndUpdate({ id }, update);
};

exports.resolvers = {
  Query: {
    noteType: getNoteType,
    allNoteTypes
  },

  Mutation: {
    createNoteType,
    updateNoteTypeAndUpsertTemplates
  }
};
