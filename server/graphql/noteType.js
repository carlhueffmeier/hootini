const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const NoteType = mongoose.model('NoteType');
const Template = mongoose.model('Template');
const { createFilter, pluck } = require('../helper/utils');

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

const populateOptions = [{ path: 'fieldDefinitions' }, { path: 'templates' }];

const allNoteTypes = (_, { where = {} }) => {
  return NoteType.find(createFilter(where)).populate(populateOptions);
};

const getNoteType = async (_, { where = {} }) => {
  if (where.id) {
    return NoteType.findById(where.id).populate(populateOptions);
  }
  return NoteType.findOne(createFilter(where)).populate(populateOptions);
};

const createNoteType = (_, { input }) => {
  return new NoteType(input).save();
};

const createNoteTypeAndConnectToTemplates = (_, { input }) => {
  const { id, templates, ...ownProps } = input;
  return new NoteType({
    ...ownProps,
    templates: templates.map(mongoose.Types.ObjectId)
  })
    .save()
    .populate(populateOptions);
};

const updateNoteType = (_, { input }) => {
  const { id, ...update } = input;
  return NoteType.findByIdAndUpdate(id, update, { new: true }).populate(
    populateOptions
  );
};

const updateNoteTypeAndConnectToTemplates = (_, { input }) => {
  const { id, templates, ...update } = input;
  return NoteType.findByIdAndUpdate(
    id,
    { ...update, templates: templates.map(mongoose.Types.ObjectId) },
    { new: true }
  ).populate(populateOptions);
};

const updateNoteTypeAndUpsertTemplates = async (_, { input }) => {
  let { id, templates, ...update } = input;
  if (templates && templates.length > 0) {
    const bulkOps = templates.map(
      ({ id: templateId, ...templateData }) =>
        templateId
          ? {
              updateOne: {
                filter: { _id: templateId },
                update: { $set: templateData }
              }
            }
          : {
              insertOne: {
                document: templateData
              }
            }
    );
    const bulkWriteResult = await Template.bulkWrite(bulkOps);
    const allTemplateIds = [
      ...pluck('id', templates),
      ...pluck('_id', bulkWriteResult.getInsertedIds())
    ];
    update.templates = allTemplateIds.map(mongoose.Types.ObjectId);
  }
  // * If templates were removed -> remove all notes with that template (high priority)
  // * If templates were added -> add new cards with that template (ask the user for confirmation -> maybe separate action like `generateCards`)
  // * If fields were removed -> remove fields from cards (no negative repercussions, low priority)
  // * If fields were added -> don't care (if null assume empty)
  const res = await NoteType.findByIdAndUpdate(id, update, {
    new: true
  }).populate(populateOptions);
  return res;
};

exports.resolvers = {
  Query: {
    allNoteTypes,
    NoteType: getNoteType
  },

  Mutation: {
    createNoteType,
    createNoteTypeAndConnectToTemplates,
    updateNoteType,
    updateNoteTypeAndConnectToTemplates,
    updateNoteTypeAndUpsertTemplates
  }
};
