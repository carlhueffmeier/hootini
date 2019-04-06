const { gql } = require('apollo-server-lambda');
const merge = require('lodash.merge');

// Scalar types
const { typeDef: DateTime, resolvers: dateTimeResolvers } = require('./scalars/DateTime');
const { typeDef: JsonType, resolvers: jsonResolvers } = require('./scalars/Json');

// Entities
const { typeDef: Deck, resolvers: deckResolvers } = require('./entities/Deck');
const { typeDef: Note, resolvers: noteResolvers } = require('./entities/Note');
const { typeDef: NoteField } = require('./entities/NoteField');
const { typeDef: NoteType, resolvers: noteTypeResolvers } = require('./entities/NoteType');
const { typeDef: FieldDefinition } = require('./entities/FieldDefinition');
const { typeDef: Template } = require('./entities/Template');
const { typeDef: Card, resolvers: cardResolvers } = require('./entities/Card');
const { typeDef: User, resolvers: userResolvers } = require('./entities/User');

// These have to be present so we can expand them in each module
const _baseTypes = gql`
  type Query {
    debug: Json
  }
  type Mutation {
    _empty: String
  }
`;

const globalResolvers = {
  Query: {
    debug: (_, __, context) => context
  }
};

// The ApolloServer constructor conveniently takes an array of
// type definitions
const typeDefs = [
  _baseTypes,
  DateTime,
  JsonType,
  FieldDefinition,
  Deck,
  NoteField,
  Note,
  NoteType,
  Template,
  Card,
  User
];

const resolvers = merge(
  globalResolvers,
  dateTimeResolvers,
  jsonResolvers,
  deckResolvers,
  noteResolvers,
  noteTypeResolvers,
  cardResolvers,
  userResolvers,
);

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
