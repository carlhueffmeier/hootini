import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../components/Navbar';
import EditNoteForm from '../components/NoteForm';
import PleaseSignIn from '../components/PleaseSignIn';
import { DECK_QUERY } from './DeckDetailsPage';

const CREATE_NOTE_MUTATION = gql`
  mutation createNote($noteType: ID!, $deck: ID!, $fields: [NewNoteField!]!) {
    createNote(data: { noteType: $noteType, deck: $deck, fields: $fields }) {
      cardsAdded
    }
  }
`;

const PageContainer = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
});

const Main = styled('main')({
  flex: 1,
  overflow: 'hidden',
  width: '100%'
});

class NoteCreatePage extends Component {
  handleSubmit = (createNote, formData) => {
    const { deck, noteType, ...fields } = formData;
    const variables = {
      deck: deck.id,
      noteType: noteType.id,
      fields: Object.entries(fields).map(([key, value]) => ({ key, value }))
    };
    createNote({ variables });
  };

  render() {
    const { slug } = this.props;
    return (
      <PageContainer>
        <Navbar title="Add Note" />
        <Main>
          <PleaseSignIn>
            <Query query={DECK_QUERY} variables={{ slug }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return 'Loading deck information...';
                }
                if (error) {
                  return <li>Error! {error.message}</li>;
                }
                const { deck } = data;
                return (
                  <Mutation mutation={CREATE_NOTE_MUTATION}>
                    {(createNote, { loading, error }) => (
                      <EditNoteForm
                        initialValues={{ deck, noteType: deck.lastNoteType }}
                        loading={loading}
                        error={error}
                        onSubmit={formData => this.handleSubmit(createNote, formData)}
                      />
                    )}
                  </Mutation>
                );
              }}
            </Query>
          </PleaseSignIn>
        </Main>
      </PageContainer>
    );
  }
}

export default NoteCreatePage;
export { CREATE_NOTE_MUTATION };
