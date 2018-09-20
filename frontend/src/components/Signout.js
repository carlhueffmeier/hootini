import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { TextButton } from './styles/ButtonStyles';

const SIGNOUT_MUTATION = gql`
  mutation signout {
    signout {
      message
    }
  }
`;

class Signout extends Component {
  handleClick = async (signout, client) => {
    await signout();
    await client.resetStore();
  };

  render() {
    return (
      <Mutation mutation={SIGNOUT_MUTATION}>
        {(signout, { client }) => (
          <TextButton onClick={() => this.handleClick(signout, client)}>Sign Out</TextButton>
        )}
      </Mutation>
    );
  }
}

export default Signout;
export { SIGNOUT_MUTATION };
