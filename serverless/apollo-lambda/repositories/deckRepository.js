const dynamodb = require('../_dynamodb');
const Deck = require('../models/Deck');
const { marshall, unmarshall } = require('../lib/utils');
const {
  pipe,
  prop,
  map,
  path,
  unless,
  isNil
} = require('../lib/functionalUtils');

const getResults = pipe(
  prop('Items'),
  map(
    pipe(
      unmarshall,
      Deck.fromDocument.bind(Deck)
    )
  )
);
const getOneResult = pipe(
  path(['Items', 0]),
  unmarshall,
  unless(isNil, Deck.fromDocument.bind(Deck))
);

function save(deck) {
  return deck.save();
}

async function findOneByUserAndSlug(user, slug) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':deckSK': Deck._getSK(slug)
    }),
    KeyConditionExpression: 'pk = :user AND sk = :deckSK'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getOneResult);
}

async function findByUser(user) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':deckSK': Deck._getSK()
    }),
    KeyConditionExpression: 'pk = :user AND begins_with(sk, :deckSK)'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);
}

async function findByUserAndName(user, deckName) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':deckSK': Deck._getSK(),
      ':deckName': deckName
    }),
    KeyConditionExpression: 'pk = :user AND begins_with(sk, :deckSK)',
    FilterExpression: 'begins_with(deckName, :deckName)'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);
}

exports.save = save;
exports.findOneByUserAndSlug = findOneByUserAndSlug;
exports.findByUser = findByUser;
exports.findByUserAndName = findByUserAndName;
