const dynamodb = require('../_dynamodb');
const Card = require('../models/Card');
const { marshall, unmarshall, retryWithBackoff } = require('../lib/utils');
const {
  pipe,
  prop,
  map,
  path,
  unless,
  isNil
} = require('../lib/functionalUtils');
const { createSimpleBatchLoader } = require('../lib/loader');
const { batchWriteItem } = require('../lib/dbStrategies');

const getResults = pipe(
  prop('Items'),
  map(
    pipe(
      unmarshall,
      Card.fromDocument.bind(Card)
    )
  )
);
const getOneResult = pipe(
  path(['Items', 0]),
  unmarshall,
  unless(isNil, Card.fromDocument.bind(Card))
);

function save(card) {
  return card.save();
}

function saveAll(cards) {
  const loader = createSimpleBatchLoader(batchWriteItem, cards.length);
  return Promise.all(cards.map(card => card._create(loader.load)));
}

async function findByUser(user) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':cardSK': Card.getSK()
    }),
    KeyConditionExpression: 'pk = :user AND begins_with(sk, :cardSK)'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);
}

async function findByUserAndDeck(user, deckSlug) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':deckSK': Card.getSK(deckSlug)
    }),
    KeyConditionExpression: 'pk = :user AND sk = :deckSK'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);
}

async function findByUserAndDeckAndNoteId(user, deckSlug, noteId) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':deckSK': Card.getSK(deckSlug, noteId)
    }),
    KeyConditionExpression: 'pk = :user AND sk = :deckSK'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);
}

async function findOneByUserAndDeckAndNoteIdAndCardId(
  user,
  deckSlug,
  noteId,
  id
) {
  return findOneByUserAndSK(user, Card.getSK(deckSlug, noteId, id));
}

async function findOneByUserAndSK(user, sk) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':deckSK': sk
    }),
    KeyConditionExpression: 'pk = :user AND sk = :deckSK'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getOneResult);
}

async function deleteByUserAndNoteTypeIdAndTemplateId(
  user,
  noteTypeId,
  templateId
) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':sk2': Card._getSK2(noteTypeId, templateId)
    }),
    KeyConditionExpression: 'pk = :user AND sk2 = :sk2',
    ProjectionExpression: 'sk'
  };
  const results = await dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);

  const keys = results.map(({ sk }) => ({ pk: user, sk }));
  return batchDelete(keys);
}

async function batchDelete(keys) {
  const batchWriteItemParams = {
    requestItems: {
      [process.env.TABLE_NAME]: keys.map(({ pk, sk }) => ({
        DeleteRequest: {
          Key: {
            pk,
            sk
          }
        }
      }))
    }
  };
  const { UnprocessedItems } = await dynamodb
    .batchWriteItem(batchWriteItemParams)
    .promise();
  
  if (Object.keys(UnprocessedItems).length) {
    return retryBatchWriteItem(UnprocessedItems);
  }
}

function retryBatchWriteItem(items) {
  return retryWithBackoff(async function doAttempt(items) {
    const batchWriteItemParams = {
      requestItems: items
    };
    const { UnprocessedItems } = await dynamodb
      .batchWriteItem(batchWriteItemParams)
      .promise();
    
    if (Object.keys(UnprocessedItems).length) {
      return UnprocessedItems;
    }
  })(items);
}

exports.save = save;
exports.saveAll = saveAll;
exports.findByUser = findByUser;
exports.findByUserAndDeck = findByUserAndDeck;
exports.findByUserAndDeckAndNoteId = findByUserAndDeckAndNoteId;
exports.findOneByUserAndDeckAndNoteIdAndCardId = findOneByUserAndDeckAndNoteIdAndCardId;
exports.findOneByUserAndSK = findOneByUserAndSK;
exports.deleteByUserAndNoteTypeIdAndTemplateId = deleteByUserAndNoteTypeIdAndTemplateId;
