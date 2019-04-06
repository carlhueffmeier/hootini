const generateSlug = require('slugs');
const dynamodb = require('../_dynamodb');
const Model = require('./Model');
const { IsImmutableError } = require('../lib/errors');
const { marshall, createSortKeyPath } = require('../lib/utils');
const { prop, map, path } = require('../lib/functionalUtils');

class NoteType extends Model {

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
  
  get name() {
    return this._getProperty('noteTypeName');
  }
  set name(value) {
    this._setProperty('noteTypeName', value);
  }

  get fields() {
    return this._getProperty('fieldMeta');
  }
  set fields(value) {
    this._setProperty('fieldMeta', value);
  }

  get templates() {
    return this._getProperty('templates');
  }
  set templates(value) {
    this._setProperty('templates', value);
  }

  //=======================
  // Persistence Logic
  //=======================

  static _getSK(slug = '') {
    return createSortKeyPath(['noteType', slug]);
  }

  async _preCreate() {
    const slug = await this._chooseSlug();
    this._setProperties({
      sk: this.constructor._getSK(slug),
      slug
    });
  }

  async _chooseSlug() {
    let newSlug = generateSlug(this.name);
    const queryParams = {
      ExpressionAttributeValues: marshall({
        ':user': this._getProperty('pk'),
        ':noteTypeSK': this.constructor._getSK(newSlug)
      }),
      KeyConditionExpression: 'pk = :user AND begins_with(sk, :noteTypeSK)',
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

module.exports = NoteType;
