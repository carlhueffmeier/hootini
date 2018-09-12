import React, { Component } from 'react';
import { object } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DownshiftInput from './DownshiftInput';
import { Label, Item } from './styles/FormStyles';

const itemToString = type => type && type.name;

export default class DeckSelect extends Component {
  static propTypes = {
    input: object.isRequired,
    meta: object.isRequired
  };

  render() {
    return (
      <DownshiftInput
        {...this.props}
        itemToString={itemToString}
        inputProps={{ placeholder: 'Select a note type' }}
        renderLabel={({ getLabelProps }) => (
          <Label {...getLabelProps()}>Type</Label>
        )}
        renderMenu={({
          getItemProps,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <Query
            query={SEARCH_NOTETYPES}
            variables={{ name: inputValue || '' }}
          >
            {({ loading, error, data: { allNoteTypes = [] } = {} }) => {
              if (loading) {
                return <li>Loading...</li>;
              }
              if (error) {
                return <li>Error! {error.message}</li>;
              }
              return allNoteTypes.map((noteType, index) => (
                <Item
                  {...getItemProps({
                    key: noteType.id,
                    index,
                    item: noteType,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === noteType
                  })}
                >
                  {noteType.name}
                </Item>
              ));
            }}
          </Query>
        )}
      />
    );
  }
}

const SEARCH_NOTETYPES = gql`
  query allNoteTypes($name: String!) {
    allNoteTypes(where: { name: $name }) {
      id
      slug
      name
    }
  }
`;
