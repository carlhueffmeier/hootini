import styled from 'react-emotion';
import * as colors from './colors';
import * as typography from './typography';
import { easeOutCirc } from './timings';

const commonButtonStyles = {
  ...typography.button,
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  borderRadius: 5,
  transition: `all 300ms ${easeOutCirc}`,
  '& svg': {
    margin: '0 0.5rem',
    fontSize: '1.5em'
  }
};

const Button = styled('button')(
  {
    ...commonButtonStyles,
    boxShadow:
      '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    '&:active': {
      boxShadow:
        '0px 8px 8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.12)'
    },
    '&:focus, &:hover': {
      boxShadow:
        '0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)'
    },
    '&:focus': {
      outline: 'none'
    },
    '&:disabled': {
      boxShadow: 'none',
      cursor: 'not-allowed',
      background: 'rgba(79, 79, 79, 0.26)',
      color: colors.lightGrey3
    }
  },
  props => ({
    color: props.color || colors.textLight,
    background: props.background || colors.primary,
    minWidth: props.large ? '5.3rem' : '4rem',
    height: props.large ? '3rem' : '2.25rem',
    padding: props.large ? '0 1.5rem' : '0 1rem'
  })
);

const TextButton = styled(Button)(
  {
    ...commonButtonStyles,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    boxShadow: 'none',
    '&:active, &:focus': {
      background: `${colors.primary}33`
    },
    '&:hover': {
      background: `${colors.primary}11`
    },
    '&:active, &:focus, &:hover': {
      boxShadow: 'none'
    },
    '&:disabled': {
      background: 'transparent',
      color: colors.lightGrey3
    }
  },
  props => ({
    color: props.color || colors.primary,
    padding: props.large ? '0 1rem' : '0 0.5rem'
  })
);

const OutlinedButton = styled(Button)({
  background: 'transparent',
  color: colors.primary,
  border: `1px solid ${colors.lightGrey2}`,
  boxShadow: 'none',
  '&:active, &:focus': {
    background: `${colors.primary}33`
  },
  '&:hover': {
    background: `${colors.primary}11`
  },
  '&:active, &:focus, &:hover': {
    boxShadow: 'none'
  },
  '&:disabled': {
    background: 'transparent',
    color: colors.lightGrey3,
    borderColor: colors.lightGrey3
  }
});

const TabButton = styled(Button)(
  {
    background: 'transparent',
    color: colors.textDark,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    boxShadow: 'none',
    borderRadius: 0,
    borderBottom: '2px solid transparent',
    '&:active, &:focus': {
      background: `${colors.primary}33`
    },
    '&:hover': {
      background: `${colors.primary}11`
    },
    '&:active, &:focus, &:hover': {
      boxShadow: 'none'
    },
    '&:disabled': {
      background: 'transparent',
      color: colors.lightGrey3
    }
  },
  ({ isActive }) => ({
    color: isActive ? colors.primary : colors.textDark,
    borderColor: isActive ? colors.primary : 'transparent'
  })
);

const IconButton = styled('button')({
  padding: '1rem',
  color: colors.secondary,
  cursor: 'pointer',
  fontSize: '1.5rem',
  background: 'transparent',
  border: 'none',
  transition: `color 200ms ${easeOutCirc}`,
  '&:active, &:focus': {
    color: `${colors.primary}ee`,
    outline: 'none'
  },
  '&:hover': {
    color: `${colors.primary}bb`
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: colors.lightGrey2
  }
});

export { Button, IconButton, TextButton, OutlinedButton, TabButton };
