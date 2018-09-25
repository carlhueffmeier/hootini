const { gql } = require('apollo-server-express');
const merge = require('lodash.merge');

// Import type definitions and resolvers for custom scalar types
const { typeDef: DateTime, resolvers: dateTimeResolvers } = require('./scalars/DateTime');

// Import type definitions and resolvers for all entities
const { typeDef: User, resolvers: userResolvers } = require('./entities/User');
const { typeDef: Deck, resolvers: deckResolvers } = require('./entities/Deck');
const { typeDef: Note, resolvers: noteResolvers } = require('./entities/Note');
const { typeDef: NoteField } = require('./entities/NoteField');
const { typeDef: NoteType, resolvers: noteTypeResolvers } = require('./entities/NoteType');
const { typeDef: FieldDefinition } = require('./entities/FieldDefinition');
const { typeDef: Template, resolvers: templateResolvers } = require('./entities/Template');
const { typeDef: Card, resolvers: cardResolvers } = require('./entities/Card');

// These are the queries and mutations not associated with a type
// Empty for now!
const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

// == Putting everything together ==
// The ApolloServer constructor conveniently takes an array of
// type definitions.
// For the resolvers, we have to combine them via object deep merge.
const schema = {
  typeDefs: [
    Query,
    Mutation,
    DateTime,
    User,
    FieldDefinition,
    Deck,
    NoteField,
    Note,
    NoteType,
    Template,
    Card
  ],
  resolvers: merge(
    resolvers,
    dateTimeResolvers,
    userResolvers,
    deckResolvers,
    noteResolvers,
    noteTypeResolvers,
    templateResolvers,
    cardResolvers
  )
};

module.exports = schema;
