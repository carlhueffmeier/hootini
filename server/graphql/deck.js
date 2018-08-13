const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const { createFilter } = require('../helper/utils');

exports.typeDef = gql`
  extend type Query {
    Deck(id: ID!): Deck!
    allDecks(where: SearchDeck): [Deck]!
  }

  extend type Mutation {
    newDeck(input: NewDeck!): Deck!
    updateDeck(input: UpdatedDeck!): Deck!
  }

  type Deck {
    id: ID!
    name: String!
    slug: String!
    description: String
  }

  input UpdatedDeck {
    id: ID!
    name: String
    description: String
  }

  input NewDeck {
    name: String!
    description: String
  }

  input SearchDeck {
    id: ID
    name: String
    slug: String
    description: String
  }
`;

const getDeck = (_, { id }) => {
  return Deck.findById(id);
};

const allDecks = (_, { where = {} }) => {
  return Deck.find(createFilter(where));
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
