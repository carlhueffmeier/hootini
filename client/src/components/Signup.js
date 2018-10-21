import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import { Form } from 'react-final-form';
import { FormContent, FormActions, FormError, InputRow } from './styles/FormStyles';
import { TextButton } from './styles/ButtonStyles';
import FormInputField from './FormInputField';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      permissions
    }
  }
`;

class Signup extends Component {
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signup, { loading, error }) => (
          <Form onSubmit={formData => signup({ variables: formData })}>
            {({ handleSubmit, pristine, dirtySinceLastSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FormContent>
                  <InputRow>
                    <FormInputField label="Name" name="name" placeholder="Name" required />
                  </InputRow>
                  <InputRow>
                    <FormInputField
                      label="Email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      required
                    />
                  </InputRow>
                  <InputRow>
                    <FormInputField
                      label="Password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      required
                    />
                  </InputRow>
                  {error && !dirtySinceLastSubmit && <FormError>{error.message}</FormError>}
                </FormContent>
                <FormActions>
                  <TextButton
                    textColor="secondary"
                    onClick={() => navigate('/signin')}
                    type="button"
                    disabled={loading}
                  >
                    I already have an account
                  </TextButton>
                  <TextButton disabled={pristine || loading}>Sign Up</TextButton>
                </FormActions>
              </form>
            )}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
