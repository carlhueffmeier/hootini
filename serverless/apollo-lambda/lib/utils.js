const jwt = require('jsonwebtoken');

// ~~ Auth ~~
function generateUserToken(user) {
  return jwt.sign({ user: user.id }, process.env.APP_SECRET);
}

function getUserFromRequest(req) {
  const token = req.headers['Authorization'];
  if (token) {
    const { user } = jwt.verify(token, process.env.APP_SECRET);
    return user;
  }
}

// ~~ String ~~
function snakeCaseToCamelCase(input) {
  return input.replace(/_([a-z0-9$])/gi, (_, letter) => letter.toUpperCase());
}

function camelCaseToSnakeCase(input) {
  return input.replace(/([A-Z]+|[0-9$]+)/g, letter => '_' + letter.toLowerCase());
}

exports.generateUserToken = generateUserToken;
exports.getUserFromRequest = getUserFromRequest;
exports.snakeCaseToCamelCase = snakeCaseToCamelCase;
exports.camelCaseToSnakeCase = camelCaseToSnakeCase;