const { ApolloServer } = require('apollo-server-express');

// Import configuration options from 'variables.env'
require('dotenv').config({ path: 'variables.env' });

// Connect to database and handle connection issues
const generateModels = require('./db');

// Start the app
const schema = require('./graphql/schema');
const apolloServer = new ApolloServer({
  ...schema,
  context: createContext
});
const app = require('./app');
// We have to turn off 'cors' to prevent apollo from overwriting origin headers
// https://github.com/apollographql/apollo-server/blob/79191397faa3f544e9241faa8e9110014bf00e43/packages/apollo-server-express/src/ApolloServer.ts#L127
apolloServer.applyMiddleware({ app, cors: false });
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
  const playgroundUrl =
    `http://localhost:${server.address().port}` + apolloServer.graphqlPath;
  console.log(`🎡   GraphQL Playground ready at ${playgroundUrl}`);
});

// Put the request and response objects into the context
function createContext({ req, res }) {
  return {
    db: generateModels({ user: req.user }),
    req,
    res
  };
}
