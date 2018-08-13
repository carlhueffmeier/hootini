import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllDecks from '../AllDecks';
import DeckDetails from '../DeckDetails';
import NewDeckScreen from '../NewDeckScreen';
import NewNoteScreen from '../NewNoteScreen';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={AllDecks} />
            <Route exact path="/new-deck" component={NewDeckScreen} />
            <Route exact path="/deck/:slug" component={DeckDetails} />
            <Route
              exact
              path="/deck/:slug/new-note"
              component={NewNoteScreen}
            />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
