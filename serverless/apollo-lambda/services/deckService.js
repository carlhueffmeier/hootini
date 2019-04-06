const deckRepository = require('../repositories/deckRepository');
const Deck = require('../models/Deck');

class DeckService {
  
  constructor(user) {
    this.user = user;
  }

  createDeck(vm) {
    const newDeck = new Deck();
    newDeck.user = this.user;
    newDeck.name = vm.name;
    newDeck.description = vm.description;
    return newDeck.save();
  }

  updateDeck(whereUnique, changes) {
    const deck = this.findOne(whereUnique);
    Object.entries(changes).forEach(([key, value]) => {
      deck[key] = value;
    });
    return deck.save();
  }

  findOne(whereUnique) {
    if (whereUnique.slug) {
      return deckRepository.findOneByUserAndSlug(this.user, whereUnique.slug);
    }
  }

  async find(where) {
    if (where && where.name) {
      return deckRepository.findByUserAndName(this.user, where.name);
    }
    return deckRepository.findByUser(this.user);
  }
}

module.exports = DeckService;
