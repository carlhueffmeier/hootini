const mongoose = require('mongoose');

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

// Start the app
const apolloServer = require('./apollo');
const app = require('./app');
apolloServer.applyMiddleware({ app });
app.set('port', process.env.PORT || 3333);

const server = app.listen(app.get('port'), () =>
  console.log(
    `🎡 GraphQL Playground ready at http://localhost:${server.address().port}${
      apolloServer.graphqlPath
    }`
  )
);
