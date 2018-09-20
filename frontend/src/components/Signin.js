import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { navigate } from '@reach/router';
import gql from 'graphql-tag';
import { Form } from 'react-final-form';
import { FormContent, FormActions, FormError, InputRow } from './styles/FormStyles';
import { TextButton } from './styles/ButtonStyles';
import FormInputField from './FormInputField';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(data: { email: $email, password: $password }) {
      id
      name
      email
      permissions
    }
  }
`;

class Signin extends Component {
  render() {
    return (
      <Mutation mutation={SIGNIN_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signin, { loading, error }) => (
          <Form onSubmit={formData => signin({ variables: formData })}>
            {({ handleSubmit, pristine, dirtySinceLastSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FormContent>
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
                    onClick={() => navigate('/request-reset')}
                    type="button"
                    disabled={loading}
                  >
                    Forgot password
                  </TextButton>
                  <TextButton disabled={pristine || loading}>Sign In</TextButton>
                </FormActions>
              </form>
            )}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
export { SIGNIN_MUTATION };
