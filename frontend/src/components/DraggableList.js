import React, { Component } from 'react';
import { func, node } from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import shortid from 'shortid';
import { StyledList } from './styles/DraggableListStyles';

export default class DraggableList extends Component {
  static propTypes = {
    onDragEnd: func.isRequired,
    renderTabs: node,
    renderActions: node
  };

  static defaultProps = {
    droppableId: shortid.generate()
  };

  render() {
    const { onDragEnd, droppableId, children } = this.props;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {provided => (
            <StyledList
              {...provided.droppableProps}
              innerRef={provided.innerRef}
            >
              {children(provided)}
            </StyledList>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
