import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import DeckForm from './DeckForm';
import { wait } from '../lib/utils';

const CREATE_DECK_MUTATION = gql`
  mutation createDeck($name: String!) {
    createDeck(data: { name: $name }) {
      slug
    }
  }
`;

class DeckCreateForm extends Component {
  handleSubmit = async (createDeck, formData) => {
    const {
      data: {
        createDeck: { slug }
      }
    } = await createDeck({ variables: formData });
    // Wait until the refetch finishes and go to new deck's page
    await wait();
    navigate(`/deck/${slug}`);
  };

  render() {
    return (
      <Mutation mutation={CREATE_DECK_MUTATION} refetchQueries={['allDecks']}>
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

export default DeckCreateForm;
