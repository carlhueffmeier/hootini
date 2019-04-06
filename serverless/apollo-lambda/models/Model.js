const uuidv4 = require('uuid/v4');
const { ValidationError, IsImmutableError } = require('../lib/errors');
const { resolveAll } = require('../lib/functionalUtils');
const { putItemNotExists, updateItem } = require('../lib/dbStrategies');

class Model {

  static fromDocument(document) {
    const entity = new this();
    entity._setPersistedData(document);
    return entity;
  }

  constructor() {
    this._data = {};
    this._unpersistedChanges = {};
  }

  get createdAt() {
    return this._getProperty('createdAt');
  }
  set createdAt(value) {
    throw new IsImmutableError('createdAt');
  }

  get updatedAt() {
    return this._getProperty('updatedAt');
  }
  set updatedAt(value) {
    throw new IsImmutableError('updatedAt');
  }

  isNew() {
    return Object.keys(this._data).length === 0;
  }

  isDirty() {
    return Object.keys(this._unpersistedChanges).length === 0;
  }

  async save() {
    if (this.isNew()) {
      await this._create(putItemNotExists);
    } else if (this.isDirty()) {
      await this._update(updateItem);
    }
    return this;
  }

  async _create(persistenceStrategy) {
    this._throwIfValidationFails();
    await this._setInitialValues();
    const document = await this._getDocument();
    await persistenceStrategy(document);
    this._setPersistedData(document);
    this._discardDirtyProperties();
  }

  async _update(updateStrategy) {
    const oldValues = this._getPersistedProperties();
    const changes = await this._getDirtyProperties();
    await updateStrategy(oldValues, changes);
    this._setPersistedData(await this._getDocument());
    this._discardDirtyProperties();
  }

  async _setInitialValues() {
    const now = Date.now();
    this._setProperties({
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    });
    if (this._preCreate) {
      return Promise.resolve(this._preCreate());
    }
  }

  _throwIfValidationFails() {
    const validationErrors = this.validate();
    if (validationErrors) {
      const [key, message] = Object.entries(validationErrors)[0];
      throw new ValidationError(key, message);
    }
  }

  async _getDocument() {
    return {
      ...this._data,
      ...await this._getDirtyProperties()
    };
  }

  _getDirtyProperties() {
    return resolveAll(this._unpersistedChanges);
  }

  _setProperties(object) {
    Object.entries(object).forEach(([key, value]) => {
      this._unpersistedChanges[key] = value;
    });
  }

  _discardDirtyProperties() {
    this._unpersistedChanges = {};
  }

  _getPersistedProperties() {
    return this._data;
  }

  _setPersistedData(data) {
    this._data = data;
  }

  _getProperty(key) {
    return this._unpersistedChanges.hasOwnProperty(key)
      ? this._unpersistedChanges[key]
      : this._data[key];
  }

  _setProperty(key, value) {
    this._unpersistedChanges[key] = value;
  }
}

module.exports = Model;
