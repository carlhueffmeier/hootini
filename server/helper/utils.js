// const { map, when, is, construct, __ } = require('ramda');
// exports.createFilter = map(when(is(String), construct(RegExp)(__, 'i')));
// I was told the above version wasn't readable... 🤔

exports.createFilter = where =>
  Object.entries(where).reduce(
    (filter, [key, val]) => ({
      ...filter,
      [key]: typeof val === 'string' ? new RegExp(val, 'i') : val
    }),
    {}
  );

exports.pluck = (key, array) => array.map(item => item[key]);
