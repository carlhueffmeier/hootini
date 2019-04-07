const { gql } = require('apollo-server-lambda');

exports.typeDef = gql`
  extend type Query {
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

  input CardWhereInput {
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

const allCards = (_, { where }, { services }) => {
  return services.card.find(where);
};

const reviewCard = async (_, { data }, { services }) => {
  return services.card.review(data);
};

exports.resolvers = {
  Query: {
    allCards
  },

  Mutation: {
    reviewCard
  }
};
