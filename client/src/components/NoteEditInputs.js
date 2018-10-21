import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import { Field } from 'react-final-form';
import styled from 'react-emotion';
import DeckSelect from './DeckSelect';
import NoteTypeSelect from './NoteTypeSelect';
import NoteFieldEdit from './NoteFieldEdit';
import { TextButton } from './styles/ButtonStyles';
import { EditIcon } from './Icons';
import { navigate } from '@reach/router';

const EditSectionStyles = styled('div')({
  flex: 1
});

const SelectRow = styled('div')({
  display: 'flex',
  marginBottom: '1rem',
  alignItems: 'flex-end',
  '& > div:first-child': {
    maxWidth: '15rem'
  }
});

const StyledTextButton = styled(TextButton)({
  marginLeft: '1rem'
});

const NoteFieldEditWrapper = styled('div')({
  maxWidth: '30rem',
  marginTop: '3rem'
});

class NoteEditInputs extends Component {
  static propTypes = {
    isShifted: bool,
    values: object
  };

  render() {
    const { noteType } = this.props.values;
    return (
      <EditSectionStyles>
        <SelectRow>
          <Field name="deck" component={DeckSelect} />
        </SelectRow>
        <SelectRow>
          <Field name="noteType" component={NoteTypeSelect} />
          {noteType && (
            <StyledTextButton
              iconLeft
              type="button"
              onClick={() => navigate(`/note-types/${noteType.slug}`)}
            >
              <EditIcon />
              Edit
            </StyledTextButton>
          )}
        </SelectRow>
        <NoteFieldEditWrapper>
          {noteType && <NoteFieldEdit noteTypeId={noteType.id} />}
        </NoteFieldEditWrapper>
      </EditSectionStyles>
    );
  }
}

export default NoteEditInputs;
