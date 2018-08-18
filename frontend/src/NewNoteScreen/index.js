import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DeckSelect from '../DeckSelect';
import NoteTypeSelect from '../NoteTypeSelect';
import NoteInput from '../NoteInput';
import NotePreview from '../NotePreview';

export default class NewNoteScreen extends Component {
  state = {
    noteType: null,
    fieldValues: {}
  };

  handleDeckChange = deck => {
    this.props.history.replace(`/deck/${deck.slug}/new-note`);
  };
  handleNoteTypeChange = noteType => this.setState({ noteType });
  handleFieldValueChange = ({ values }) =>
    this.setState({ fieldValues: values });

  render() {
    const { match } = this.props;
    return (
      <Query query={DECK_QUERY} variables={{ slug: match.params.slug }}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading deck information...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { Deck } = data;
          return (
            <div>
              <h1>Add Note</h1>
              <DeckSelect preselect={Deck} onChange={this.handleDeckChange} />
              <NoteTypeSelect onChange={this.handleNoteTypeChange} />
              {this.state.noteType && (
                <NoteInput
                  noteTypeId={this.state.noteType.id}
                  onChange={this.handleFieldValueChange}
                />
              )}
              {this.state.noteType && (
                <NotePreview
                  noteTypeId={this.state.noteType.id}
                  fields={this.state.fieldValues}
                />
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

const DECK_QUERY = gql`
  query Deck($slug: String!) {
    Deck(where: { slug: $slug }) {
      id
      slug
      name
      description
    }
  }
`;
