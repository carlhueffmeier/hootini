const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  extend type Query {
    card(where: CardWhereUniqueInput!): Card!
    allCards(where: CardWhereInput): [Card!]!
  }

  extend type Mutation {
    reviewCard(data: CardReviewInput!): Card!
  }

  type Card {
    id: ID!
    deck: Deck!
    note: Note!
    fields: [NoteField!]
    template: Template!
    due: DateTime
    numberOfReviews: Int
    ease: Float
  }

  input CardWhereUniqueInput {
    id: ID!
  }

  input CardWhereInput {
    deckId: ID
    deckSlug: String
    dueTime_lt: DateTime
    dueTime_gt: DateTime
    dueTime_in: [DateTime!]
  }

  input CardReviewInput {
    id: ID!
    timeOfReview: DateTime
    answer: ReviewAnswer
  }

  enum ReviewAnswer {
    REPEAT
    HARD
    OK
    EASY
  }
`;

const getCard = (_, { where }, { db }) => {
  return db.card.findOne(where);
};

const allCards = (_, { where }, { db }) => {
  return db.card.find(where);
};

const reviewCard = async (_, { data }, { db }) => {
  return db.card.review(data);
};

exports.resolvers = {
  Query: {
    card: getCard,
    allCards
  },

  Mutation: {
    reviewCard
  }
};
