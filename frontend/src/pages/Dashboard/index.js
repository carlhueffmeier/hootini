import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import DeckList from '../../components/DeckList';
import Navbar from '../../components/Navbar';
import AddDeckButton from './AddDeckButton';

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 1000,
  margin: '0 auto'
});

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
                <AddDeckButton />
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
