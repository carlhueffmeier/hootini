import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import DeckList from '../DeckList';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <header>
            <h1>Welcome to Mnemo</h1>
          </header>
          <main>
            <DeckList />
          </main>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
