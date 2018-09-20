import React, { Component } from 'react';
import { object } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DownshiftInput from './DownshiftInput';
import { Label, Item } from './styles/FormStyles';

const SEARCH_DECKS_QUERY = gql`
  query allDecks($name: String!) {
    allDecks(where: { name: $name }) {
      id
      name
    }
  }
`;

const itemToString = deck => deck && deck.name;

class DeckSelect extends Component {
  static propTypes = {
    input: object.isRequired,
    meta: object.isRequired
  };

  render() {
    return (
      <DownshiftInput
        {...this.props}
        itemToString={itemToString}
        inputProps={{ placeholder: 'Select Deck' }}
        renderLabel={({ getLabelProps }) => <Label {...getLabelProps()}>Deck</Label>}
        renderMenu={({ getItemProps, inputValue, highlightedIndex, selectedItem }) => (
          <Query query={SEARCH_DECKS_QUERY} variables={{ name: inputValue || '' }}>
            {({ loading, error, data: { allDecks = [] } = {} }) => {
              if (loading) {
                return <li>Loading...</li>;
              }
              if (error) {
                return <li>Error! {error.message}</li>;
              }
              return allDecks.map((deck, index) => (
                <Item
                  {...getItemProps({
                    key: deck.id,
                    index,
                    item: deck,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === deck
                  })}
                >
                  {itemToString(deck)}
                </Item>
              ));
            }}
          </Query>
        )}
      />
    );
  }
}

export default DeckSelect;
export { SEARCH_DECKS_QUERY };
