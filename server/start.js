// For development: import configuration options from '.env'
if (process.env) require('dotenv').config();

(async () => {
  // Wait for the database connection
  await require('./db/connectToDatabase')();

  // Configure middleware
  const app = require('./app');
  app.set('port', process.env.PORT || 5000);

  const graphqlPath = require('./apollo').graphqlPath;
  const server = app.listen(app.get('port'), () => {
    const playgroundUrl = `http://localhost:${server.address().port}` + graphqlPath;
    console.log(`🎡   GraphQL Playground ready at ${playgroundUrl}`);
  });
})();
