const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  extend type Query {
    Note(id: ID!): Note!
    allNotes: [Note]!
  }

  extend type Mutation {
    createNote(input: NewNote!): CreateNoteResult!
    updateNote(input: UpdatedNote!): Note!
  }

  type Note {
    id: ID!
    deck: Deck!
    noteType: NoteType
    fields: [NoteField]
  }

  type CreateNoteResult {
    note: Note!
    cardsAdded: Int!
  }

  input UpdatedNote {
    id: ID!
    deck: ID
    noteType: ID
    fields: [UpdatedNoteField!]
  }

  input NewNote {
    deck: ID!
    noteType: ID!
    fields: [NewNoteField!]!
  }

  type NoteField {
    key: String!
    value: String
  }

  input NewNoteField {
    key: String!
    value: String
  }

  input UpdatedNoteField {
    key: String!
    value: String
  }
`;

const getNote = (_, { id }, { db }) => {
  return db.note.findOne({ id });
};

const allNotes = (_, __, { db }) => {
  return db.note.find();
};

const createNote = (_, { input }, { db }) => {
  return db.note.create(input);
};

const updateNote = (_, { input }, { db }) => {
  const { id, ...update } = input;
  return db.note.findOneAndUpdate({ id }, update);
};

exports.resolvers = {
  Query: {
    Note: getNote,
    allNotes
  },

  Mutation: {
    createNote,
    updateNote
  }
};
