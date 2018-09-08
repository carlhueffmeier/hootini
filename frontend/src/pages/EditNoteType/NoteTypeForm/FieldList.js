import React, { Component } from 'react';
import styled from 'react-emotion';
import { FieldArray } from 'react-final-form-arrays';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FieldListItem from './FieldListItem';
import { TextButton } from '../../../shared/Buttons';
import shortid from 'shortid';
import * as colors from '../../../shared/colors';

const StyledList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  '& > li': {
    padding: 0
  },
  '& > li:not(:last-child)': {
    marginBottom: '0.5rem'
  }
});

export default class FieldList extends Component {
  onDragEnd = ({ dragInfo, fields }) => {
    const { destination, source, draggableId } = dragInfo;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Change position in FieldArray
    fields.move(source.index, destination.index);
  };

  render() {
    const { values } = this.props;
    return (
      <FieldArray name="fieldDefinitions">
        {({ fields }) => (
          <DragDropContext
            onDragEnd={dragInfo => this.onDragEnd({ dragInfo, fields })}
          >
            <Droppable droppableId="fieldDefinitions">
              {provided => (
                <StyledList
                  {...provided.droppableProps}
                  innerRef={provided.innerRef}
                >
                  {fields.map((name, index) => {
                    const uniqueKey =
                      (values.fieldDefinitions[index] || {}).id ||
                      String(index);
                    return (
                      <FieldListItem
                        key={uniqueKey}
                        uid={uniqueKey}
                        index={index}
                        name={`${name}.key`}
                        onRemove={() => fields.remove(index)}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <li>
                    <TextButton
                      type="button"
                      color={colors.good}
                      onClick={() =>
                        fields.push({
                          id: shortid.generate(),
                          key: ''
                        })
                      }
                    >
                      + New Field
                    </TextButton>
                  </li>
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </FieldArray>
    );
  }
}
