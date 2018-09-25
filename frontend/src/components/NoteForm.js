import React, { Component, Fragment } from 'react';
import { object, func } from 'prop-types';
import { navigate } from '@reach/router';
import { Form } from 'react-final-form';
import { Button } from './styles/ButtonStyles';
import { EditIcon } from './Icons';
import { IconButton } from './styles/ButtonStyles';
import NotePreviewWithQuery from './NotePreviewWithQuery';
import EditSection from './NoteEditInputs';
import TwoPageLayout from './TwoPageLayout';
import styled from 'react-emotion';
import { OutlinedButton, TextButton } from './styles/ButtonStyles';
import { VisuallyHidden } from '../shared/styleHelper';

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

class NoteForm extends Component {
  static propTypes = {
    onSubmit: func,
    initialValues: object
  };

  static defaultProps = {
    onSubmit: data => console.log('submitting 🧚‍', data)
  };

  render() {
    const { onSubmit, initialValues, loading } = this.props;
    return (
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, values, pristine, form }) => (
          <FullPageForm
            onSubmit={event => {
              handleSubmit(event);
              form.reset({ deck: values.deck, noteType: values.noteType });
            }}
          >
            <TwoPageLayout>
              <TwoPageLayout.Left>{() => <EditSection values={values} />}</TwoPageLayout.Left>
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
                            navigate(`/note-types/${noteType.slug}#tab${activeTab}`);
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
                {({ isShiftable, isShifted, toggleShift }) => (
                  <Fragment>
                    <CancelButton type="button" onClick={() => navigate('./')}>
                      Go Back
                    </CancelButton>
                    {isShiftable && (
                      <PreviewButton
                        type="button"
                        disabled={!values.noteType}
                        onClick={toggleShift}
                      >
                        {isShifted ? 'Input' : 'Preview'}
                      </PreviewButton>
                    )}
                    <Button disabled={!values.noteType || pristine || loading}>Save</Button>
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

export default NoteForm;
