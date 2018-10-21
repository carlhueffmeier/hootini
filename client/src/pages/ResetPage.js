import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import Navbar from '../components/Navbar';
import Reset from '../components/Reset';

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 500,
  margin: '4rem auto'
});

class SigninPage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="Reset Password" />
        <Main>
          <Reset resetToken={this.props.resetToken} />
        </Main>
      </Fragment>
    );
  }
}

export default SigninPage;
