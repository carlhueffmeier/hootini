import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { Button } from '../../../shared/Buttons';
import {
  FullPageForm,
  FormButtonContainer,
  CancelButton,
  PreviewButton
} from './styles';
import { Form, FormSpy } from 'react-final-form';
import FormContentSection from './FormContentSection';

export default class EditNote extends Component {
  static propTypes = {
    onSubmit: func,
    initialValues: object
  };

  static defaultProps = {
    onSubmit: data => console.log('submitting 🧚‍', data)
  };

  state = {
    isShifted: false,
    values: {}
  };

  handleChange = ({ values }) => {
    this.setState({ values });
  };

  handleShift = () => {
    this.setState(state => ({ isShifted: !state.isShifted }));
  };

  render() {
    const { deck, noteType, ...fieldValues } = this.state.values;
    return (
      <Form
        onSubmit={this.props.onSubmit}
        initialValues={this.props.initialValues}
      >
        {({ handleSubmit, pristine }) => (
          <FullPageForm onSubmit={handleSubmit}>
            <FormSpy
              subscription={{ values: true }}
              onChange={this.handleChange}
            />
            <FormContentSection
              isShifted={this.state.isShifted}
              noteType={noteType}
              fieldValues={fieldValues}
            />
            <FormButtonContainer>
              <CancelButton type="button">Cancel</CancelButton>
              <PreviewButton
                type="button"
                disabled={!noteType}
                onClick={this.handleShift}
              >
                {this.state.isShifted ? 'Input' : 'Preview'}
              </PreviewButton>
              <Button disabled={!noteType}>Save</Button>
            </FormButtonContainer>
          </FullPageForm>
        )}
      </Form>
    );
  }
}
