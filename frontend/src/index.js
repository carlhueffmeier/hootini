import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
  // request: operation => {
  //   operation.setContext({
  //     fetchOptions: {
  //       credentials: 'include'
  //     },
  //     headers
  //   });
  // }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
