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
const { typeDef: Template, resolvers: templateResolvers } = require('./entities/Template');
const { typeDef: Card, resolvers: cardResolvers } = require('./entities/Card');

// These have to be present so we can expand them in each module
const _baseTypes = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

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
  Card
];

const resolvers = merge(
  dateTimeResolvers,
  jsonResolvers,
  deckResolvers,
  noteResolvers,
  noteTypeResolvers,
  templateResolvers,
  cardResolvers
);

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
