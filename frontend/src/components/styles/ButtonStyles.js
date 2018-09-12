import styled from 'react-emotion';

const BaseButton = styled('button')(({ theme }) => ({
  ...theme.typography.button,
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  borderRadius: 5,
  transition: `all 300ms ${theme.timings.easeOutCirc}`,
  '& svg': {
    fontSize: '1.5em',
    margin: '0 0.5rem'
  },
  '&:disabled': {
    cursor: 'not-allowed'
  }
}));

const Button = styled(BaseButton)(
  ({ theme }) => ({
    color: theme.colors.textLight,
    background: theme.colors.primary,
    opacity: 0.8,
    minWidth: '4rem',
    height: '2.25rem',
    padding: '0 1rem',
    boxShadow:
      '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    '&:focus, &:hover': {
      outline: 'none',
      boxShadow:
        '0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)'
    },
    '&:active': {
      boxShadow:
        '0px 8px 8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.12)'
    },
    '&:disabled': {
      boxShadow: 'none',
      cursor: 'not-allowed',
      background: 'rgba(79, 79, 79, 0.26)',
      color: theme.colors.lightGrey3
    }
  }),
  ({ theme, textColor, backgroundColor, large, iconLeft, iconRight }) => {
    const styles = [];
    if (textColor) {
      styles.push({ color: theme.colors[textColor] });
    }
    if (backgroundColor) {
      styles.push({ backgroundColor: theme.colors[backgroundColor] });
    }
    if (large) {
      styles.push({
        minWidth: '5.3rem',
        height: '3rem',
        padding: '0 1.5rem'
      });
    }
    if (iconLeft) {
      styles.push({ paddingLeft: '0.5rem' });
    }
    if (iconRight) {
      styles.push({ paddingRight: '0.5rem' });
    }
    return styles;
  }
);

const TextButton = styled(Button)(
  ({ theme }) => ({
    padding: '0 0.5rem',
    color: theme.colors.primary,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    boxShadow: 'none',
    '&:active, &:focus': {
      background: `${theme.colors.primary}33`
    },
    '&:hover': {
      background: `${theme.colors.primary}11`
    },
    '&:active, &:focus, &:hover': {
      boxShadow: 'none'
    },
    '&:disabled': {
      background: 'transparent',
      color: theme.colors.lightGrey3
    }
  }),
  ({ theme, textColor, backgroundColor, large, iconLeft, iconRight }) => {
    const styles = [];
    if (textColor) {
      styles.push({ color: theme.colors[textColor] });
    }
    if (backgroundColor) {
      styles.push({ backgroundColor: theme.colors[backgroundColor] });
    }
    if (large) {
      styles.push({
        padding: '0 1rem'
      });
    }
    if (iconLeft) {
      styles.push({ paddingLeft: 0 });
    }
    if (iconRight) {
      styles.push({ paddingRight: 0 });
    }
    return styles;
  }
);

const OutlinedButton = styled(Button)(
  ({ theme }) => ({
    background: 'transparent',
    color: theme.colors.primary,
    border: `1px solid ${theme.colors.lightGrey2}`,
    boxShadow: 'none',
    '&:active, &:focus': {
      background: `${theme.colors.primary}33`
    },
    '&:hover': {
      background: `${theme.colors.primary}11`
    },
    '&:active, &:focus, &:hover': {
      boxShadow: 'none'
    },
    '&:disabled': {
      background: 'transparent',
      color: theme.colors.lightGrey3,
      borderColor: theme.colors.lightGrey3
    }
  }),
  ({ theme, textColor }) => {
    const styles = [];
    if (textColor) {
      styles.push({ color: theme.colors[textColor] });
    }
    return styles;
  }
);

const TabButton = styled(Button)(({ theme, isActive }) => ({
  color: isActive ? theme.colors.primary : theme.colors.textDark,
  borderColor: isActive ? theme.colors.primary : 'transparent',
  background: 'transparent',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  boxShadow: 'none',
  borderRadius: 0,
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  '&:active, &:focus': {
    background: `${theme.colors.primary}33`
  },
  '&:hover': {
    background: `${theme.colors.primary}11`
  },
  '&:active, &:focus, &:hover': {
    boxShadow: 'none'
  },
  '&:disabled': {
    background: 'transparent',
    color: theme.colors.lightGrey3
  }
}));

const IconButton = styled('button')(({ theme }) => ({
  padding: '1rem',
  color: theme.colors.secondary,
  cursor: 'pointer',
  fontSize: '1.5rem',
  background: 'transparent',
  border: 'none',
  transition: `all 300ms ${theme.timings.easeOutSine}`,
  '&:active, &:focus': {
    color: `${theme.colors.primary}ee`,
    outline: 'none'
  },
  '&:hover': {
    color: `${theme.colors.primary}bb`
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: theme.colors.lightGrey2
  }
}));

const RoundIconButton = styled('button')(({ theme, backgroundColor }) => ({
  opacity: 0.5,
  color: 'white',
  background: backgroundColor
    ? theme.colors[backgroundColor]
    : theme.colors.primary,
  transition: `all 200ms ${theme.timings.easeOutCirc}`,
  cursor: 'pointer',
  height: '1rem',
  width: '1rem',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9rem',

  '&:active, &:focus': {
    opacity: 1,
    outline: 'none'
  },
  '&:hover': {
    opacity: 0.8
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: theme.colors.lightGrey2,
    opacity: 0.3
  }
}));

const FloatingActionButton = styled('button')(({ theme, backgroundColor }) => ({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  color: 'white',
  opacity: 0.9,
  background: backgroundColor
    ? theme.colors[backgroundColor]
    : theme.colors.primary,
  transition: `all 200ms ${theme.timings.easeOutCirc}`,
  cursor: 'pointer',
  height: '3.5rem',
  width: '3.5rem',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.8rem',
  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.12)',
  '&:active:active': {
    boxShadow:
      '0px 8px 8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.12)'
  },
  '&:focus, &:hover': {
    opacity: 1,
    boxShadow:
      '0px 14px 14px rgba(0, 0, 0, 0.237602), 0px 0px 14px rgba(0, 0, 0, 0.12)'
  },
  '&:focus': {
    outline: 'none'
  },
  '&:disabled': {
    display: 'none'
  }
}));

export {
  Button,
  IconButton,
  TextButton,
  OutlinedButton,
  RoundIconButton,
  TabButton,
  FloatingActionButton
};
