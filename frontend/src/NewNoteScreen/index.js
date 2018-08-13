import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DeckSelect from '../DeckSelect';
import NoteTypeSelect from '../NoteTypeSelect';

export default class NewNoteScreen extends Component {
  state = {
    deck: null,
    noteType: null
  };

  handleDeckChange = deck => this.setState({ deck });
  handleNoteTypeChange = noteType => this.setState({ noteType });

  render() {
    const { match } = this.props;
    return (
      <Query query={DECK_QUERY} variables={{ id: match.params.id }}>
        {({ loading, data }) => {
          if (loading) {
            return 'Loading deck information...';
          }
          const { Deck } = data;
          return (
            <div>
              <h1>Add Note</h1>
              <DeckSelect
                defaultSelectedItem={Deck}
                onChange={this.handleDeckChange}
              />
              <NoteTypeSelect onChange={this.handleNoteTypeChange} />
            </div>
          );
        }}
      </Query>
    );
  }
}

const DECK_QUERY = gql`
  query Deck($id: ID!) {
    Deck(id: $id) {
      id
      name
    }
  }
`;
