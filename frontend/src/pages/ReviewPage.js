import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import PleaseSignIn from '../components/PleaseSignIn';

const DUE_CARDS_QUERY = gql`
  query dueCards($slug: String!) {
    dueCards(where: { deckSlug: $slug }) {
      id
      fields {
        key
        value
      }
      noteType {
        front
        back
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
    <Navbar title={`Review: ...`} />
    <p>Loading details...</p>
  </Fragment>
);

class ReviewPage extends Component {
  render() {
    const { slug } = this.props;
    return (
      <PleaseSignIn>
        <Query query={DUE_CARDS_QUERY} variables={{ deckSlug: slug }}>
          {({ data, error, loading }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <li>Error! {error.message}</li>;
            }
            const { Deck } = data;
            return (
              <Fragment>
                <Main>
                  <DeckInfo deck={Deck} />
                  <DeckActions deck={Deck} />
                </Main>
              </Fragment>
            );
          }}
        </Query>
      </PleaseSignIn>
    );
  }
}

export default ReviewPage;
