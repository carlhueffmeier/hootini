import React, { Component, Fragment } from 'react';
import { object, func } from 'prop-types';
import { navigate } from '@reach/router';
import { Form } from 'react-final-form';
import { Button } from '../../components/styles/ButtonStyles';
import { EditIcon } from '../../components/Icons';
import { IconButton } from '../../components/styles/ButtonStyles';
import NotePreviewWithQuery from '../../components/NotePreviewWithQuery';
import EditSection from './EditSection';
import TwoPageLayout from '../../components/TwoPageLayout';

import styled from 'react-emotion';
import {
  OutlinedButton,
  TextButton
} from '../../components/styles/ButtonStyles';
import { VisuallyHidden } from '../../shared/styleHelper';

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

export default class EditNote extends Component {
  static propTypes = {
    onSubmit: func,
    initialValues: object
  };

  static defaultProps = {
    onSubmit: data => console.log('submitting 🧚‍', data)
  };

  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        initialValues={this.props.initialValues}
      >
        {({ handleSubmit, values, pristine }) => (
          <FullPageForm onSubmit={handleSubmit}>
            <TwoPageLayout>
              <TwoPageLayout.Left>
                {() => <EditSection values={values} />}
              </TwoPageLayout.Left>
              <TwoPageLayout.Right>
                {() =>
                  values.noteType && (
                    <NotePreviewWithQuery
                      noteTypeId={values.noteType.id}
                      values={values}
                      renderActions={({ activeTab, noteType }) => (
                        <IconButton
                          type="button"
                          onClick={() => {
                            navigate(
                              `/note-types/${noteType.slug}#${activeTab}`
                            );
                          }}
                        >
                          <VisuallyHidden>Edit Template</VisuallyHidden>
                          <EditIcon />
                        </IconButton>
                      )}
                    />
                  )
                }
              </TwoPageLayout.Right>
              <TwoPageLayout.Bottom>
                {({ isShifted, toggleShift }) => (
                  <Fragment>
                    <CancelButton type="button">Cancel</CancelButton>
                    <PreviewButton
                      type="button"
                      disabled={!values.noteType}
                      onClick={toggleShift}
                    >
                      {isShifted ? 'Input' : 'Preview'}
                    </PreviewButton>
                    <Button disabled={!values.noteType || pristine}>
                      Save
                    </Button>
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
