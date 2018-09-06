import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Link } from '@reach/router';
import styled from 'react-emotion';
import * as colors from '../../../shared/colors';
import DeckListItem from './DeckListItem';

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0
});

const ListItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  height: '8rem',
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.lightGrey1}`
  }
});

const ListItemLink = styled(Link)({
  width: '100%',
  display: 'flex',
  '&:link, &:visited': {
    textDecoration: 'none'
  }
});

export default class DeckListView extends Component {
  static propTypes = {
    decks: arrayOf(
      shape({
        name: string.isRequired,
        slug: string.isRequired
      })
    )
  };

  render() {
    const { decks } = this.props;
    return (
      <StyledList>
        {decks.map((deck, index) => (
          <ListItem key={index}>
            <ListItemLink to={`/deck/${deck.slug}`}>
              <DeckListItem name={deck.name} dueCount={18} cardCount={2065} />
            </ListItemLink>
          </ListItem>
        ))}
      </StyledList>
    );
  }
}
