import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormSpy, Field } from 'react-final-form';

export default class NoteInputForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    onChange: () => {}
  };

  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        {({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <FormSpy
              subscription={{ values: true }}
              onChange={this.props.onChange}
            />
            {this.props.fieldDefinitions.map(({ key, type }) => (
              <Field name={key} key={key}>
                {({ input, meta }) => (
                  <div>
                    <label>
                      {key} ({type})
                    </label>
                    <textarea {...input} />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            ))}
            <button type="submit" disabled={pristine}>
              Add
            </button>
          </form>
        )}
      </Form>
    );
  }
}
