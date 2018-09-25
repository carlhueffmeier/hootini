import React, { Component } from 'react';
import { object } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DownshiftInput from './DownshiftInput';
import { Label, Item } from './styles/FormStyles';

const SEARCH_NOTETYPES_QUERY = gql`
  query allNoteTypes($name: String!) {
    allNoteTypes(where: { name: $name }) {
      id
      slug
      name
    }
  }
`;

const itemToString = type => type && type.name;

class NoteTypeSelect extends Component {
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
        renderLabel={({ getLabelProps }) => <Label {...getLabelProps()}>Type</Label>}
        renderMenu={({ getItemProps, inputValue, highlightedIndex, selectedItem }) => (
          <Query query={SEARCH_NOTETYPES_QUERY} variables={{ name: inputValue || '' }}>
            {({ loading, error, data: { allNoteTypes = [] } = {} }) => {
              if (loading) {
                return <li>Loading...</li>;
              }
              if (error) {
                return <p>Error! {error.message}</p>;
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

export default NoteTypeSelect;
export { SEARCH_NOTETYPES_QUERY };
