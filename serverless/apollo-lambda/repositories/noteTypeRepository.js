const dynamodb = require('../_dynamodb');
const NoteType = require('../models/NoteType');
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
      NoteType.fromDocument.bind(NoteType)
    )
  )
);
const getOneResult = pipe(
  path(['Items', 0]),
  unmarshall,
  unless(isNil, NoteType.fromDocument.bind(NoteType))
);

function save(noteType) {
  return noteType.save();
}

async function findOneByUserAndSlug(user, slug) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':noteTypeSK': NoteType.getSK(slug)
    }),
    KeyConditionExpression: 'pk = :user AND sk = :noteTypeSK'
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
      ':noteTypeSK': NoteType.getSK()
    }),
    KeyConditionExpression: 'pk = :user AND begins_with(sk, :noteTypeSK)'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);
}

async function findByUserAndName(user, noteTypeName) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':user': user,
      ':noteTypeSK': NoteType.getSK(),
      ':noteTypeName': noteTypeName
    }),
    KeyConditionExpression: 'pk = :user AND begins_with(sk, :noteTypeSK)',
    FilterExpression: 'begins_with(noteTypeName, :noteTypeName)'
  };
  dynamodb
    .query(queryParams)
    .promise()
    .then(getResults);
}

exports.save = save;
exports.findOneByUserAndSlug = findOneByUserAndSlug;
exports.findByUser = findByUser;
exports.findByUserAndName = findByUserAndName;
