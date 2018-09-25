import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const client = new ApolloClient({
  uri: 'https://hootini-backend.now.sh/graphql',
  credentials: 'include'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
