import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Input } from '../../components/styles/FormStyles';
import { VisuallyHidden } from '../../shared/styleHelper';
import { TextButton } from '../../components/styles/ButtonStyles';
import styled from 'react-emotion';

const HiddenLabel = VisuallyHidden.withComponent('label');

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

export default class AddDeckForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired
  };

  render() {
    const { onSubmit, initialValues, loading, error } = this.props;
    return (
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, values, pristine, dirtySinceLastSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormContent>
              <Field name="name" validate={validateDeckName}>
                {({ input, meta }) => (
                  <Fragment>
                    <HiddenLabel>Deck name</HiddenLabel>
                    <Input {...input} placeholder="Deck name" required />
                    {meta.touched &&
                      meta.error && <MetaError>{meta.error}</MetaError>}
                  </Fragment>
                )}
              </Field>
              {error && !dirtySinceLastSubmit && <Error>{error.message}</Error>}
            </FormContent>
            <FormActions>
              <TextButton disabled={pristine || loading}>
                {values.id ? 'Save' : 'Create'}
              </TextButton>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}
