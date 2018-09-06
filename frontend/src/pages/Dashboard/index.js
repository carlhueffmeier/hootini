import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from '@reach/router';
import DeckList from './DeckList';
import Navbar from '../../components/Navbar';
import { Main } from './styles';

export default class Dashboard extends Component {
  render() {
    return (
      <Query query={DECKS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) {
            return 'Loading list of decks...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { allDecks } = data;
          return (
            <Fragment>
              <Navbar title="All Decks" />
              <Main>
                <DeckList decks={allDecks} />
                <Link to="/new-deck">+ New Deck</Link>
              </Main>
            </Fragment>
          );
        }}
      </Query>
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
