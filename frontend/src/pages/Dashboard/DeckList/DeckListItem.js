import React, { Component } from 'react';
import { string, number } from 'prop-types';
import styled from 'react-emotion';
import * as colors from '../../../shared/colors';
import * as typography from '../../../shared/typography';

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
});

const DeckName = styled('span')({
  ...typography.h4,
  color: colors.textDark,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const Info = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 1rem'
});

const InfoRow = styled('span')({
  ...typography.caption,
  color: colors.textDark,
  whiteSpace: 'nowrap'
});

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
