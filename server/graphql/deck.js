const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
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

// Add all cards that belong to the deck inside an array
const addCardsStage = ({ as = 'cards' } = {}) => ({
  $lookup: {
    from: 'cards',
    localField: '_id',
    foreignField: 'deck',
    as
  }
});

const addDueCardsStage = ({ input = '$cards', output = 'cardsDue' } = {}) => ({
  // Add a field 'cardsDue' that holds an array of the due cards
  $addFields: {
    [output]: {
      $filter: {
        input,
        as: 'card',
        cond: {
          $or: [
            // 'Due cards' have either a due date in the past
            { $lte: ['$card.due', new Date()] },
            // Or they have no due date at all
            { $ne: [{ $type: '$card.due' }, 'date'] }
          ]
        }
      }
    }
  }
});

const replaceArrayWithOwnSizeStage = arrayKeys => ({
  $addFields: arrayKeys.reduce(
    (stage, key) => ({
      ...stage,
      [key]: { $size: `$${key}` }
    }),
    {}
  )
});

const getDeck = async (_, { where = {} }) => {
  const result = await Deck.aggregate([
    { $match: createFilter(where) },
    { $limit: 1 },
    addCardsStage({ as: 'cardsTotal' }),
    addDueCardsStage({ input: '$cardsTotal', output: 'cardsDue' }),
    replaceArrayWithOwnSizeStage(['cardsTotal', 'cardsDue']),
    // We also need to add the id field for GraphQL
    { $addFields: { id: '$_id' } }
  ]);
  return result.length > 0 ? result[0] : null;
};

const allDecks = async (_, { where = {} }) => {
  return Deck.aggregate([
    { $match: createFilter(where) },
    addCardsStage({ as: 'cardsTotal' }),
    addDueCardsStage({ input: '$cardsTotal', output: 'cardsDue' }),
    replaceArrayWithOwnSizeStage(['cardsTotal', 'cardsDue']),
    // We also need to add the id field for GraphQL
    { $addFields: { id: '$_id' } }
  ]);
};

// TODO: Support queries for cardsDue etc. on new and updated decks
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
