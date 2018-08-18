import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PreviewPane from './PreviewPane';

export default class NotePreview extends Component {
  static propTypes = {
    noteTypeId: PropTypes.string.isRequired
  };

  render() {
    const { noteTypeId, fields } = this.props;
    return (
      <Query query={NOTE_TYPE_QUERY} variables={{ id: noteTypeId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading note type...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { NoteType } = data;
          return (
            <div>
              {NoteType.templates &&
                NoteType.templates.map((template, index) => (
                  <div key={index}>
                    <h2>{template.name}</h2>
                    <PreviewPane template={template} fields={fields} />
                  </div>
                ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

const NOTE_TYPE_QUERY = gql`
  query NoteType($id: ID!) {
    NoteType(id: $id) {
      id
      name
      templates {
        name
        front
        back
      }
    }
  }
`;
