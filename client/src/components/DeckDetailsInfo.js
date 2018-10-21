import React, { Component, Fragment } from 'react';
import { number, shape } from 'prop-types';
import styled from 'react-emotion';

const StyledDeckInfo = styled('div')({
  margin: '2rem 0 8rem',
  display: 'flex',
  flexDirection: 'column'
});

const Stat = styled('h3')(({ theme }) => ({
  ...theme.typography.h3,
  textAlign: 'center',
  margin: '1rem 0'
}));

const Message = styled('h3')(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: 'center'
}));

class DeckDetailsInfo extends Component {
  static propTypes = {
    deck: shape({
      cardsTotal: number.isRequired,
      cardsDue: number.isRequired
    })
  };
  render() {
    const { deck } = this.props;
    return (
      <StyledDeckInfo>
        {deck.cardsTotal === 0 ? (
          <Message>
            Go ahead and add some notes{' '}
            <span role="img" aria-label="sparkle">
              ✨
            </span>
          </Message>
        ) : (
          <Fragment>
            <Stat>TOTAL: {deck.cardsTotal}</Stat>
            <Stat>DUE: {deck.cardsDue}</Stat>
          </Fragment>
        )}
      </StyledDeckInfo>
    );
  }
}

export default DeckDetailsInfo;
