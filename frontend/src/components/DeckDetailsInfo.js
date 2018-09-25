import React, { Component } from 'react';
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
        <Stat>TOTAL: {deck.cardsTotal}</Stat>
        <Stat>DUE: {deck.cardsDue}</Stat>
      </StyledDeckInfo>
    );
  }
}

export default DeckDetailsInfo;
