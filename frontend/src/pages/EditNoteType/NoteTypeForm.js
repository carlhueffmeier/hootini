import React, { Component, Fragment } from 'react';
import { object, func } from 'prop-types';
import { Button } from '../../components/styles/ButtonStyles';
import { Form } from 'react-final-form';
import NotePreview from '../../components/NotePreview';
import TwoPageLayout from '../../components/TwoPageLayout';
import EditSection from './EditSection';
import arrayMutators from 'final-form-arrays';
import styled from 'react-emotion';
import {
  OutlinedButton,
  TextButton
} from '../../components/styles/ButtonStyles';

function path(path, obj) {
  return path.reduce((result, key) => result && result[key], obj);
}

const FullPageForm = styled('form')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const CancelButton = styled(TextButton)({
  marginRight: 'auto'
});

const PreviewButton = styled(OutlinedButton)({
  marginRight: '1rem'
});

export default class NoteTypeForm extends Component {
  static propTypes = {
    onSubmit: func,
    initialValues: object
  };

  static defaultProps = {
    initialValues: {},
    onSubmit: data => console.log('submitting 🧚‍', data)
  };

  state = {
    activeTemplateId: path(['initialValues', 'templates', 0, 'id'], this.props)
  };

  handleSelectTemplate = id => {
    this.setState({ activeTemplateId: id });
  };

  render() {
    const { onSubmit, initialValues } = this.props;
    const { activeTemplateId } = this.state;
    return (
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators
        }}
        initialValues={initialValues}
      >
        {({ handleSubmit, values, pristine }) => (
          <FullPageForm onSubmit={handleSubmit}>
            <TwoPageLayout>
              <TwoPageLayout.Left>
                {() => (
                  <EditSection
                    activeTemplateId={activeTemplateId}
                    onSelectTemplate={this.handleSelectTemplate}
                  />
                )}
              </TwoPageLayout.Left>
              <TwoPageLayout.Right>
                {() => (
                  <NotePreview
                    templates={values.templates}
                    fields={values}
                    activeTemplateId={activeTemplateId}
                    onSelectTemplate={this.handleSelectTemplate}
                  />
                )}
              </TwoPageLayout.Right>
              <TwoPageLayout.Bottom>
                {({ isShifted, toggleShift }) => (
                  <Fragment>
                    <CancelButton type="button">Cancel</CancelButton>
                    <PreviewButton type="button" onClick={toggleShift}>
                      {isShifted ? 'Input' : 'Preview'}
                    </PreviewButton>
                    <Button disabled={pristine}>Save</Button>
                  </Fragment>
                )}
              </TwoPageLayout.Bottom>
            </TwoPageLayout>
          </FullPageForm>
        )}
      </Form>
    );
  }
}
