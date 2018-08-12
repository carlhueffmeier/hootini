const { gql } = require('apollo-server-express');
const merge = require('lodash.merge');

// The definitions and resolvers specific to one type live in
// their respective files
const { typeDef: Deck, resolvers: deckResolvers } = require('./deck');
const { typeDef: Note, resolvers: noteResolvers } = require('./note');
const {
  typeDef: NoteType,
  resolvers: noteTypeResolvers
} = require('./noteType');

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
  typeDefs: [Query, Mutation, Deck, Note, NoteType],
  resolvers: merge(resolvers, deckResolvers, noteResolvers, noteTypeResolvers)
};

module.exports = schema;
