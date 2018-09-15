const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');

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

const getNote = (_, { id }) => {
  return Note.findById(id);
};

const allNotes = () => {
  return Note.find();
};

const createNote = async (_, { input }) => {
  await Deck.findByIdAndUpdate(input.deck, {
    lastActivity: Date.now(),
    lastNoteType: input.noteType
  });
  // * First get note type and check whether the 'fields' are matching
  let newNote = await Note.findByIdAndUpdate(mongoose.Types.ObjectId(), input, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    populate: [{ path: 'noteType' }, { path: 'deck' }]
  });

  const {
    noteType: { templates }
  } = newNote;
  const newCards = templates.map(template => ({
    deck: newNote.deck,
    note: newNote,
    template: template
  }));
  const insertedCards = await Card.insertMany(newCards);
  console.log(`${insertedCards.length} cards inserted 🕊`, insertedCards);
  return {
    note: {
      ...newNote.toObject(),
      id: newNote._id
    },
    cardsAdded: insertedCards.length
  };
};

const updateNote = (_, { input }) => {
  const { id, ...update } = input;

  // * If deck changed, find all cards and update them as well
  return Note.findByIdAndUpdate(id, update, { new: true });
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
