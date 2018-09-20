import React, { Component, Fragment } from 'react';
import ConnectedFieldArray from './ConnectedFieldArray';
import { TextButton } from './styles/ButtonStyles';
import { handleDragInFieldArray, getUniqueKey, addLocalId } from '../lib/utils';
import DraggableList from './DraggableList';
import DraggableListItem from './DraggableListItem';
import { navbarHeight } from '../shared/dimensions';

class NoteTypeFieldList extends Component {
  render() {
    return (
      <ConnectedFieldArray name="fieldDefinitions">
        {({ values, fields }) => (
          <DraggableList onDragEnd={dragInfo => handleDragInFieldArray({ dragInfo, fields })}>
            {provided => (
              <Fragment>
                {fields.map((name, index) => {
                  const uniqueKey = getUniqueKey(values.fieldDefinitions[index]) || String(index);
                  return (
                    <DraggableListItem
                      key={uniqueKey}
                      uniqueKey={uniqueKey}
                      index={index}
                      name={`${name}.key`}
                      offset={{ y: -navbarHeight }}
                      onRemove={() => fields.remove(index)}
                    />
                  );
                })}
                {provided.placeholder}
                <li>
                  <TextButton
                    type="button"
                    textColor="good"
                    onClick={() =>
                      fields.push({
                        ...addLocalId(),
                        key: ''
                      })
                    }
                  >
                    + Add
                  </TextButton>
                </li>
              </Fragment>
            )}
          </DraggableList>
        )}
      </ConnectedFieldArray>
    );
  }
}

export default NoteTypeFieldList;
