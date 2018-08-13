import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Downshift from 'downshift';

export default class DeckSelect extends Component {
  static defaultProps = {
    defaultSelectedItem: null,
    onChange: () => {}
  };

  render() {
    return (
      <Downshift
        onChange={this.props.onChange}
        itemToString={deck => (deck ? deck.name : '')}
        defaultSelectedItem={this.props.defaultSelectedItem}
      >
        {({
          inputValue,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen
        }) => (
          <div>
            <label {...getLabelProps()}>Deck</label>
            <input {...getInputProps()} />
            <button {...getToggleButtonProps()}>V</button>
            <ul {...getMenuProps()}>
              {isOpen && (
                <Query query={SEARCH_DECKS} variables={{ name: inputValue }}>
                  {({ loading, error, data: { allDecks = [] } = {} }) => {
                    if (loading) {
                      return <li>Loading...</li>;
                    }
                    if (error) {
                      return <li>Error! {error.message}</li>;
                    }
                    return allDecks.map((deck, index) => (
                      <li
                        {...getItemProps({
                          key: deck.id,
                          index,
                          item: deck
                        })}
                      >
                        {deck.name}
                      </li>
                    ));
                  }}
                </Query>
              )}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}

const SEARCH_DECKS = gql`
  query allDecks($name: String!) {
    allDecks(where: { name: $name }) {
      id
      name
    }
  }
`;
