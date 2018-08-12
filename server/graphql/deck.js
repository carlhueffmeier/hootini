const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');

exports.typeDef = gql`
  extend type Query {
    Deck(id: ID!): Deck!
    allDecks: [Deck]!
  }

  extend type Mutation {
    newDeck(input: NewDeck!): Deck!
    updateDeck(input: UpdatedDeck!): Deck!
  }

  type Deck {
    id: ID!
    name: String!
  }

  input UpdatedDeck {
    id: ID!
    name: String
  }

  input NewDeck {
    name: String!
  }
`;

const getDeck = (_, { id }) => {
  return Deck.findById(id);
};

const allDecks = () => {
  return Deck.find();
};

const newDeck = (_, { input }) => {
  return new Deck(input).save();
};

const updateDeck = (_, { input }) => {
  const { id, ...update } = input;

  return Deck.findById(id, update, { new: true });
};

exports.resolvers = {
  Query: {
    Deck: getDeck,
    allDecks
  },

  Mutation: {
    newDeck,
    updateDeck
  }
};
