import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SingleNoteType = ({ id, children }) => (
  <Query query={NOTE_TYPE_QUERY} variables={{ id: id }}>
    {children}
  </Query>
);

const NOTE_TYPE_QUERY = gql`
  query noteType($id: ID!) {
    noteType(where: { id: $id }) {
      id
      slug
      name

      templates {
        id
        name
        front
        back
      }
    }
  }
`;

export default SingleNoteType;
export { NOTE_TYPE_QUERY };
