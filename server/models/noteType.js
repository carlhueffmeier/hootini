const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const fieldDefinitionSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    trim: true,
    required: 'All fields need a unique key'
  },
  type: {
    type: String,
    required: 'All fields need an associated type'
  }
});

const noteTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  },
  fieldDefinitions: [fieldDefinitionSchema]
});

module.exports = mongoose.model('NoteType', noteTypeSchema);
