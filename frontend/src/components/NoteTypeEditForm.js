import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import NoteTypeForm from './NoteTypeForm';
import { pick } from '../lib/utils';

const UPDATE_NOTE_TYPE_MUTATION = gql`
  mutation updateNoteTypeAndUpsertTemplates(
    $id: ID!
    $name: String
    $fieldDefinitions: [UpsertedFieldDefinition!]
    $templates: [UpsertedTemplate!]
  ) {
    updateNoteTypeAndUpsertTemplates(
      data: { id: $id, name: $name, fieldDefinitions: $fieldDefinitions, templates: $templates }
    ) {
      slug
    }
  }
`;

class NoteTypeEditForm extends Component {
  handleSubmit = async (updateNoteType, formData) => {
    const variables = {
      id: this.props.noteType.id,
      name: formData.name,
      fieldDefinitions:
        formData.fieldDefinitions && formData.fieldDefinitions.map(pick(['id', 'key'])),
      templates: formData.templates && formData.templates.map(pick(['id', 'name', 'front', 'back']))
    };
    await updateNoteType({ variables });
  };

  render() {
    const { noteType } = this.props;
    return (
      <Mutation mutation={UPDATE_NOTE_TYPE_MUTATION} refetchQueries={['noteType']}>
        {(updateNoteType, { loading, error }) => (
          <NoteTypeForm
            initialValues={noteType}
            loading={loading}
            error={error}
            onSubmit={formData => this.handleSubmit(updateNoteType, formData)}
          />
        )}
      </Mutation>
    );
  }
}

export default NoteTypeEditForm;
export { UPDATE_NOTE_TYPE_MUTATION };
