const { gql } = require('apollo-server-lambda');

exports.typeDef = gql`
  extend type Query {
    note(where: NoteWhereUniqueInput!): Note!
    allNotes: [Note]!
  }

  extend type Mutation {
    createNote(data: NoteCreateInput!): NoteCreateResult!
    updateNote(where: NoteWhereUniqueInput!, data: NoteUpdateInput!): Note!
  }

  type Note {
    id: ID!
    deck: Deck!
    noteType: NoteType
    fields: [NoteField]
  }

  type NoteCreateResult {
    note: Note!
    cardsAdded: Int!
  }

  input NoteWhereUniqueInput {
    id: ID!
  }

  input NoteUpdateInput {
    id: ID!
    deck: ID
    noteType: ID
    fields: [NoteFieldUpdateInput!]
  }

  input NoteCreateInput {
    deck: ID!
    noteType: ID!
    fields: [NoteFieldCreateInput!]!
  }
`;

const getNote = (_, { where }, { services }) => {
  return services.note.findOne(where);
};

const allNotes = (_, __, { services }) => {
  return services.note.find();
};

const createNote = (_, { data }, { services }) => {
  return services.note.create(data);
};

const updateNote = (_, { data }, { services }) => {
  const { id, ...update } = data;
  return services.note.findOneAndUpdate({ id }, update);
};

exports.resolvers = {
  Query: {
    note: getNote,
    allNotes
  },

  Mutation: {
    createNote,
    updateNote
  }
};
