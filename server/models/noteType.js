const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const noteTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  },
  fieldDefinitions: [Object]
});

module.exports = mongoose.model('NoteType', noteTypeSchema);
