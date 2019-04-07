// Functions
const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));

const identity = value => value;

const pipe = (firstFn = identity, ...fns) => (...args) =>
  fns.reduce((result, fn) => fn(result), firstFn(...args));

const apply = curry((arg, fn) => fn(arg));

const invoke = curry((fnName, obj) => obj[fnName].call(obj));

// eslint-disable-next-line no-console
const log = marker => input => console.log(`|| LOG || ${marker} | ${input}`) || input;

// Language
const isNil = value => value == null;

// Collections
const map = curry((mapFn, collection) =>
  Array.isArray(collection)
    ? collection.map(mapFn)
    : Object.entries(collection).reduce((result, [key, value]) => {
        result[key] = mapFn(value, key, collection);
        return result;
      }, {})
);

const resolveAll = async collection =>
  Array.isArray(collection)
    ? Promise.all(collection)
    : fromPairs(
        await Promise.all(
          Object.entries(collection).map(async ([key, value]) => [
            key,
            await value
          ])
        )
      );

// Objects
const prop = curry((key, obj) => obj[key]);

const path = curry((keys, obj) => {
  if (obj) {
    return keys.reduce((result, key) => (result || {})[key], obj);
  }
});

const pick = curry((keys, obj) =>
  keys.reduce((result, key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {})
);

const fromPairs = pairs =>
  pairs.reduce((result, [key, value]) => {
    result[key] = value;
    return result;
  }, {});

const groupBy = curry((key, objects) => 
  objects.reduce((result, obj) => {
    result[key] = obj;
    return result;
  }, {})
);

const pluck = curry((key, objects) => objects.map(prop(key)));

const mapKeys = curry((mapFn, obj) =>
  Object.entries(obj).reduce((result, [key, value]) => {
    result[mapFn(key, value)] = value;
    return result;
  }, {})
);

const reverseKeyValue = obj =>
  Object.entries(obj).reduce((result, [key, value]) => {
    result[value] = key;
    return result;
  }, {});

// Predicate
const unless = curry((predicate, ifFalseFn) => arg =>
  predicate(arg) ? arg : ifFalseFn(arg)
);

// String
const prepend = curry((prefix, string) => String(prefix) + string);

// Functions
exports.curry = curry;
exports.identity = identity;
exports.pipe = pipe;
exports.apply = apply;
exports.invoke = invoke;
exports.log = log;
// Language
exports.isNil = isNil;
// Collections
exports.map = map;
exports.resolveAll = resolveAll;
// Objects
exports.prop = prop;
exports.path = path;
exports.pick = pick;
exports.fromPairs = fromPairs;
exports.groupBy = groupBy;
exports.pluck = pluck;
exports.mapKeys = mapKeys;
exports.reverseKeyValue = reverseKeyValue;
// Predicate
exports.unless = unless;
// String
exports.prepend = prepend;
