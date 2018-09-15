import React, { Component, Fragment } from 'react';
import { object, func, bool, string } from 'prop-types';
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
    onSubmit: func.isRequired,
    initialValues: object,
    loading: bool.isRequired,
    error: object
  };

  static defaultProps = {
    initialValues: {}
  };

  state = {
    activeTab:
      path(['initialValues', 'templates', 'length'], this.props) > 0 ? 0 : null
  };

  setActiveTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { onSubmit, initialValues, loading } = this.props;
    const { activeTab } = this.state;
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
                    activeTab={activeTab}
                    onSelectTab={this.setActiveTab}
                  />
                )}
              </TwoPageLayout.Left>
              <TwoPageLayout.Right>
                {() => (
                  <NotePreview
                    templates={values.templates}
                    fields={values}
                    activeTab={activeTab}
                    onSelectTab={this.setActiveTab}
                  />
                )}
              </TwoPageLayout.Right>
              <TwoPageLayout.Bottom>
                {({ isShiftable, isShifted, toggleShift }) => (
                  <Fragment>
                    <CancelButton type="button">Cancel</CancelButton>
                    {isShiftable && (
                      <PreviewButton type="button" onClick={toggleShift}>
                        {isShifted ? 'Input' : 'Preview'}
                      </PreviewButton>
                    )}
                    <Button disabled={pristine || loading}>Save</Button>
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
