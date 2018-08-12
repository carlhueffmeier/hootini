const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const fieldSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    trim: true,
    required: 'All fields need a unique key'
  },
  value: {
    type: String,
    trim: true
  }
});

const noteSchema = new mongoose.Schema({
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  },
  noteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteType'
  },
  fields: [fieldSchema]
});

module.exports = mongoose.model('Note', noteSchema);
