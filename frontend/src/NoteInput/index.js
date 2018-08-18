import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoteInputForm from '../NoteInputForm';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
      <div>
        <Query query={NOTE_TYPE_QUERY} variables={{ id: noteTypeId }}>
          {({ data, error, loading }) => {
            if (loading) {
              return 'Loading note type...';
            }
            if (error) {
              return <li>Error! {error.message}</li>;
            }
            const { NoteType } = data;
            return (
              <NoteInputForm
                fieldDefinitions={NoteType.fieldDefinitions}
                onSubmit={data => console.log(data)}
                onChange={this.props.onChange}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

const NOTE_TYPE_QUERY = gql`
  query NoteType($id: ID!) {
    NoteType(id: $id) {
      id
      name
      fieldDefinitions {
        key
        type
      }
    }
  }
`;
