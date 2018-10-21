import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import styled from 'react-emotion';
import DeckCreateForm from './DeckCreateForm';

const StyledDialogOverlay = styled(DialogOverlay)({
  background: 'hsla(0, 0, 30%, 0.5)',
  backdropFilter: 'blur(2px)'
});

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '0.5rem',
  width: '80vw',
  maxWidth: '30rem',
  display: 'flex',
  background: theme.colors.backgroundLight1,
  flexDirection: 'column',
  borderRadius: 2,
  boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.3), 0px 15px 12px rgba(0, 0, 0, 0.22)',
  '@media (min-width: 768px)': {
    width: '50vw'
  }
}));

const DialogTitle = styled('h6')(({ theme }) => ({
  ...theme.typography.h6,
  margin: '1rem'
}));

class DeckCreateDialog extends Component {
  static propTypes = {
    isOpen: bool.isRequired,
    onDismiss: func.isRequired
  };

  render() {
    const { isOpen, onDismiss } = this.props;
    return (
      <StyledDialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
        <StyledDialogContent>
          <DialogTitle>Create new deck</DialogTitle>
          <DeckCreateForm />
        </StyledDialogContent>
      </StyledDialogOverlay>
    );
  }
}

export default DeckCreateDialog;
