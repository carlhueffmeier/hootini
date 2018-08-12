const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');

exports.typeDef = gql`
  extend type Query {
    getDecks: [Deck]
  }

  extend type Mutation {
    addDeck(name: String!): Deck
  }

  type Deck {
    name: String!
  }
`;

exports.resolvers = {
  Query: {
    getDecks: () => Deck.find()
  },
  Mutation: {
    addDeck: async (obj, args) => await new Deck({ name: args.name }).save()
  }
};
