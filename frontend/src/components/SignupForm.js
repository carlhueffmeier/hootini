import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Input, Label } from './styles/FormStyles';
import { TextButton } from './styles/ButtonStyles';
import styled from 'react-emotion';

const FormContent = styled('div')({
  margin: '0 1rem 1rem 1rem'
});

const FormActions = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end'
});

const MetaError = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.colors.danger
}));

const Error = styled('div')(({ theme }) => ({
  ...theme.typography.caption,
  background: theme.colors.lightGrey1,
  color: theme.colors.danger,
  padding: '0.5rem',
  margin: '1rem',
  textAlign: 'center'
}));

function validateDeckName(name) {
  if (!name || name.trim().length === 0) {
    return 'Required';
  }
}

export default class SignupForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired
  };

  render() {
    const { onSubmit, loading, error } = this.props;
    return (
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, pristine, dirtySinceLastSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormContent>
              <Field name="name">
                {({ input, meta }) => (
                  <Fragment>
                    <Label>Name</Label>
                    <Input {...input} placeholder="Name" required />
                    {meta.touched &&
                      meta.error && <MetaError>{meta.error}</MetaError>}
                  </Fragment>
                )}
              </Field>
              <Field name="email">
                {({ input, meta }) => (
                  <Fragment>
                    <Label>Email</Label>
                    <Input
                      {...input}
                      type="email"
                      placeholder="Email"
                      required
                    />
                    {meta.touched &&
                      meta.error && <MetaError>{meta.error}</MetaError>}
                  </Fragment>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <Fragment>
                    <Label>Password</Label>
                    <Input
                      {...input}
                      type="password"
                      placeholder="Password"
                      required
                    />
                    {meta.touched &&
                      meta.error && <MetaError>{meta.error}</MetaError>}
                  </Fragment>
                )}
              </Field>
              {error && !dirtySinceLastSubmit && <Error>{error.message}</Error>}
            </FormContent>
            <FormActions>
              <TextButton disabled={pristine || loading}>Sign Up</TextButton>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}
