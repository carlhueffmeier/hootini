import React, { Component } from 'react';
import Navbar from './Navbar';
import styled from 'react-emotion';

const Container = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
});

const Main = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 2.8rem',
  flex: 1
});

const Message = styled('h2')(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.colors.darkText,
  textAlign: 'center',
  margin: 0
}));

class NotFound extends Component {
  render() {
    return (
      <Container>
        <Navbar title="Not found" />
        <Main>
          <Message>
            Page Not Found{' '}
            <span role="img" aria-label="ghost">
              👻
            </span>
          </Message>
        </Main>
      </Container>
    );
  }
}

export default NotFound;
