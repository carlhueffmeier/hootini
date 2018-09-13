const mongoose = require('mongoose');
const slug = require('slugs');
mongoose.Promise = global.Promise;

// It might be a good idea to make the name of the deck
// unique on a per-user basis
// Look into: Validation and Multi-field unique values
const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastReview: {
    type: Date
  },
  lastNoteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteType'
  },
  description: {
    type: String,
    trim: true
  }
});

deckSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const decksWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (decksWithSlug.length) {
    this.slug = `${this.slug}-${decksWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Deck', deckSchema);
