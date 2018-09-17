const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// When key changes:
// Change all associated notes' fields

const fieldDefinitionSchema = new mongoose.Schema({
  key: {
    type: String,
    trim: true,
    required: 'All fields need a key'
  },
  type: {
    type: String,
    default: 'Markdown',
    enum: ['Markdown'],
    required: 'All fields need an associated type'
  }
});

const noteTypeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  },
  slug: String,
  fieldDefinitions: [fieldDefinitionSchema],
  templates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template'
    }
  ]
});

// Note: We can not use arrow functions here, because they don't have their own context 🧐
noteTypeSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // Find other note types with the same slug and append an incremental number
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const noteTypesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (noteTypesWithSlug.length) {
    this.slug = `${this.slug}-${noteTypesWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('NoteType', noteTypeSchema);
