import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';

const Main = styled('main')({
  padding: '0 2.8rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const Loading = () => (
  <Fragment>
    <Navbar title={`Deck: ...`} />
    <p>Loading details...</p>
  </Fragment>
);

export default class EditNoteType extends Component {
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
            <Fragment>
              <Navbar title={`Edit Note Type: ${NoteType.name}`} />
              <Main>
                <pre>{JSON.stringify(NoteType, null, 2)}</pre>
              </Main>
            </Fragment>
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
        type
        key
      }

      templates {
        name
        front
        back
      }
    }
  }
`;
