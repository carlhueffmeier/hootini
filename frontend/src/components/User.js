import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';

export default class User extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, error, loading }) => {
          if (loading) {
            return 'Loading current user...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { me } = data;
          return (
            <div>
              {me ? <h2>Hi {me.name}</h2> : <a href="#">Log in now</a>}
              <pre>{JSON.stringify(me, null, 2)}</pre>
            </div>
          );
        }}
      </Query>
    );
  }
}

const CURRENT_USER_QUERY = gql`
  query me {
    me {
      name
      email
      permissions
    }
  }
`;
