import React, { Component, Fragment } from 'react';
import { string } from 'prop-types';
import styled from 'react-emotion';
import { Field } from 'react-final-form';
import { Label, Textarea, Input } from '../../components/styles/FormStyles';

const TemplateInputFieldStyles = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
});

const InputRow = styled('div')({
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  '& > textarea': {
    maxWidth: '30rem'
  },
  '& > input': {
    maxWidth: '15rem'
  }
});

export default class TemplateInputField extends Component {
  static propTypes = {
    name: string.isRequired
  };

  render() {
    const { name } = this.props;
    return (
      <TemplateInputFieldStyles>
        <Field name={`${name}.name`}>
          {({ input, meta }) => (
            <InputRow>
              <Label>Name</Label>
              <Input {...input} placeholder="Template name" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </InputRow>
          )}
        </Field>
        <Field name={`${name}.front`}>
          {({ input, meta }) => (
            <InputRow>
              <Label>Front</Label>
              <Textarea {...input} rows="4" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </InputRow>
          )}
        </Field>
        <Field name={`${name}.back`}>
          {({ input, meta }) => (
            <InputRow>
              <Label>Back</Label>
              <Textarea {...input} rows="4" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </InputRow>
          )}
        </Field>
      </TemplateInputFieldStyles>
    );
  }
}
