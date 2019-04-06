const noteTypeRepository = require('../repositories/noteTypeRepository');
const cardRepository = require('../repositories/cardRepository');
const deckRepository = require('../repositories/deckRepository');
const Card = require('../models/Card');
const uuidv4 = require('uuid/v4');

class NoteService {
  
  constructor(user) {
    this.user = user;
  }

  async createNote(vm) {
    const noteType = await noteTypeRepository.findBySlug(
      vm.noteTypeSlug
    );
    const noteId = uuidv4();
    const cards = noteType.templates.map(template => {
      const card = new Card();
      card.user = this.user;
      card.deckSlug = vm.deckSlug;
      card.noteId = noteId;
      card.template = template;
      card.noteTypeSlug = noteType.slug;
      card.fieldMeta = vm.fieldMeta;
      card.fieldValues = vm.fields;
      return card;
    });
    const savedCards = await cardRepository.saveAll(cards);
    const numCards = savedCards.length;
    const deck = deckRepository.findOneByUserAndSlug(this.user, vm.deckSlug);
    deck.cardsTotal += numCards;
    deck.cardsDue += numCards;
    return deck.save();
  }
}

module.exports = NoteService;
