import React, { Component } from 'react';
import styled from 'react-emotion';
import { FlatButton } from './styles/ButtonStyles';

const ButtonBox = styled('div')({
  position: 'fixed',
  bottom: '5rem',
  display: 'flex',
  justifyContent: 'space-between',
  width: '90vw',
  maxWidth: 400,
  '& > button': {
    width: '5rem'
  }
});

class ReviewAnswerButtons extends Component {
  static defaultProps = {
    onAnswer: answer => console.log(answer)
  };

  handleClick = event => {
    this.props.onAnswer(event.target.name);
  };

  render() {
    const { onAnswer: _, ...buttonProps } = this.props;

    return (
      <ButtonBox>
        <FlatButton
          {...buttonProps}
          name="REPEAT"
          onClick={this.handleClick}
          backgroundColor="danger"
        >
          No idea
        </FlatButton>
        <FlatButton
          {...buttonProps}
          name="HARD"
          onClick={this.handleClick}
          backgroundColor="warning"
        >
          Hard
        </FlatButton>
        <FlatButton {...buttonProps} name="OK" onClick={this.handleClick} backgroundColor="good">
          OK
        </FlatButton>
        <FlatButton {...buttonProps} name="EASY" onClick={this.handleClick} backgroundColor="easy">
          Easy
        </FlatButton>
      </ButtonBox>
    );
  }
}

export default ReviewAnswerButtons;
