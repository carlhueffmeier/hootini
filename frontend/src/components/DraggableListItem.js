import React, { Component } from 'react';
import { number, string, func, shape } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Field } from 'react-final-form';
import styled from 'react-emotion';
import { DragHandleIcon, RemoveCircleIcon } from './Icons';
import { Input } from './styles/FormStyles';
import { IconButton } from './styles/ButtonStyles';
import { StyledListItem } from './styles/DraggableListStyles';
import { correctDraggableOffset } from '../lib/utils';

const RemoveButton = styled(IconButton)(({ theme }) => ({
  padding: '0.3rem',
  fontSize: '1.4rem',
  color: theme.colors.danger
}));
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
    const { offset } = this.props;
    return offset
      ? correctDraggableOffset(draggableProps, offset)
      : draggableProps;
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
            <RemoveButton type="button" onClick={onRemove}>
              <RemoveCircleIcon />
            </RemoveButton>
          </StyledListItem>
        )}
      </Draggable>
    );
  }
}
