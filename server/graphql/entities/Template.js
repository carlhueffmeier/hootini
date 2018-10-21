const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  extend type Query {
    template(where: TemplateWhereUniqueInput!): Template!
    allTemplates: [Template]!
  }

  extend type Mutation {
    createTemplate(data: TemplateCreateInput!): Template!
    updateTemplate(data: TemplateUpdateInput!): Template!
  }

  type Template {
    id: ID!
    name: String!
    front: String
    back: String
  }

  input TemplateWhereUniqueInput {
    id: ID!
  }

  input TemplateCreateInput {
    name: String!
    front: String
    back: String
  }

  input TemplateUpdateInput {
    id: ID!
    name: String
    front: String
    back: String
  }

  input TemplateUpsertInput {
    id: ID
    name: String
    front: String
    back: String
  }
`;

const getTemplate = (_, { where }, { db }) => {
  return db.template.findOne(where);
};

const allTemplates = (_, { where = {} }, { db }) => {
  return db.template.find(where);
};

const createTemplate = (_, { data }, { db }) => {
  return db.template.create(data);
};

const updateTemplate = (_, { data }, { db }) => {
  const { id, ...update } = data;
  return db.template.findOneAndUpdate({ id }, update);
};

exports.resolvers = {
  Query: {
    template: getTemplate,
    allTemplates
  },

  Mutation: {
    createTemplate,
    updateTemplate
  }
};
