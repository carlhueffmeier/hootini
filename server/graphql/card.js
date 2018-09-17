const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  extend type Query {
    Card(id: ID!): Card!
    allCards: [Card]!
  }

  extend type Mutation {
    reviewCard(input: ReviewedCard!): Card!
  }

  type Card {
    id: ID!
    deck: Deck!
    note: Note!
    template: Template!
    due: Int
    numberOfReviews: Int
    ease: Float
  }

  input ReviewedCard {
    id: ID!
    timeOfReview: Int
    anwswer: Int
  }
`;

const getCard = (_, { id }, { db }) => {
  return db.card.findOne({ id });
};

const allCards = (_, __, { db }) => {
  return db.card.find();
};

const reviewCard = async (_, { input }, { db }) => {
  return db.card.review(input);
};

exports.resolvers = {
  Query: {
    Card: getCard,
    allCards
  },

  Mutation: {
    reviewCard
  }
};
