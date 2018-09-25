import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PleaseSignIn from '../components/PleaseSignIn';
import Navbar from '../components/Navbar';
import Review from '../components/Review';

const DUE_CARDS_QUERY = gql`
  query allCards($deckSlug: String!, $when: DateTime!) {
    allCards(where: { deckSlug: $deckSlug, dueTime_lt: $when }) {
      id
      fields {
        key
        value
      }
      template {
        front
        back
      }
    }
  }
`;

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
        <Query query={DUE_CARDS_QUERY} variables={{ deckSlug: slug, when: Date.now() }}>
          {({ data, error, loading }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <p>Error! {error.message}</p>;
            }
            const { allCards } = data;
            console.log('all cards', allCards);
            return <Review cards={allCards} deckSlug={slug} />;
          }}
        </Query>
      </PleaseSignIn>
    );
  }
}

export default ReviewPage;
