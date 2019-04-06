const dynamodb = require('../_dynamodb');
const User = require('../models/User');
const { marshall, unmarshall } = require('../lib/utils');
const { pipe, path, unless, isNil } = require('../lib/functionalUtils');

const getOneResult = pipe(
  path(['Items', 0]),
  unmarshall,
  unless(isNil, User.fromDocument.bind(User))
);

function save(user) {
  return user.save();
}

async function findByEmail(email) {
  const queryParams = {
    ExpressionAttributeValues: marshall({
      ':email': email,
      ':userSK': User._getSK()
    }),
    KeyConditionExpression: 'pk = :email AND sk = :userSK'
  };
  return dynamodb
    .query(queryParams)
    .promise()
    .then(getOneResult);
}

exports.save = save;
exports.findByEmail = findByEmail;
