import React, { Component } from 'react';
import { string } from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Form } from 'react-final-form';
import { FormContent, FormActions, FormError, InputRow } from './styles/FormStyles';
import { TextButton } from './styles/ButtonStyles';
import FormInputField from './FormInputField';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(
      data: { resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword }
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: string.isRequired
  };

  render() {
    const { resetToken } = this.props;
    return (
      <Mutation mutation={RESET_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(reset, { loading, error }) => (
          <Form onSubmit={formData => reset({ variables: { resetToken, ...formData } })}>
            {({ handleSubmit, pristine, dirtySinceLastSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FormContent>
                  <InputRow>
                    <FormInputField
                      label="Password"
                      name="password"
                      placeholder="Confirm Password"
                      type="password"
                      required
                    />
                  </InputRow>
                  <InputRow>
                    <FormInputField
                      label="Confirm Password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      required
                    />
                  </InputRow>
                  {error && !dirtySinceLastSubmit && <FormError>{error.message}</FormError>}
                </FormContent>
                <FormActions>
                  <TextButton disabled={pristine || loading}>Reset Password</TextButton>
                </FormActions>
              </form>
            )}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Reset;
export { RESET_MUTATION };
