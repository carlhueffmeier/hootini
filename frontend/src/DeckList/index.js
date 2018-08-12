import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class DeckList extends Component {
  render() {
    return (
      <ul>
        <Query query={DECKS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return 'Loading list of decks...';
            }
            const { allDecks } = data;
            return allDecks.map(deck => (
              <li key={deck.id}>
                <span>{deck.name}</span>
              </li>
            ));
          }}
        </Query>
      </ul>
    );
  }
}

const DECKS_QUERY = gql`
  query allDecks {
    allDecks {
      id
      name
    }
  }
`;
