const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Note = mongoose.model('Note');

exports.typeDef = gql`
  extend type Query {
    Note(id: ID!): Note!
    allNotes: [Note]!
  }

  extend type Mutation {
    newNote(input: NewNote!): Note!
    updateNote(input: UpdatedNote!): Note!
  }

  type Note {
    id: ID!
    deck: Deck!
  }

  input UpdatedNote {
    id: ID!
    deck: ID
  }

  input NewNote {
    deck: ID!
  }
`;

const getNote = (_, { id }) => {
  return Note.findById(id);
};

const allNotes = () => {
  return Note.find();
};

const newNote = (_, { input }) => {
  return new Note(input).save();
};

const updateNote = (_, { input }) => {
  const { id, ...update } = input;

  return Note.findByIdAndUpdate(id, update, { new: true });
};

exports.resolvers = {
  Query: {
    Note: getNote,
    allNotes
  },

  Mutation: {
    newNote,
    updateNote
  }
};
