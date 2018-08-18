const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const NoteType = mongoose.model('NoteType');
const { createFilter } = require('../helper/utils');

exports.typeDef = gql`
  extend type Query {
    NoteType(id: ID!): NoteType!
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
  }

  type NoteType {
    id: ID!
    name: String!
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

  input SearchNoteType {
    name: String
  }
`;

const allNoteTypes = (_, { where = {} }) => {
  return NoteType.find(createFilter(where)).populate('templates');
};

const getNoteType = (_, { id }) => {
  return NoteType.findById(id).populate('templates');
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

exports.resolvers = {
  Query: {
    allNoteTypes,
    NoteType: getNoteType
  },

  Mutation: {
    createNoteType,
    createNoteTypeAndConnectToTemplates,
    updateNoteType,
    updateNoteTypeAndConnectToTemplates
  }
};
