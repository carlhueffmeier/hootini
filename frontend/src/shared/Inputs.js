import React from 'react';
import styled from 'react-emotion';
import * as colors from './colors';
import * as typography from './typography';
import { easeOutCirc, easeInOutCirc } from './timings';

const onAttention = '&:hover, &:focus';

const ControllerButton = styled('button')({
  position: 'absolute',
  background: 'none',
  border: 'none',
  color: colors.primary,
  fontSize: '1.5rem',
  top: '50%',
  padding: 0,
  right: 0,
  transform: 'translateY(-50%)',
  zIndex: 100,
  opacity: 0.8,
  cursor: 'pointer',
  '& svg': {
    transformOrigin: 'center',
    transition: `transform 100ms ${easeInOutCirc}`
  },
  [onAttention]: {
    outline: 'none',
    opacity: 1
  }
});

const Input = styled('input')({
  ...typography.subtitle1,
  position: 'relative',
  width: '100%',
  background: 'transparent',
  border: 'none',
  padding: '0.5rem 1.5rem 0.5rem 0.5rem',
  color: colors.textDark,
  transition: `border-color 100ms ${easeOutCirc}`,
  borderBottom: `1px solid ${colors.lightGrey1}`,
  [onAttention]: {
    outline: 'none',
    borderColor: colors.primary
  }
});

const Textarea = styled('textarea')({
  ...typography.subtitle1,
  padding: '0.5rem',
  backgroundColor: 'rgba(0, 0, 0, 0.06)',
  border: 'none',
  marginTop: '0.5rem',
  resize: 'none',
  borderRadius: 2,
  borderBottom: '1px solid transparent',
  transition: `border-color 100ms ${easeOutCirc}`,
  [onAttention]: {
    outline: 'none',
    borderColor: colors.primary
  }
});

const Label = styled('label')({
  ...typography.caption,
  color: colors.primary
});

const BaseMenu = styled('ul')(
  {
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: 0,
    padding: 0,
    position: 'absolute',
    zIndex: 200,
    backgroundColor: 'white',
    width: '100%',
    maxHeight: '9rem',
    outline: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    boxShadow: `0 2px 10px 0 ${colors.lightGrey2}`,
    transform: 'scale(0, 0)',
    transformOrigin: 'top right',
    transition: `transform 300ms ${easeOutCirc}`
  },
  ({ isOpen }) =>
    isOpen
      ? {
          padding: '0.5rem 0',
          transform: 'none'
        }
      : null
);

const Menu = React.forwardRef((props, ref) => (
  <BaseMenu innerRef={ref} {...props} />
));

const Item = styled('li')(
  {
    ...typography.subtitle2,
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    height: '2rem',
    padding: '0 1rem'
  },
  ({ isActive, isSelected }) => {
    const styles = [];
    if (isActive) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        background: 'rgba(0,0,0,.03)'
      });
    }
    if (isSelected) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        fontWeight: '700'
      });
    }
    return styles;
  }
);

export { ControllerButton, Input, Textarea, Label, Menu, Item };
