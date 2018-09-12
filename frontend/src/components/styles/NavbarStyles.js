import styled from 'react-emotion';
import { Link } from '@reach/router';

const NavContainer = styled('nav')(({ theme }) => ({
  opacity: 0.9,
  background: theme.colors.brand,
  color: theme.colors.textLight,
  height: theme.dimensions.navbarHeight,
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}));

const HomeLink = styled(Link)({
  fontSize: '1.6rem',
  padding: '0.5rem 1.3rem',
  '&:link, &:visited': {
    color: 'inherit',
    textDecoration: 'none'
  }
});

const MenuButton = styled('button')({
  fontSize: '1.6rem',
  padding: '0.5rem 1.3rem',
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  '&:focus, &:active': {
    outline: 'none'
  }
});

const PageTitle = styled('span')(({ theme }) => ({
  ...theme.typography.h6,
  flex: 1,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

export { NavContainer, HomeLink, MenuButton, PageTitle };
