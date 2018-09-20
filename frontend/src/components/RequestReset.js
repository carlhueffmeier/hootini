import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Form } from 'react-final-form';
import { FormContent, FormActions, FormError } from './styles/FormStyles';
import { TextButton } from './styles/ButtonStyles';
import FormInputField from './FormInputField';

const REQUEST_RESET_MUTATION = gql`
  mutation requestReset($email: String!) {
    requestReset(data: { email: $email }) {
      message
    }
  }
`;

class RequestReset extends Component {
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION}>
        {(requestReset, { loading, error }) => (
          <Form
            onSubmit={formData => requestReset({ variables: formData })}
            initialValues={this.props.initialValues}
          >
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
                  {error && !dirtySinceLastSubmit && <FormError>{error.message}</FormError>}
                </FormContent>
                <FormActions>
                  <TextButton disabled={pristine || loading}>Request Reset</TextButton>
                </FormActions>
              </form>
            )}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
export { REQUEST_RESET_MUTATION };
