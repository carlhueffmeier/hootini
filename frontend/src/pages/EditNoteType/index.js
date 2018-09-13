import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';
import NoteTypeForm from './NoteTypeForm';
import { pick } from '../../lib/utils';

const Page = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
});

const Main = styled('main')({
  flex: 1,
  overflow: 'hidden',
  width: '100%'
});

const Loading = () => (
  <Fragment>
    <Navbar title={`Note Type: ...`} />
    <p>Loading details...</p>
  </Fragment>
);

export default class EditNoteType extends Component {
  handleSubmit = async (updateNoteType, formData) => {
    const variables = {
      id: formData.id,
      name: formData.name,
      fieldDefinitions:
        formData.fieldDefinitions &&
        formData.fieldDefinitions.map(pick(['id', 'key'])),
      templates:
        formData.templates &&
        formData.templates.map(pick(['id', 'name', 'front', 'back']))
    };
    const result = await updateNoteType({ variables });
    console.log(result);
  };

  render() {
    const { slug } = this.props;
    return (
      <Query query={NOTE_TYPE_QUERY} variables={{ slug }}>
        {({ data, error, loading }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { NoteType } = data;
          return (
            <Page>
              <Navbar title={`Edit Note Type: ${NoteType.name}`} />
              <Main>
                <Mutation
                  mutation={UPDATE_NOTE_TYPE_MUTATION}
                  refetchQueries={['NoteType']}
                >
                  {(updateNoteType, { loading, error }) => (
                    <NoteTypeForm
                      initialValues={NoteType}
                      loading={loading}
                      error={error}
                      onSubmit={formData =>
                        this.handleSubmit(updateNoteType, {
                          id: NoteType.id,
                          ...formData
                        })
                      }
                    />
                  )}
                </Mutation>
              </Main>
            </Page>
          );
        }}
      </Query>
    );
  }
}

const NOTE_TYPE_QUERY = gql`
  query NoteType($slug: String!) {
    NoteType(where: { slug: $slug }) {
      id
      name
      slug
      fieldDefinitions {
        id
        type
        key
      }

      templates {
        id
        name
        front
        back
      }
    }
  }
`;

const UPDATE_NOTE_TYPE_MUTATION = gql`
  mutation updateNoteTypeAndUpsertTemplates(
    $id: ID!
    $name: String
    $fieldDefinitions: [UpsertedFieldDefinition!]
    $templates: [UpsertedTemplate!]
  ) {
    updateNoteTypeAndUpsertTemplates(
      input: {
        id: $id
        name: $name
        fieldDefinitions: $fieldDefinitions
        templates: $templates
      }
    ) {
      slug
    }
  }
`;
