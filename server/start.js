const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

// Import configuration options from 'variables.env'
require('dotenv').config({ path: 'variables.env' });

// Connect to database and handle connection issues
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise; // use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`Can't connect to database → ${err.message}`);
});

// Import mongoose models
require('./models/deck');
require('./models/note');
require('./models/noteType');
require('./models/template');
require('./models/card');

// Start the app
const schema = require('./graphql/schema');
const apolloServer = new ApolloServer(schema);
const app = require('./app');
apolloServer.applyMiddleware({ app });
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
  const playgroundUrl =
    `http://localhost:${server.address().port}` + apolloServer.graphqlPath;
  console.log(`🎡   GraphQL Playground ready at ${playgroundUrl}`);
});
