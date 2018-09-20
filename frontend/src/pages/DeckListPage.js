import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import DeckList from '../components/DeckList';
import Navbar from '../components/Navbar';
import AddDeckButton from '../components/DeckCreateButton';
import PleaseSignIn from '../components/PleaseSignIn';

const DECKS_QUERY = gql`
  query allDecks {
    allDecks {
      slug
      name
      cardsTotal
      cardsDue
    }
  }
`;

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 1000,
  margin: '0 auto'
});

const Message = styled('h4')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.colors.textDark,
  textAlign: 'center'
}));

class DeckListPage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="All Decks" />
        <Main>
          <PleaseSignIn>
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
                    {allDecks.length > 0 ? (
                      <DeckList decks={allDecks} />
                    ) : (
                      <Message>No decks yet 🐥</Message>
                    )}
                    <AddDeckButton />
                  </Fragment>
                );
              }}
            </Query>
          </PleaseSignIn>
        </Main>
      </Fragment>
    );
  }
}

export default DeckListPage;
export { DECKS_QUERY };
