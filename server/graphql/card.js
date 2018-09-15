const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Card = mongoose.model('Card');

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

const getCard = (_, { id }) => {
  return Card.findById(id);
};

const allCards = () => {
  return Card.find();
};

const reviewCard = async (_, { input }) => {
  const { id, answer, timeOfReview } = input;

  const reviewedCard = await Card.findById(id);
  const update = rescheduleCard({
    interval: reviewedCard.interval,
    dueTime: reviewedCard.due,
    ease: reviewedCard.ease,
    timeOfReview,
    answer
  });
  return Card.findByIdAndUpdate(id, update, { new: true });
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
