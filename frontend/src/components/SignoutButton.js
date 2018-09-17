import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { navigate } from '@reach/router';
import gql from 'graphql-tag';
import { TextButton } from './styles/ButtonStyles';
import { wait } from '../lib/utils';

export default class SignoutButton extends Component {
  handleClick = async (signout, client) => {
    await signout();
    await client.resetStore();
    await wait();
    // navigate(`/`);
  };

  render() {
    return (
      <Mutation mutation={SIGNOUT_MUTATION}>
        {(signout, { client }) => (
          <TextButton onClick={() => this.handleClick(signout, client)}>
            Sign Out
          </TextButton>
        )}
      </Mutation>
    );
  }
}

const SIGNOUT_MUTATION = gql`
  mutation signout {
    signout {
      message
    }
  }
`;
