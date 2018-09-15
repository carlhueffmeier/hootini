const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');
const { createFilter } = require('../helper/utils');

exports.typeDef = gql`
  extend type Query {
    Deck(where: SearchDeck): Deck!
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
    createdAt: Int
    lastReview: Int
    cardsDue: Int
    cardsTotal: Int
  }

  input UpdatedDeck {
    id: ID!
    name: String
    description: String
    lastReview: Int
    lastNoteType: UpdatedNoteType
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

const getDeck = async (_, { where = {} }) => {
  const deck = await Deck.findOne(createFilter(where));
  console.log(deck, createFilter(where));
  // * Skip queries when possible
  const cardsTotal = await Card.find({ deck }).estimatedDocumentCount();
  const cardsDue = await Card.find({
    deck,
    due: { $lte: Date.now() }
  }).estimatedDocumentCount();
  return {
    ...deck.toObject(),
    id: deck._id,
    cardsTotal,
    cardsDue
  };
};

const allDecks = async (_, { where = {} }) => {
  const decks = await Deck.find(createFilter(where));
  let cardsTotal = await Card.aggregate([
    {
      $group: {
        _id: '$deck',
        count: { $sum: 1 }
      }
    }
  ]);
  cardsTotal = cardsTotal.reduce(
    (totalByDeck, row) => ({ ...totalByDeck, [row._id]: row.count }),
    {}
  );
  let cardsDue = await Card.aggregate([
    {
      $match: {
        $or: [{ due: { $lte: new Date() } }, { due: { $exists: false } }]
      }
    },
    {
      $group: {
        _id: '$deck',
        count: { $sum: 1 }
      }
    }
  ]);
  cardsDue = cardsDue.reduce(
    (dueByDeck, row) => ({ ...dueByDeck, [row._id]: row.count }),
    {}
  );

  const decksWithMetainfo = decks.map(deck => ({
    ...deck.toObject(),
    id: deck._id,
    cardsTotal: cardsTotal[deck._id] || 0,
    cardsDue: cardsDue[deck._id] || 0
  }));

  return decksWithMetainfo;
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
