import React, { Component } from 'react';
import { number, string, func, shape } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Field } from 'react-final-form';
import { DragHandleIcon, XIcon } from './Icons';
import { Input } from './styles/FormStyles';
import { RoundIconButton } from './styles/ButtonStyles';
import { StyledListItem } from './styles/DraggableListStyles';

export default class DraggableListItem extends Component {
  static propTypes = {
    index: number.isRequired,
    uniqueKey: string.isRequired,
    name: string.isRequired,
    offset: shape({
      x: number,
      y: number
    }),
    onRemove: func.isRequired
  };

  correctOffset(draggableProps) {
    if (!this.props.offset) {
      return draggableProps;
    }
    const { x = 0, y = 0 } = this.props.offset;
    console.log(x, y);
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
    const { name, onRemove, uniqueKey, ...rest } = this.props;
    return (
      <Draggable {...rest} draggableId={uniqueKey}>
        {provided => (
          <StyledListItem
            {...this.correctOffset(provided.draggableProps)}
            innerRef={provided.innerRef}
          >
            <span {...provided.dragHandleProps}>
              <DragHandleIcon />
            </span>
            <Field name={name} placeholder="Unique field name">
              {({ input, meta }) => <Input {...input} />}
            </Field>
            <RoundIconButton
              type="button"
              onClick={onRemove}
              backgroundColor="danger"
            >
              <XIcon />
            </RoundIconButton>
          </StyledListItem>
        )}
      </Draggable>
    );
  }
}
