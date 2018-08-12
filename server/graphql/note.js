const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const Note = mongoose.model('Note');

exports.typeDef = gql`
  extend type Query {
    getNotes: [Note]
  }

  extend type Mutation {
    addNote(deck: String!): Note
  }

  type Note {
    deck: Deck
  }
`;

exports.resolvers = {
  Query: {
    getNotes: () => Note.find().populate('deck')
  },
  Mutation: {
    addNote: async (obj, args) => {
      const deck = await Deck.findOne({ name: args.deck });
      return await new Note({ deck }).save();
    }
  }
};
