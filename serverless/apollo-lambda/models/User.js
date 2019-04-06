const bcrypt = require('bcryptjs');
const Model = require('./Model');
const { IsImmutableError } = require('../lib/errors');

class User extends Model {

  validate() {
    const requiredProperties = ['pk', 'name', 'password'];
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

  async isValidPassword(password) {
    return bcrypt.compare(password, await this._getProperty('password'));
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

  get email() {
    return this._getProperty('pk');
  }
  set email(value) {
    // This will be an expensive operation
    if (!this.isNew()) {
      throw new Error('Changing the email of an existing user is a WIP');
    }
    this._setProperty('pk', value.trim());
  }

  // Async property
  get password() {
    return Promise.resolve(this._getProperty('password'));
  }
  set password(value) {
    this._setProperty('password', bcrypt.hash(value, 10));
  }
  
  get name() {
    return this._getProperty('displayName');
  }
  set name(value) {
    this._setProperty('displayName', value);
  }

  //=======================
  // Persistence Logic
  //=======================

  static _getSK() {
    return 'user';
  }

  _preCreate() {
    this._setProperties({
      sk: this.constructor._getSK()
    });
  }
}

module.exports = User;
