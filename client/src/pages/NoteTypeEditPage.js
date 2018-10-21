import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../components/Navbar';
import NoteTypeEditForm from '../components/NoteTypeEditForm';
import PleaseSignIn from '../components/PleaseSignIn';

const NOTE_TYPE_QUERY = gql`
  query noteType($slug: String!) {
    noteType(where: { slug: $slug }) {
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

class EditNoteTypePage extends Component {
  render() {
    const { slug } = this.props;
    return (
      <PleaseSignIn>
        <Query query={NOTE_TYPE_QUERY} variables={{ slug }}>
          {({ data, error, loading }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <p>Error! {error.message}</p>;
            }
            const { noteType } = data;
            return (
              <Page>
                <Navbar title={`Edit Note Type: ${noteType.name}`} />
                <Main>
                  <NoteTypeEditForm noteType={noteType} />
                </Main>
              </Page>
            );
          }}
        </Query>
      </PleaseSignIn>
    );
  }
}

export default EditNoteTypePage;
export { NOTE_TYPE_QUERY };
