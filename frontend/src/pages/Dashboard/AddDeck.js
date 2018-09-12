import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import DeckForm from './DeckForm';
import { wait } from '../../lib/utils';

export default class AddDeck extends Component {
  handleSubmit = async (createDeck, formData) => {
    const {
      data: {
        newDeck: { slug }
      }
    } = await createDeck({ variables: formData });
    await wait();
    navigate(`/deck/${slug}`);
  };

  render() {
    return (
      <Mutation mutation={NEW_DECK} refetchQueries={['allDecks']}>
        {(createDeck, { loading, error }) => (
          <DeckForm
            loading={loading}
            error={error}
            onSubmit={formData => this.handleSubmit(createDeck, formData)}
          />
        )}
      </Mutation>
    );
  }
}

const NEW_DECK = gql`
  mutation newDeck($name: String!) {
    newDeck(input: { name: $name }) {
      slug
    }
  }
`;
