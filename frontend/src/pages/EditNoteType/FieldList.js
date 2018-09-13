import React, { Component, Fragment } from 'react';
import ConnectedFieldArray from '../../components/ConnectedFieldArray';
import { TextButton } from '../../components/styles/ButtonStyles';
import {
  handleDragInFieldArray,
  getUniqueKey,
  addLocalId
} from '../../lib/utils';
import DraggableList from '../../components/DraggableList';
import DraggableListItem from '../../components/DraggableListItem';
import { navbarHeight } from '../../shared/dimensions';

export default class FieldList extends Component {
  render() {
    return (
      <ConnectedFieldArray name="fieldDefinitions">
        {({ values, fields }) => (
          <DraggableList
            onDragEnd={dragInfo => handleDragInFieldArray({ dragInfo, fields })}
          >
            {provided => (
              <Fragment>
                {fields.map((name, index) => {
                  const uniqueKey =
                    getUniqueKey(values.fieldDefinitions[index]) ||
                    String(index);
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
