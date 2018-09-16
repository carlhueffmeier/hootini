import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import Navbar from '../../components/Navbar';
import { Mutation } from 'react-apollo';
import { navigate } from '@reach/router';
import gql from 'graphql-tag';
import SignupForm from '../../components/SignupForm';
import { wait } from '../../lib/utils';
import User from '../../components/User';

const Main = styled('main')({
  padding: '0 2.8rem',
  maxWidth: 1000,
  margin: '0 auto'
});

export default class Signup extends Component {
  handleSubmit = async (signup, formData) => {
    const { data } = await signup({ variables: formData });
    console.log(data.signup);
    await wait();
    navigate(`/`);
  };

  render() {
    return (
      <Fragment>
        <Navbar title="Signup" />
        <Main>
          <User>
            {({ data, error, loading }) => {
              if (loading) {
                return 'Loading...';
              }
              if (data && data.me) {
                return <h2>Hi {data.me.name} 👋</h2>;
              }
              return (
                <Mutation mutation={SIGNUP_MUTATION}>
                  {(signup, { loading, error }) => (
                    <SignupForm
                      loading={loading}
                      error={error}
                      onSubmit={formData => this.handleSubmit(signup, formData)}
                    />
                  )}
                </Mutation>
              );
            }}
          </User>
        </Main>
      </Fragment>
    );
  }
}

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(input: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      password
      permissions
    }
  }
`;
