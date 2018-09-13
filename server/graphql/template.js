const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Template = mongoose.model('Template');

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

const getTemplate = (_, { id }) => {
  return Template.findById(id);
};

const allTemplates = () => {
  return Template.find();
};

const newTemplate = (_, { input }) => {
  return new Template(input).save();
};

const updateTemplate = (_, { input }) => {
  const { id, ...update } = input;

  return Template.findByIdAndUpdate(id, update, { new: true });
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
