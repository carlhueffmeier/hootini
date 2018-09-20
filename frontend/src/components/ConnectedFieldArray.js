import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormSpy } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

class ConnectedFieldArray extends Component {
  static propTypes = {
    name: string.isRequired
  };

  render() {
    const { name, children } = this.props;
    return (
      <FormSpy subscription={{ values: true }}>
        {({ values }) => (
          <FieldArray name={name}>{({ fields }) => children({ values, fields })}</FieldArray>
        )}
      </FormSpy>
    );
  }
}

export default ConnectedFieldArray;
