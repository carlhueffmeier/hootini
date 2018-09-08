import React, { Component } from 'react';
import { number, string, func } from 'prop-types';
import styled from 'react-emotion';
import { Draggable } from 'react-beautiful-dnd';
import { Field } from 'react-final-form';
import { DragHandleIcon, XIcon } from '../../../shared/Icons';
import { Input } from '../../../shared/Inputs';
import { RoundIconButton } from '../../../shared/Buttons';
import * as colors from '../../../shared/colors';

const StyledListItem = styled('li')({
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  '& > input': {
    margin: '0 1rem'
  }
});

export default class FieldListItem extends Component {
  static propTypes = {
    index: number.isRequired,
    uid: string.isRequired,
    name: string.isRequired,
    onRemove: func.isRequired
  };

  render() {
    const { name, onRemove, uid, ...rest } = this.props;
    return (
      <Draggable {...rest} draggableId={uid}>
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
              background={colors.danger}
            >
              <XIcon />
            </RoundIconButton>
          </StyledListItem>
        )}
      </Draggable>
    );
  }
}
