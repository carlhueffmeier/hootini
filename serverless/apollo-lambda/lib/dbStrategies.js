const dynamodb = require('../_dynamodb');
const { marshall } = require('../lib/utils');
const { prepend, pick } = require('../lib/functionalUtils');

async function putItemNotExists(document) {
  const putParams = {
    Item: marshall(document),
    ConditionExpression: 'attribute_not_exists(pk)'
  };
  return dynamodb.putItem(putParams).promise();
}

async function updateItem(current, changes) {
  const attributeValues = {};
    const updateExpressions = [];
    Object.entries(changes).forEach(([key, value]) => {
      const valueExpression = prepend(':', key);
      attributeValues[valueExpression] = value;
      updateExpressions.push(`${key} = ${valueExpression}`);
    });
    attributeValues[':updatedAt'] = marshall(Date.now());
    updateExpressions.push('updatedAt = :updatedAt');
    const updateParams = {
      Key: marshall(pick(['pk', 'sk'], current)),
      ExpressionAttributeValues: marshall(attributeValues),
      UpdateExpression: `SET ${updateExpressions.join()}`
    };
    return dynamodb.updateItem(updateParams).promise();
}

async function batchWriteItem(documents) {
  const batchWriteItemsParams = {
    RequestItems: {
      [process.env.TABLE_NAME]: documents.map(document => ({
        PutRequest: {
          Item: marshall(document)
        }
      }))
    }
  };
  return dynamodb.batchWriteItem(batchWriteItemsParams).promise();
}

exports.putItemNotExists = putItemNotExists;
exports.updateItem = updateItem;
exports.batchWriteItem = batchWriteItem;
