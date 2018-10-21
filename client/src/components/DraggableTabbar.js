import React, { Component } from 'react';
import { func, node } from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Tabbar } from './styles/TabStyles';

class DraggableTabbar extends Component {
  static propTypes = {
    onDragEnd: func.isRequired,
    renderTabs: node,
    renderActions: node
  };

  render() {
    const { onDragEnd, renderTabs, renderActions } = this.props;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tabbar" direction="horizontal">
          {provided => (
            <Tabbar {...provided.droppableProps} innerRef={provided.innerRef}>
              {renderTabs}
              {provided.placeholder}
              {renderActions}
            </Tabbar>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DraggableTabbar;
