import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { navigate } from '@reach/router';
import Navbar from '../components/Navbar';
import User from '../components/User';
import Signup from '../components/Signup';

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 500,
  margin: '4rem auto'
});

export default class SignupPage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="Sign Up" />
        <Main>
          <User>
            {({ data }) => {
              if (data && data.me) {
                navigate('/decks');
              }
              return <Signup />;
            }}
          </User>
        </Main>
      </Fragment>
    );
  }
}
