import React, { Component } from 'react';
import { string, number } from 'prop-types';
import { Container, DeckName, Info, InfoRow } from './styles/DeckListStyles';

export default class DeckListItem extends Component {
  static propTypes = {
    name: string.isRequired,
    dueCount: number.isRequired,
    cardCount: number.isRequired
  };

  render() {
    const { name, dueCount, cardCount } = this.props;
    return (
      <Container>
        <DeckName>{name}</DeckName>
        <Info>
          <InfoRow>{dueCount} due</InfoRow>
          <InfoRow>{cardCount} cards</InfoRow>
        </Info>
      </Container>
    );
  }
}
