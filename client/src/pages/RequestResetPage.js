import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import Navbar from '../components/Navbar';
import User from '../components/User';
import RequestReset from '../components/RequestReset';

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 500,
  margin: '4rem auto'
});

class RequestResetPage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="Password Reset" />
        <Main>
          <User>
            {({ data }) => {
              if (data && data.me) {
                return <RequestReset initialValues={{ email: data.me.email }} />;
              }
              return <RequestReset />;
            }}
          </User>
        </Main>
      </Fragment>
    );
  }
}

export default RequestResetPage;
