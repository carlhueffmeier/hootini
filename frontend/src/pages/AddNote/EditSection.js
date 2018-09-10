import React, { Component, Fragment } from 'react';
import { bool, object } from 'prop-types';
import { Field } from 'react-final-form';
import DeckSelect from '../../components/DeckSelect';
import NoteTypeSelect from '../../components/NoteTypeSelect';
import NoteInput from './NoteFieldInputArea';
import { css } from '../../lib/utils';

export default class EditSection extends Component {
  static propTypes = {
    isShifted: bool,
    values: object
  };

  render() {
    const { noteType } = this.props.values;
    return (
      <Fragment>
        <div {...css({ maxWidth: '15rem', marginBottom: '2rem' })}>
          <div {...css({ marginBottom: '1rem' })}>
            <Field name="deck" component={DeckSelect} />
          </div>
          <Field name="noteType" component={NoteTypeSelect} />
        </div>
        <div {...css({ maxWidth: '30rem' })}>
          {noteType && <NoteInput noteTypeId={noteType.id} />}
        </div>
      </Fragment>
    );
  }
}
