const mongoose = require('mongoose');
const slugs = require('slugs');
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
  description: {
    type: String,
    trim: true
  }
});

// deckSchema.pre('save', async function(next) {
//   if (!this.isModified('name')) {
//     next();
//     return;
//   }
//   let slug = slugs(this.name);
//   const existingSlugs = (await Deck.find({ slug: /^slug/ })).map(r => r.slug);
//   for (let i = 1; existingSlugs.includes(slug); i += 1) {
//     slug = `slug-${i}`;
//   }
//   this.slug = slug;
//   next();
// });

module.exports = mongoose.model('Deck', deckSchema);
