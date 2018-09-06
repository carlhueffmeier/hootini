import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';
import DeckActions from './DeckActions';
import DeckInfo from './DeckInfo';

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

export default class DeckDetails extends Component {
  render() {
    const { slug } = this.props;
    return (
      <Query query={DECK_QUERY} variables={{ slug }}>
        {({ data, error, loading }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { Deck } = data;
          return (
            <Fragment>
              <Navbar title={`Deck: ${Deck.name}`} />
              <Main>
                <DeckInfo deck={Deck} />
                <DeckActions deck={Deck} />
              </Main>
            </Fragment>
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
