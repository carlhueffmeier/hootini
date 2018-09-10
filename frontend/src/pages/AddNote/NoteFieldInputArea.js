import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Label, Textarea } from '../../components/styles/FormStyles';
import { Field } from 'react-final-form';

const InputRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem'
});

export default class NoteInput extends Component {
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
          const { NoteType } = data;
          return NoteType.fieldDefinitions.map(({ key, type }) => (
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

const NOTE_TYPE_QUERY = gql`
  query NoteType($id: ID!) {
    NoteType(where: { id: $id }) {
      id
      name
      fieldDefinitions {
        key
        type
      }
    }
  }
`;
