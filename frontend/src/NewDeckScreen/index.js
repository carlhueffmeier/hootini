import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import DeckForm from '../DeckForm';

export default class NewDeckScreen extends Component {
  render() {
    return (
      <div>
        <Mutation mutation={NEW_DECK} refetchQueries={['allDecks']}>
          {createDeck => (
            <DeckForm
              onSubmit={createDeck}
              onClose={() => this.props.history.push('/')}
            />
          )}
        </Mutation>
      </div>
    );
  }
}

const NEW_DECK = gql`
  mutation newDeck($name: String!, $description: String!) {
    newDeck(input: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;
