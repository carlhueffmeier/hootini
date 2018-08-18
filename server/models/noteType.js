const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const arrayUniquePlugin = require('mongoose-unique-array');

const fieldDefinitionSchema = new mongoose.Schema({
  key: {
    type: String,
    trim: true,
    required: 'All fields need a unique key',
    unique: true
  },
  type: {
    type: String,
    default: 'Markdown',
    enum: ['Markdown'],
    required: 'All fields need an associated type'
  }
});

fieldDefinitionSchema.plugin(arrayUniquePlugin);

const noteTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  },
  fieldDefinitions: [fieldDefinitionSchema],
  templates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template'
    }
  ]
});

module.exports = mongoose.model('NoteType', noteTypeSchema);
