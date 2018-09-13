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

const allNoteTypes = (_, { where = {} }) => {
  return NoteType.find(createFilter(where)).populate('templates');
};

const getNoteType = async (_, { where = {} }) => {
  if (where.id) {
    return NoteType.findById(where.id).populate('templates');
  }
  return NoteType.findOne(createFilter(where)).populate('templates');
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
    .populate('templates');
};

const updateNoteType = (_, { input }) => {
  const { id, ...update } = input;
  return NoteType.findByIdAndUpdate(id, update, { new: true }).populate(
    'templates'
  );
};

const updateNoteTypeAndConnectToTemplates = (_, { input }) => {
  const { id, templates, ...update } = input;
  return NoteType.findByIdAndUpdate(
    id,
    { ...update, templates: templates.map(mongoose.Types.ObjectId) },
    { new: true }
  ).populate('templates');
};

const updateNoteTypeAndUpsertTemplates = async (_, { input }) => {
  let { id, templates, ...update } = input;
  if (templates) {
    console.log('templates', templates);
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
    console.log('bulkOps', bulkOps);
    const bulkWriteResult = await Template.bulkWrite(bulkOps);
    console.log('bulkWriteResult', bulkWriteResult);
    const allTemplateIds = [
      ...pluck('id', templates),
      ...pluck('_id', bulkWriteResult.getInsertedIds())
    ];
    console.log('allTemplateIds', bulkWriteResult.getInsertedIds());
    update.templates = allTemplateIds.map(mongoose.Types.ObjectId);
  }
  const res = await NoteType.findByIdAndUpdate(id, update, {
    new: true
  }).populate('templates');
  console.log('result', res);
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
