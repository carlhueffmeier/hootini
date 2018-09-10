import React from 'react';
import styled from 'react-emotion';

const onAttention = '&:hover, &:focus';

const ControllerButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  background: 'none',
  border: 'none',
  color: theme.colors.primary,
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
    transition: `transform 100ms ${theme.timings.easeInOutCirc}`
  },
  [onAttention]: {
    outline: 'none',
    opacity: 1
  }
}));

const Input = styled('input')(({ theme }) => ({
  ...theme.typography.subtitle1,
  position: 'relative',
  width: '100%',
  background: 'transparent',
  border: 'none',
  padding: '0.5rem 1.5rem 0.5rem 0.5rem',
  color: theme.colors.textDark,
  borderBottom: `1px solid ${theme.colors.lightGrey1}`,
  [onAttention]: {
    outline: 'none',
    borderColor: theme.colors.primary
  }
}));

const Textarea = styled('textarea')(({ theme }) => ({
  ...theme.typography.subtitle1,
  padding: '0.5rem',
  marginBottom: '0.5rem',
  backgroundColor: 'rgba(0, 0, 0, 0.06)',
  border: 'none',
  resize: 'none',
  borderRadius: 2,
  borderBottom: '1px solid transparent',
  [onAttention]: {
    outline: 'none',
    borderColor: theme.colors.primary
  }
}));

const Label = styled('label')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.colors.primary,
  display: 'block',
  marginBottom: '0.5rem'
}));

const BaseMenu = styled('ul')(
  ({ theme }) => ({
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
    boxShadow: `0 2px 10px 0 ${theme.colors.lightGrey2}`,
    transform: 'scale(0, 0)',
    transformOrigin: 'top right',
    transition: `transform 300ms ${theme.timings.easeOutCirc}`
  }),
  ({ isOpen }) =>
    isOpen
      ? {
          padding: '0.5rem 0',
          transform: 'none',
          opacity: 1
        }
      : null
);

const Menu = React.forwardRef((props, ref) => (
  <BaseMenu innerRef={ref} {...props} />
));

const Item = styled('li')(
  ({ theme }) => ({
    ...theme.typography.subtitle2,
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    height: '2rem',
    padding: '0 1rem'
  }),
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
