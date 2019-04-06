const { gql } = require('apollo-server-lambda');

exports.typeDef = gql`
  extend type Query {
    deck(where: DeckWhereUniqueInput): Deck!
    allDecks(where: DeckWhereInput): [Deck]!
  }

  extend type Mutation {
    createDeck(data: DeckCreateInput!): Deck!
    updateDeck(where: DeckWhereUniqueInput!, data: DeckUpdateInput!): Deck!
  }

  type Deck {
    id: ID!
    name: String!
    slug: String!
    description: String
    createdAt: DateTime
    lastReview: DateTime
    lastActivity: DateTime
    lastNoteType: Int
    cardsDue: Int
    cardsTotal: Int
  }

  input DeckCreateInput {
    name: String!
    description: String
  }

  input DeckUpdateInput {
    name: String
    description: String
  }

  input DeckWhereUniqueInput {
    slug: String
  }

  input DeckWhereInput {
    name: String
  }
`;

const getDeck = (_, { where }, { services }) => {
  return services.deck.findOne(where);
};

const allDecks = async (_, { where }, { services }) => {
  return services.deck.find(where);
};

const createDeck = (_, { data: deckInfo }, { services }) => {
  return services.deck.createDeck(deckInfo);
};

const updateDeck = (_, { where, data }, { services }) => {
  return services.deck.updateDeck(where, data);
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
