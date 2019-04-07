const generateSlug = require('slugs');
const DeckGateway = require('../gateways/deckGateway');
const { map, mapKeys, pluck } = require('../lib/functionalUtils');
const { snakeCaseToCamelCase } = require('../lib/utils');

const toVM = mapKeys(snakeCaseToCamelCase);

class DeckService {
  constructor(userId) {
    this.userId = userId;
    this.deckGateway = new DeckGateway(userId);
  }

  async createDeck(vm) {
    const newDeck = {};
    newDeck.name = vm.name;
    newDeck.description = vm.description;
    newDeck.slug = await this._chooseSlug(vm.name);
    return this.deckGateway.insert(newDeck).then(toVM);
  }

  async updateDeck(whereUnique, changes) {
    if (changes.name) {
      changes.slug = await this._chooseSlug(changes.name);
    }
    if (whereUnique.id) {
      return this.deckGateway
        .findByIdAndUpdate(whereUnique.id, changes)
        .then(toVM);
    } else if (whereUnique.slug) {
      return this.deckGateway
        .findBySlugAndUpdate(whereUnique.slug, changes)
        .then(toVM);
    }
  }

  findOne(whereUnique) {
    if (whereUnique.id) {
      return this.deckGateway.findOneById(whereUnique.id).then(toVM);
    } else if (whereUnique.slug) {
      return this.deckGateway.findOneBySlug(whereUnique.slug).then(toVM);
    }
  }

  async find(where) {
    if (!where) {
      return this.deckGateway.findAll().then(map(toVM));
    } else if (where.name) {
      return this.deckGateway.findByName(where.name).then(map(toVM));
    }
  }

  async _chooseSlug(name) {
    const baseSlug = generateSlug(name);
    const similarSlugs = await this.deckGateway
      .findSimilarSlugs(baseSlug)
      .then(pluck('slug'));
    let slug = baseSlug;
    let suffix = 1;
    while (similarSlugs.includes(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
    return slug;
  }
}

module.exports = DeckService;
