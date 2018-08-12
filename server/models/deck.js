var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// It might be a good idea to make the name of the deck
// unique on a per-user basis
const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  }
});

module.exports = mongoose.model('Deck', deckSchema);
