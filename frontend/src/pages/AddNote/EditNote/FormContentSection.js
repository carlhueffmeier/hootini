import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import { navigate } from '@reach/router';
import { Field } from 'react-final-form';
import DeckSelect from '../DeckSelect';
import NoteTypeSelect from '../NoteTypeSelect';
import NoteInput from '../NoteInput';
import NotePreview from '../../../components/NotePreview';
import { css } from '../../../lib/utils';
import { FormContentContainer, HorizontalPartition } from './styles';
import SingleNoteType from '../../../components/SingleNoteType';
import { EditIcon } from '../../../shared/Icons';
import { IconButton } from '../../../shared/Buttons';

export default class FormContentSection extends Component {
  static propTypes = {
    isShifted: bool,
    values: object
  };

  render() {
    const { noteType } = this.props.values;
    return (
      <FormContentContainer isShifted={this.props.isShifted}>
        <HorizontalPartition>
          <div {...css({ maxWidth: '15rem', marginBottom: '2rem' })}>
            <div {...css({ marginBottom: '1rem' })}>
              <Field name="deck" component={DeckSelect} />
            </div>
            <Field name="noteType" component={NoteTypeSelect} />
          </div>
          <div {...css({ maxWidth: '30rem' })}>
            {noteType && <NoteInput noteTypeId={noteType.id} />}
          </div>
        </HorizontalPartition>
        <HorizontalPartition>
          {noteType && (
            <SingleNoteType id={noteType.id}>
              {({ data, loading, error }) => {
                if (loading) {
                  return 'Loading preview...';
                }
                if (error) {
                  return 'Error loading preview';
                }
                return (
                  <NotePreview
                    templates={data.NoteType.templates}
                    fields={this.props.values}
                    renderActions={({ activeTab }) => (
                      <IconButton
                        type="button"
                        onClick={() => {
                          navigate(
                            `/note-types/${data.NoteType.slug}#${activeTab}`
                          );
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  />
                );
              }}
            </SingleNoteType>
          )}
        </HorizontalPartition>
      </FormContentContainer>
    );
  }
}
