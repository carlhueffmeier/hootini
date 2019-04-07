const cardRepository = require('../gateways/cardRepository');
const deckRepository = require('../gateways/deckGateway');
const scheduler = require('../lib/scheduler');

class CardService {
  constructor(user) {
    this.user = user;
  }

  async reviewCard(vm) {
    const card = await cardRepository.findByUserAndId(this.user, vm.id);
    const update = scheduler.calculateNextDueDate(card, vm.answer);
    card.due = update.due.getTime();
    card.consecutiveCorrectAnswers = update.consecutiveCorrectAnswers;
    card.reviewCount += 1;
    await card.save();

    const deck = deckRepository.findOneByUserAndSlug(this.user, vm.deckSlug);
    deck.cardsDue -= 1;
    return deck.save();
  }
}

module.exports = CardService;
