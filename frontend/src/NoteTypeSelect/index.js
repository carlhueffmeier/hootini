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
        itemToString={noteType => (noteType ? noteType.name : '')}
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
            <label {...getLabelProps()}>Type</label>
            <input {...getInputProps()} />
            <button {...getToggleButtonProps()}>V</button>
            <ul {...getMenuProps()}>
              {isOpen && (
                <Query
                  query={SEARCH_NOTETYPES}
                  variables={{ name: inputValue }}
                >
                  {({ loading, error, data: { allNoteTypes = [] } = {} }) => {
                    if (loading) {
                      return <li>Loading...</li>;
                    }
                    if (error) {
                      return <li>Error! {error.message}</li>;
                    }
                    return allNoteTypes.map((noteType, index) => (
                      <li
                        {...getItemProps({
                          key: noteType.id,
                          index,
                          item: noteType
                        })}
                      >
                        {noteType.name}
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

const SEARCH_NOTETYPES = gql`
  query allNoteTypes($name: String!) {
    allNoteTypes(where: { name: $name }) {
      id
      name
    }
  }
`;
