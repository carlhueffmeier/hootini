const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const marshall = AWS.DynamoDB.Converter.marshall;
const unmarshall = AWS.DynamoDB.Converter.unmarshall;
const { identity, pipe, path, unless, prop, map, isNil } = require('./functionalUtils');

// ~~ Auth ~~
function generateUserToken(user) {
  return jwt.sign({ user: user.email }, process.env.APP_SECRET);
}

function getUserFromRequest(req) {
  const token = req.headers['Authorization'];
  if (token) {
    const { user } = jwt.verify(token, process.env.APP_SECRET);
    return user;
  }
}

// ~~ Domain ~~
function createSortKeyPath(keys) {
  return keys.join('#');
}

function parseSortKey(sk) {
  return sk.split('#');
}

function createKeyMapper(keyMap) {
  return key => {
    if (!keyMap.hasOwnProperty(key)) {
      throw new Error(`Unknown key ${key}`);
    }
    return keyMap[key];
  };
}

function ddbFirstResultGetter(mapperFn = identity) {
  return pipe(
    path('Items', 0),
    unless(
      isNil,
      pipe(
        unmarshall,
        mapperFn
      )
    )
  );
}
function ddbAllResultsGetter(mapperFn = identity) {
  return pipe(
    prop('Items'),
    map(
      pipe(
        unmarshall,
        mapperFn
      )
    )
  );
}

const sleep = timeInMs => new Promise(resolve => setTimeout(resolve, timeInMs));

const randomBetween = (min, max) => Math.random() * (max - min) + min;

function retryWithBackoff(doAttempt) {
  return async function doRetry(items) {
    const base = 50;
    const cap = 15 * 1000; // 15s
    const maxAttempts = 5;
    let unprocessedItems = items;
  
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const backoff = randomBetween(0, Math.min(cap, base * 2 ** attempt));
      await sleep(backoff);
      unprocessedItems = await doAttempt(unprocessedItems);
      if (!unprocessedItems) {
        return;
      }
    }
  };
}

exports.generateUserToken = generateUserToken;
exports.getUserFromRequest = getUserFromRequest;
exports.createSortKeyPath = createSortKeyPath;
exports.parseSortKey = parseSortKey;
exports.createKeyMapper = createKeyMapper;
exports.ddbFirstResultGetter = ddbFirstResultGetter;
exports.ddbAllResultsGetter = ddbAllResultsGetter;
exports.marshall = marshall;
exports.unmarshall = unmarshall;
exports.sleep = sleep;
exports.randomBetween = randomBetween;
exports.retryWithBackoff = retryWithBackoff;