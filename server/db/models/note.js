const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// * Remove when note type is removed
// * Change key when note type key is changed

const noteFieldSchema = new mongoose.Schema({
  definition: mongoose.Schema.Types.ObjectId,
  key: String,
  value: {
    type: String
  }
});

const noteSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  },
  noteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteType'
  },
  fields: [noteFieldSchema]
});

module.exports = mongoose.model('Note', noteSchema);
