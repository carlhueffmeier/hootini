const mongoose = require('mongoose');
const slug = require('slugs');
mongoose.Promise = global.Promise;

// When deck is removed:
// * Remove all associated notes, cards

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
  lastActivity: {
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
  // Find other decks with the same slug and append an incremental number
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const decksWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (decksWithSlug.length) {
    this.slug = `${this.slug}-${decksWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Deck', deckSchema);
