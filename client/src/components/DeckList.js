import React, { Component } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import DeckListItem from './DeckListItem';
import { StyledList, ListItem, ListItemLink } from './styles/DeckListStyles';

class DeckListView extends Component {
  static propTypes = {
    decks: arrayOf(
      shape({
        name: string.isRequired,
        slug: string.isRequired,
        cardsDue: number.isRequired,
        cardsTotal: number.isRequired
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
              <DeckListItem name={deck.name} dueCount={deck.cardsDue} cardCount={deck.cardsTotal} />
            </ListItemLink>
          </ListItem>
        ))}
      </StyledList>
    );
  }
}

export default DeckListView;
