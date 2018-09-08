import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';
import NoteTypeForm from './NoteTypeForm';

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

const Loading = () => (
  <Fragment>
    <Navbar title={`Note Type: ...`} />
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
            <PageContainer>
              <Navbar title={`Edit Note Type: ${NoteType.name}`} />
              <Main>
                <NoteTypeForm initialValues={NoteType} />
              </Main>
            </PageContainer>
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
