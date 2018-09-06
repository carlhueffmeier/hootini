import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import DeckSelect from '../DeckSelect';
import NoteTypeSelect from '../NoteTypeSelect';
import NoteInput from '../NoteInput';
import NotePreview from '../NotePreview';
import { css } from '../../../helper/utils';
import { Field } from 'react-final-form';

import { FormContentContainer, HorizontalPartition } from './styles';

export default class FormContentSection extends Component {
  static propTypes = {
    isShifted: bool,
    noteType: object,
    fieldValues: object
  };

  state = {
    noteType: null,
    fieldValues: {}
  };

  render() {
    return (
      <FormContentContainer isShifted={this.props.isShifted}>
        <HorizontalPartition>
          <div {...css({ maxWidth: '15rem', marginBottom: '2rem' })}>
            <div {...css({ marginBottom: '1rem' })}>
              <Field
                name="deck"
                component={DeckSelect}
                format={deck => deck && deck.name}
              />
            </div>
            <Field
              name="noteType"
              component={NoteTypeSelect}
              format={type => type && type.name}
            />
          </div>
          <div {...css({ maxWidth: '30rem' })}>
            {this.props.noteType && (
              <NoteInput noteTypeId={this.props.noteType.id} />
            )}
          </div>
        </HorizontalPartition>
        <HorizontalPartition>
          {this.props.noteType && (
            <NotePreview
              noteTypeId={this.props.noteType.id}
              fields={this.props.fieldValues}
            />
          )}
        </HorizontalPartition>
      </FormContentContainer>
    );
  }
}
