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
    lastNoteType: Int
    cardsDue: Int
    cardsTotal: Int
    lastReview: DateTime
    lastActivity: DateTime
    createdAt: DateTime
    updatedAt: DateTime
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
    id: ID
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
  return services.deck.findOneAndUpdate(where, data);
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
