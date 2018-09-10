import React, { Component } from 'react';
import { number, string, func } from 'prop-types';
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
    onRemove: func.isRequired
  };

  render() {
    const { name, onRemove, uniqueKey, ...rest } = this.props;
    return (
      <Draggable {...rest} draggableId={uniqueKey}>
        {provided => (
          <StyledListItem
            {...provided.draggableProps}
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
