import React, { Component, Fragment } from 'react';
import { FloatingActionButton } from './styles/ButtonStyles';
import { PlusIcon } from './Icons';
import { VisuallyHidden } from '../shared/styleHelper';
import DeckCreateDialog from './DeckCreateDialog';

class DeckCreateButton extends Component {
  state = {
    isDialogShown: false
  };

  showDialog = () => {
    this.setState({ isDialogShown: true });
  };

  hideDialog = () => {
    this.setState({ isDialogShown: false });
  };

  render() {
    return (
      <Fragment>
        <FloatingActionButton onClick={this.showDialog}>
          <VisuallyHidden>Add Deck</VisuallyHidden>
          <PlusIcon />
        </FloatingActionButton>
        <DeckCreateDialog
          isOpen={this.state.isDialogShown}
          onDismiss={this.hideDialog}
          onSubmit={this.hideDialog}
        />
      </Fragment>
    );
  }
}

export default DeckCreateButton;
