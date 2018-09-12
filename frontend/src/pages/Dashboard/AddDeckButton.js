import React, { Component, Fragment } from 'react';
import { FloatingActionButton } from '../../components/styles/ButtonStyles';
import { PlusIcon } from '../../components/Icons';
import { VisuallyHidden } from '../../shared/styleHelper';
import AddDeckDialog from './AddDeckDialog';

export default class AddDeckButton extends Component {
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
        <AddDeckDialog
          isOpen={this.state.isDialogShown}
          onDismiss={this.hideDialog}
          onSubmit={this.hideDialog}
        />
      </Fragment>
    );
  }
}
