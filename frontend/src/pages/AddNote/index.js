import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';
import EditNoteForm from './EditNoteForm';

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

export default class NewNoteScreen extends Component {
  handleSubmit = async (createNote, formData) => {
    const { deck, noteType, ...fields } = formData;
    const variables = {
      deck: deck.id,
      noteType: noteType.id,
      fields: Object.entries(fields).map(([key, value]) => ({ key, value }))
    };
    const { data } = await createNote({ variables });
    console.log(data);
  };

  render() {
    const { slug } = this.props;
    return (
      <Query query={DECK_QUERY} variables={{ slug }}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading deck information...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { Deck } = data;
          return (
            <Mutation mutation={CREATE_NOTE_MUTATION}>
              {(createNote, { loading, error }) => (
                <PageContainer>
                  <Navbar title="Add Note" />
                  <Main>
                    <EditNoteForm
                      initialValues={{ deck: Deck }}
                      loading={loading}
                      error={error}
                      onSubmit={formData =>
                        this.handleSubmit(createNote, formData)
                      }
                    />
                  </Main>
                </PageContainer>
              )}
            </Mutation>
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

const CREATE_NOTE_MUTATION = gql`
  mutation createNote($noteType: ID!, $deck: ID!, $fields: [NewNoteField!]!) {
    createNote(input: { noteType: $noteType, deck: $deck, fields: $fields }) {
      id
      deck {
        name
      }
      noteType {
        name
      }
      fields {
        key
        value
      }
    }
  }
`;
