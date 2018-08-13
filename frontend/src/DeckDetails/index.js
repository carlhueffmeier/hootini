import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DeckView from '../DeckView';

export default class DeckDetails extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={DECK_QUERY} variables={{ slug: match.params.slug }}>
        {({ data, loading }) => {
          if (loading) {
            return 'Loading deck details...';
          }
          const { Deck } = data;
          return <DeckView deck={Deck} />;
        }}
      </Query>
    );
  }
}

const DECK_QUERY = gql`
  query Deck($slug: String!) {
    Deck(where: { slug: $slug }) {
      id
      name
      description
    }
  }
`;
