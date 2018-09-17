import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import styled from 'react-emotion';
import { Form } from 'react-final-form';
import { TextButton } from './styles/ButtonStyles';
import FormInputField from './FormInputField';
import { wait } from '../lib/utils';

const FormContent = styled('div')({
  margin: '0 1rem 1rem 1rem'
});

const FormActions = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end'
});

const Error = styled('div')(({ theme }) => ({
  ...theme.typography.caption,
  background: theme.colors.lightGrey1,
  color: theme.colors.danger,
  padding: '0.5rem',
  margin: '1rem',
  textAlign: 'center'
}));

export default class SignupForm extends Component {
  handleSubmit = async (signin, formData) => {
    await signin({ variables: formData });
    await wait();
    navigate(`/`);
  };

  render() {
    return (
      <Mutation mutation={SIGNIN_MUTATION}>
        {(signin, { loading, error }) => (
          <Form onSubmit={formData => this.handleSubmit(signin, formData)}>
            {({ handleSubmit, pristine, dirtySinceLastSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FormContent>
                  <FormInputField
                    label="Email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <FormInputField
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  {error &&
                    !dirtySinceLastSubmit && <Error>{error.message}</Error>}
                </FormContent>
                <FormActions>
                  <TextButton disabled={pristine || loading}>
                    Sign Up
                  </TextButton>
                </FormActions>
              </form>
            )}
          </Form>
        )}
      </Mutation>
    );
  }
}

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      id
      name
      email
      permissions
    }
  }
`;
