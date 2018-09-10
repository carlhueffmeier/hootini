import React, { Component, Fragment } from 'react';
import { string } from 'prop-types';
import styled from 'react-emotion';
import { Field } from 'react-final-form';
import { Label, Textarea } from '../../components/styles/FormStyles';

const TemplateInputFieldStyles = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '& > label': {
    marginTop: '0.5rem'
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
        <Field name={`${name}.front`}>
          {({ input, meta }) => (
            <Fragment>
              <Label>Front</Label>
              <Textarea {...input} rows="4" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </Fragment>
          )}
        </Field>
        <Field name={`${name}.back`}>
          {({ input, meta }) => (
            <Fragment>
              <Label>Back</Label>
              <Textarea {...input} rows="4" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </Fragment>
          )}
        </Field>
      </TemplateInputFieldStyles>
    );
  }
}
