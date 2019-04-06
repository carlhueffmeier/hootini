const Model = require('./Model');
const { IsImmutableError } = require('../lib/errors');
const { createSortKeyPath } = require('../lib/utils');
const { prop } = require('../lib/functionalUtils');

class Card extends Model {

  validate() {
    const requiredProperties = ['pk', 'name', 'fields', 'templates'];
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
    return this._getProperty('sk');
  }
  set id(value) {
    throw new IsImmutableError('sk');
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
  
  get noteId() {
    return this._getProperty('noteId');
  }
  set noteId(value) {
    if (!this.isNew()) {
      throw new IsImmutableError('noteId');
    }
    this._setProperty('noteId', value);
  }
  
  get cardId() {
    return this._getProperty('cardId');
  }
  set cardId(value) {
    if (!this.isNew()) {
      throw new IsImmutableError('cardId');
    }
    this._setProperty('cardId', value);
  }

  get deckSlug() {
    return this._getProperty('deckSlug');
  }
  set deckSlug(value) {
    if (!this.isNew()) {
      throw new IsImmutableError('deckSlug');
    }
    this._setProperty('deckSlug', value);
  }

  get noteTypeSlug() {
    return this._getProperty('noteTypeSlug');
  }
  set noteTypeSlug(value) {
    if (!this.isNew()) {
      throw new IsImmutableError('noteTypeSlug');
    }
    this._setProperty('noteTypeSlug', value);
  }

  get fieldMeta() {
    return this._getProperty('fieldMeta');
  }
  set fieldMeta(value) {
    this._setProperty('fieldMeta', value);
  }

  get fieldValues() {
    return this._getProperty('fieldValues');
  }
  set fieldValues(value) {
    this._setProperty('fieldValues', value);
  }

  get template() {
    return this._getProperty('template');
  }
  set template(value) {
    this._setProperty('template', value);
  }

  get due() {
    return this._getProperty('due');
  }
  set due(value) {
    this._setProperty('due', value);
  }

  get consecutiveCorrectAnswers() {
    return this._getProperty('consecutiveCorrectAnswers');
  }
  set consecutiveCorrectAnswers(value) {
    this._setProperty('consecutiveCorrectAnswers', value);
  }

  get numberOfReviews() {
    return this._getProperty('numberOfReviews');
  }
  set numberOfReviews(value) {
    this._setProperty('numberOfReviews', value);
  }

  get ease() {
    return this._getProperty('ease');
  }
  set ease(value) {
    this._setProperty('ease', value);
  }

  //=======================
  // Persistence Logic
  //=======================

  static _getSK(deckSlug = '', noteId = '', cardId = '') {
    return createSortKeyPath(['card', deckSlug, noteId, cardId]);
  }

  static _getSK2(noteTypeSlug, templateId = '') {
    return createSortKeyPath([noteTypeSlug, templateId]);
  }

  async _preCreate() {
    this._setProperties({
      sk: this.constructor._getSK(
        this._getProperty('deckSlug'),
        this._getProperty('noteId'),
        this._getProperty('id')
      ),
      sk2: this.constructor._getSK2(
        this._getProperty('noteTypeSlug'),
        prop('id', this._getProperty('template'))
      )
    });
  }
}

module.exports = Card;
