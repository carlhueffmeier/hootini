import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

export default class DeckList extends Component {
  render() {
    return (
      <ul>
        <Query query={DECKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) {
              return 'Loading list of decks...';
            }
            if (error) {
              return <li>Error! {error.message}</li>;
            }
            const { allDecks } = data;
            return allDecks.map((deck, index) => (
              <li key={index}>
                <Link to={`/deck/${deck.slug}`}>{deck.name}</Link>
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
      slug
      name
    }
  }
`;
