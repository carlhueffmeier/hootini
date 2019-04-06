const generateSlug = require('slugs');
const dynamodb = require('../_dynamodb');
const Model = require('./Model');
const { IsImmutableError } = require('../lib/errors');
const { createSortKeyPath, marshall } = require('../lib/utils');
const { prop, map, path,  } = require('../lib/functionalUtils');

class Deck extends Model {

  validate() {
    const requiredProperties = ['pk', 'deckName'];
    const validationErrors = {};
    for (let key of requiredProperties) {
      if (!this._getProperty(key)) {
        validationErrors[key] = 'is required';
      }
    }
    return Object.keys(validationErrors).length === 0
      ? null
      : validationErrors;
  }

  //=======================
  // Properties
  //=======================

  get id() {
    return this._getProperty('id');
  }
  set id(value) {
    throw new IsImmutableError('id');
  }

  get user() {
    return this._getProperty('pk');
  }
  set user(value) {
    if (!this.isNew()) {
      throw new IsImmutableError('pk');
    }
    this._setProperty('pk', value);
  }

  get slug() {
    return this._getProperty('slug');
  }
  set slug(value) {
    throw new IsImmutableError('slug');
  }

  get name() {
    return this._getProperty('deckName');
  }
  set name(value) {
    // Changing the deck name means
    // 1. Choosing a new slug
    // 2. Changing all card records sk
    if (!this.isNew()) {
      throw new Error('Changing the name of an existing deck is a WIP');
    }
    this._setProperty('deckName', value);
  }

  get description() {
    return this._getProperty('description');
  }
  set description(value) {
    this._setProperty('description', value);
  }

  get lastReview() {
    return this._getProperty('lastReview');
  }
  set lastReview(value) {
    this._setProperty('lastReview', value);
  }

  get lastActivity() {
    return this._getProperty('lastActivity');
  }
  set lastActivity(value) {
    this._setProperty('lastActivity', value);
  }

  get lastNoteType() {
    return this._getProperty('lastNoteType');
  }
  set lastNoteType(value) {
    this._setProperty('lastNoteType', value);
  }

  get cardsDue() {
    return this._getProperty('cardsDue');
  }
  set cardsDue(value) {
    this._setProperty('cardsDue', value);
  }

  get cardsTotal() {
    return this._getProperty('cardsTotal');
  }
  set cardsTotal(value) {
    this._setProperty('cardsTotal', value);
  }

  //=======================
  // Persistence Logic
  //=======================

  static _getSK(slug = '') {
    return createSortKeyPath(['deck', slug]);
  }

  async _preCreate() {
    const slug = await this._chooseSlug();
    this._setProperties({
      sk: this.constructor._getSK(slug),
      slug,
      cardsTotal: 0,
      cardsDue: 0
    });
  }

  async _chooseSlug() {
    let newSlug = generateSlug(this.name);
    const queryParams = {
      ExpressionAttributeValues: marshall({
        ':user': this._getProperty('pk'),
        ':deckSK': this.constructor._getSK(newSlug)
      }),
      KeyConditionExpression: 'pk = :user AND begins_with(sk, :deckSK)',
      ProjectionExpression: 'slug',
      ScanIndexForward: false
    };
    const existingSlugs = await dynamodb
      .query(queryParams)
      .promise()
      .then(prop('Items'))
      .then(map(path(['slug', 'S'])));
    if (existingSlugs.includes(newSlug)) {
      const highestSuffix = existingSlugs
        .map(item => Number(item.slice(newSlug.length + 1)))
        .filter(Boolean)
        .sort((a, b) => b - a)[0];
      newSlug = `${newSlug}-${(highestSuffix || 0) + 1}`;
    }
    return newSlug;
  }
}

module.exports = Deck;
