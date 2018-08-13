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
    newNoteType(input: NewNoteType!): NoteType!
    updateNoteType(input: UpdatedNoteType!): NoteType!
  }

  type NoteType {
    id: ID!
    name: String!
  }

  input UpdatedNoteType {
    id: ID!
    name: String
  }

  input NewNoteType {
    name: String!
  }

  input SearchNoteType {
    name: String
  }
`;

const allNoteTypes = (_, { where = {} }) => {
  return NoteType.find(createFilter(where));
};

const getNoteType = (_, { id }) => {
  return NoteType.findById(id);
};

const newNoteType = (_, { input }) => {
  return new NoteType(input).save();
};

const updateNoteType = (_, { input }) => {
  const { id, ...update } = input;

  return NoteType.findByIdAndUpdate(id, update, { new: true });
};

exports.resolvers = {
  Query: {
    allNoteTypes,
    NoteType: getNoteType
  },

  Mutation: {
    newNoteType,
    updateNoteType
  }
};
