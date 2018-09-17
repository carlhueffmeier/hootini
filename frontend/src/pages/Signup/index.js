import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';
import User from '../../components/User';
import SignupForm from '../../components/SignupForm';
import SigninForm from '../../components/SigninForm';
import SignoutButton from '../../components/SignoutButton';

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 1000,
  margin: '0 auto'
});

export default class Signup extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="Sign In" />
        <Main>
          <User>
            {({ data, error, loading }) => {
              if (loading) {
                return 'Loading...';
              }
              if (data && data.me) {
                return (
                  <div>
                    <h2>Hi {data.me.name} 👋</h2>
                    <SignoutButton />
                  </div>
                );
              }
              return (
                <Fragment>
                  <SignupForm />
                  <SigninForm />
                </Fragment>
              );
            }}
          </User>
        </Main>
      </Fragment>
    );
  }
}
