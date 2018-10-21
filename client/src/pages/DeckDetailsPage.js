import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../components/Navbar';
import DeckActions from '../components/DeckDetailsActions';
import DeckInfo from '../components/DeckDetailsInfo';
import PleaseSignIn from '../components/PleaseSignIn';

const DECK_QUERY = gql`
  query Deck($slug: String!) {
    deck(where: { slug: $slug }) {
      id
      slug
      name
      cardsTotal
      cardsDue
      lastNoteType {
        id
        slug
        name
      }
    }
  }
`;

const Main = styled('main')({
  padding: '0 2.8rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const Loading = () => (
  <Fragment>
    <Navbar title={`Deck: ...`} />
    <p>Loading details...</p>
  </Fragment>
);

class DeckDetailsPage extends Component {
  render() {
    const { slug } = this.props;
    return (
      <PleaseSignIn>
        <Query query={DECK_QUERY} variables={{ slug }}>
          {({ data, error, loading }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <p>Error! {error.message}</p>;
            }
            const { deck } = data;
            return (
              <Fragment>
                <Navbar title={`Deck: ${deck.name}`} />
                <Main>
                  <DeckInfo deck={deck} />
                  <DeckActions deck={deck} />
                </Main>
              </Fragment>
            );
          }}
        </Query>
      </PleaseSignIn>
    );
  }
}

export default DeckDetailsPage;
export { DECK_QUERY };
