const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const noteSchema = new mongoose.Schema({
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  },
  noteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteType'
  },
  fields: [Object]
});

module.exports = mongoose.model('Note', noteSchema);
