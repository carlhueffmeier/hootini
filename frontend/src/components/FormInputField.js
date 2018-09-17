import React, { Component, Fragment } from 'react';
import { string } from 'prop-types';
import { Field } from 'react-final-form';
import { Input, Label } from './styles/FormStyles';
import styled from 'react-emotion';

const MetaError = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.colors.danger
}));

export default class FormInputField extends Component {
  static propTypes = {
    name: string.isRequired,
    label: string
  };

  render() {
    const { label, name, ...inputProps } = this.props;
    return (
      <Field name={name}>
        {({ input, meta }) => (
          <Fragment>
            {label && <Label>{label}</Label>}
            <Input {...input} {...inputProps} />
            {meta.touched && meta.error && <MetaError>{meta.error}</MetaError>}
          </Fragment>
        )}
      </Field>
    );
  }
}
