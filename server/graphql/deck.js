const { gql } = require('apollo-server-express');

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

const getDeck = (_, { where = {} }, { db }) => {
  return db.deck.findOne(where);
};

const allDecks = async (_, { where = {} }, { db }) => {
  return db.deck.find(where);
};

const newDeck = (_, { input }, { db }) => {
  return db.deck.create(input);
};

const updateDeck = (_, { input }, { db }) => {
  const { id, ...update } = input;
  return db.deck.findOneAndUpdate({ id }, update);
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
