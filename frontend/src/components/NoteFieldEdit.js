import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Label, Textarea } from './styles/FormStyles';
import { Field } from 'react-final-form';

const NOTE_TYPE_QUERY = gql`
  query noteType($id: ID!) {
    noteType(where: { id: $id }) {
      id
      name
      fieldDefinitions {
        key
        type
      }
    }
  }
`;

const InputRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem'
});

class NoteFieldEdit extends Component {
  static propTypes = {
    noteTypeId: PropTypes.string
  };

  static defaultProps = {
    onChange: () => {}
  };

  render() {
    const { noteTypeId } = this.props;
    return (
      <Query query={NOTE_TYPE_QUERY} variables={{ id: noteTypeId }}>
        {({ data, error, loading }) => {
          if (loading) {
            return 'Loading note type...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { noteType } = data;
          return noteType.fieldDefinitions.map(({ key, type }) => (
            <Field name={key} key={key}>
              {({ input, meta }) => (
                <InputRow>
                  <Label>
                    {key} ({type})
                  </Label>
                  <Textarea {...input} rows="4" />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </InputRow>
              )}
            </Field>
          ));
        }}
      </Query>
    );
  }
}

export default NoteFieldEdit;
export { NOTE_TYPE_QUERY };
