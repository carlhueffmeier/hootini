import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { Button } from '../../../shared/Buttons';
import {
  FullPageForm,
  FormButtonContainer,
  CancelButton,
  PreviewButton
} from './styles';
import { Form } from 'react-final-form';
import FormContentSection from './FormContentSection';
import arrayMutators from 'final-form-arrays';

export default class NoteTypeForm extends Component {
  static propTypes = {
    onSubmit: func,
    initialValues: object
  };

  static defaultProps = {
    onSubmit: data => console.log('submitting 🧚‍', data)
  };

  state = {
    isShifted: false
  };

  handleShift = () => {
    this.setState(state => ({ isShifted: !state.isShifted }));
  };

  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        mutators={{
          ...arrayMutators
        }}
        initialValues={this.props.initialValues}
      >
        {({ handleSubmit, mutators, values, pristine }) => (
          <FullPageForm onSubmit={handleSubmit}>
            <FormContentSection
              isShifted={this.state.isShifted}
              values={values}
              mutators={mutators}
            />
            <FormButtonContainer>
              <CancelButton type="button">Cancel</CancelButton>
              <PreviewButton type="button" onClick={this.handleShift}>
                {this.state.isShifted ? 'Input' : 'Preview'}
              </PreviewButton>
              <Button disabled={pristine}>Save</Button>
            </FormButtonContainer>
          </FullPageForm>
        )}
      </Form>
    );
  }
}
