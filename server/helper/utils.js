// const { map, when, is, construct, __ } = require('ramda');
// exports.createFilter = map(when(is(String), construct(RegExp)(__, 'i')));
// I was told the above version wasn't readable... 🤔

const excludedKeys = ['id', '_id'];
const translateKeys = key =>
  ({
    id: '_id'
  }[key] || key);

exports.createFilter = where =>
  Object.entries(where).reduce(
    (filter, [key, val]) => ({
      ...filter,
      [translateKeys(key)]:
        !excludedKeys.includes(key) && typeof val === 'string'
          ? new RegExp(val, 'i')
          : val
    }),
    {}
  );

exports.pluck = (key, array) => array.map(item => item[key]);
