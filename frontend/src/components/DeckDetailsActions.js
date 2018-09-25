import React, { Component } from 'react';
import styled from 'react-emotion';
import { navigate } from '@reach/router';
import { Button, OutlinedButton } from './styles/ButtonStyles';
import TimeSelector from './TimeSelect';

const StyledDeckActions = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const Message = styled('h3')(({ theme }) => ({
  ...theme.typography.h6,
  textAlign: 'center'
}));

const StartReviewBox = styled('div')({
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  Button: {
    marginBottom: '0.5rem'
  }
});

class DeckDetailsActions extends Component {
  handleAddNote = () => {
    navigate(`/deck/${this.props.deck.slug}/add-note`);
  };

  handleStartReview = () => {
    navigate(`/deck/${this.props.deck.slug}/review`);
  };

  render() {
    const { deck } = this.props;
    return (
      <StyledDeckActions>
        {deck.cardsDue === 0 && (
          <Message>
            All reviews done{' '}
            <span role="img" aria-label="thumbs up">
              👍
            </span>
          </Message>
        )}
        <OutlinedButton large onClick={this.handleAddNote}>
          Add Note
        </OutlinedButton>
        {deck.cardsDue > 0 && (
          <StartReviewBox>
            <Button large onClick={this.handleStartReview}>
              Start Review
            </Button>
            <TimeSelector />
          </StartReviewBox>
        )}
      </StyledDeckActions>
    );
  }
}

export default DeckDetailsActions;
