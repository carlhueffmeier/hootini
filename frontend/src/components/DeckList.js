import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import DeckListItem from './DeckListItem';
import { StyledList, ListItem, ListItemLink } from './styles/DeckListStyles';

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
