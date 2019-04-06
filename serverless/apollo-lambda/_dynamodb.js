const AWS = require('aws-sdk');

const options = {
  params: {
    TableName: process.env.TABLE_NAME
  }
};

module.exports = new AWS.DynamoDB(options);