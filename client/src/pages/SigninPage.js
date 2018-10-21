import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { navigate } from '@reach/router';
import Navbar from '../components/Navbar';
import User from '../components/User';
import Signin from '../components/Signin';

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 500,
  margin: '4rem auto'
});

class SigninPage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="Sign In" />
        <Main>
          <User>
            {({ data }) => {
              if (data && data.me) {
                navigate('/decks');
              }
              return <Signin />;
            }}
          </User>
        </Main>
      </Fragment>
    );
  }
}

export default SigninPage;
