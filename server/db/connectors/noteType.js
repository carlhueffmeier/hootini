const mongoose = require('mongoose');
const NoteType = mongoose.model('NoteType');
const { createFilter, checkAuth } = require('../authHelper');

const populateOptions = [{ path: 'fieldDefinitions' }, { path: 'templates' }];

function generateNoteTypeModel({ user }) {
  const find = (where = {}) => {
    checkAuth(user);
    return NoteType.find(createFilter(where, user)).populate(populateOptions);
  };

  const findOne = (where = {}) => {
    checkAuth(user);
    return NoteType.findOne(createFilter(where, user)).populate(
      populateOptions
    );
  };

  const findOneAndUpdate = (where = {}) => {
    checkAuth(user);
    // * If templates were removed -> remove all notes with that template (high priority)
    // * If templates were added -> add new cards with that template (ask the user for confirmation -> maybe separate action like `generateCards`)
    // * If fields were removed -> remove fields from cards (no negative repercussions, low priority)
    // * If fields were added -> don't care (if null assume empty)
    return NoteType.findOneAndUpdate(createFilter(where, user), update, {
      new: true
    }).populate(populateOptions);
  };

  const create = async input => {
    checkAuth(user);
    const newNote = await new Note({ ...input, ...addUserInfo(user) }).save();
    return newNote.populate(populateOptions);
  };

  return {
    find,
    findOne,
    findOneAndUpdate,
    create
  };
}

module.exports = generateNoteTypeModel;
