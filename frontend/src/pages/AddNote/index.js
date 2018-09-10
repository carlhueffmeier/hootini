import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';
import EditNoteForm from './EditNoteForm';

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

export default class NewNoteScreen extends Component {
  render() {
    const { slug } = this.props;
    return (
      <Query query={DECK_QUERY} variables={{ slug }}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading deck information...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { Deck } = data;
          return (
            <PageContainer>
              <Navbar title="Add Note" />
              <Main>
                <EditNoteForm initialValues={{ deck: Deck }} />
              </Main>
            </PageContainer>
          );
        }}
      </Query>
    );
  }
}

const DECK_QUERY = gql`
  query Deck($slug: String!) {
    Deck(where: { slug: $slug }) {
      id
      slug
      name
      description
    }
  }
`;
