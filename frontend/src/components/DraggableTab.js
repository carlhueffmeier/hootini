import React, { Component } from 'react';
import { string, number, func, bool, node } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { TabbarItem } from './styles/TabStyles';
import { TabButton } from './styles/ButtonStyles';

export default class DraggableTab extends Component {
  static propTypes = {
    uniqueKey: string.isRequired,
    index: number.isRequired,
    onClick: func,
    isActive: bool,
    children: node
  };

  static defaultProps = {
    onClick: () => {},
    isActive: false
  };

  render() {
    const { uniqueKey, index, onClick, isActive, children } = this.props;
    return (
      <Draggable
        disableInteractiveElementBlocking
        key={uniqueKey}
        draggableId={uniqueKey}
        index={index}
      >
        {provided => (
          <TabbarItem
            {...provided.draggableProps}
            innerRef={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <TabButton type="button" onClick={onClick} isActive={isActive}>
              {children}
            </TabButton>
          </TabbarItem>
        )}
      </Draggable>
    );
  }
}
