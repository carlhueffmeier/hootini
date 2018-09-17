const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  extend type Query {
    Template(id: ID!): Template!
    allTemplates: [Template]!
  }

  extend type Mutation {
    newTemplate(input: NewTemplate!): Template!
    updateTemplate(input: UpdatedTemplate!): Template!
  }

  type Template {
    id: ID!
    name: String!
    front: String
    back: String
  }

  input NewTemplate {
    name: String!
    front: String
    back: String
  }

  input UpdatedTemplate {
    id: ID!
    name: String
    front: String
    back: String
  }

  input UpsertedTemplate {
    id: ID
    name: String
    front: String
    back: String
  }
`;

const getTemplate = (_, { id }, { db }) => {
  return db.template.findOne({ id });
};

const allTemplates = (_, { where = {} }, { db }) => {
  return db.template.find(where);
};

const newTemplate = (_, { input }, { db }) => {
  return db.template.create(input);
};

const updateTemplate = (_, { input }, { db }) => {
  const { id, ...update } = input;
  return db.template.findOneAndUpdate({ id }, update);
};

exports.resolvers = {
  Query: {
    Template: getTemplate,
    allTemplates
  },

  Mutation: {
    newTemplate,
    updateTemplate
  }
};
