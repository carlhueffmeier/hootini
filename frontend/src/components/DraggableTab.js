import React, { Component } from 'react';
import { string, number, func, bool, node, shape } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { TabbarItem } from './styles/TabStyles';
import { TabButton } from './styles/ButtonStyles';

export default class DraggableTab extends Component {
  static propTypes = {
    uniqueKey: string.isRequired,
    index: number.isRequired,
    onClick: func,
    isActive: bool,
    children: node,
    offset: shape({
      x: number,
      y: number
    })
  };

  static defaultProps = {
    onClick: () => {},
    isActive: false
  };

  correctOffset(draggableProps) {
    if (!this.props.offset) {
      return draggableProps;
    }
    const { x = 0, y = 0 } = this.props.offset;
    return {
      ...draggableProps,
      style: {
        ...draggableProps.style,
        top: draggableProps.style.top + y,
        left: draggableProps.style.left + x
      }
    };
  }

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
            {...this.correctOffset(provided.draggableProps)}
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
