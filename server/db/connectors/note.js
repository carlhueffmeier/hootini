const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const NoteType = mongoose.model('NoteType');
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');
const { checkAuth, createFilter, addUserInfo } = require('../authHelper');

function generateNoteModel({ user } = {}) {
  const find = (where = {}) => {
    checkAuth(user);
    return Note.find(createFilter(where, user));
  };

  const findOne = (where = {}) => {
    checkAuth(user);
    return Note.findOne(createFilter(where, user));
  };

  const findOneAndUpdate = (where = {}, update = {}) => {
    checkAuth(user);
    // * If deck changed, find all cards and update them as well
    return Note.findOneAndUpdate(createFilter(where, user), update, {
      new: true
    });
  };

  const create = async input => {
    checkAuth(user);
    const noteType = await NoteType.findOne(createFilter({ id: input.noteType }, user));
    if (!noteType) {
      throw new Error('Note type not found.');
    }
    const deck = await Deck.findOneAndUpdate(
      createFilter({ id: input.deck }, user),
      {
        lastActivity: Date.now(),
        lastNoteType: noteType
      },
      { new: true }
    );
    if (!deck) {
      throw new Error('Deck not found.');
    }
    // ⚠️ Check whether fields are matching the schema in noteType
    const newNote = await new Note({
      ...input,
      deck,
      noteType,
      ...addUserInfo(user)
    }).save();
    // Now we create a card for every template
    const { templates } = noteType;
    const newCards = templates.map(template => ({
      deck,
      note: newNote,
      template,
      ...addUserInfo(user)
    }));
    const insertedCards = await Card.insertMany(newCards);
    return {
      note: {
        ...newNote.toObject(),
        deck,
        noteType
      },
      cardsAdded: insertedCards.length
    };
  };

  return {
    find,
    findOne,
    findOneAndUpdate,
    create
  };
}

module.exports = generateNoteModel;
