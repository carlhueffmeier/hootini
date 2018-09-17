const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { DEFAULT_INTERVAL } = require('../../helper/scheduler');

// * Cards have to be removed when note is removed
// * Cards have to be removed when template is removed
// * Cards have to be removed when deck is removed

const cardSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  due: {
    type: Date
  },
  interval: {
    type: Date,
    default: new Date(DEFAULT_INTERVAL) // 10 min
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  ease: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Card', cardSchema);
