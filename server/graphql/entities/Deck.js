const { gql } = require('apollo-server-express');
const { createSearchFilter } = require('../../helper/utils');

exports.typeDef = gql`
  extend type Query {
    deck(where: DeckWhereUniqueInput): Deck!
    allDecks(where: DeckWhereInput): [Deck]!
  }

  extend type Mutation {
    createDeck(data: DeckCreateInput!): Deck!
    updateDeck(data: DeckUpdateInput!): Deck!
  }

  type Deck {
    id: ID!
    name: String!
    slug: String!
    description: String
    createdAt: DateTime
    lastReview: DateTime
    lastActivity: DateTime
    lastNoteType: NoteType
    cardsDue: Int
    cardsTotal: Int
  }

  input DeckUpdateInput {
    id: ID!
    name: String
    description: String
  }

  input DeckCreateInput {
    name: String!
    description: String
  }

  input DeckWhereUniqueInput {
    id: ID
    slug: String
  }

  input DeckWhereInput {
    name: String
  }
`;

const getDeck = (_, { where = {} }, { db }) => {
  return db.deck.findOne(where);
};

const allDecks = async (_, { where = {} }, { db }) => {
  const filter = createSearchFilter(['name'], where);
  return db.deck.find(filter);
};

const createDeck = (_, { data }, { db }) => {
  return db.deck.create(data);
};

const updateDeck = (_, { data }, { db }) => {
  const { id, ...update } = data;
  return db.deck.findOneAndUpdate({ id }, update);
};

exports.resolvers = {
  Query: {
    deck: getDeck,
    allDecks
  },

  Mutation: {
    createDeck,
    updateDeck
  }
};
