import styled from 'react-emotion';
import { Link } from '@reach/router';
import * as colors from '../../shared/colors';

const NavContainer = styled('nav')`
  opacity: 0.9;
  background: ${colors.brand};
  color: ${colors.textLight};
  height: 3.75rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const HomeLink = styled(Link)`
  font-size: 1.6rem;
  padding: 0.5rem 1.3rem;

  &:link,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const MenuButton = styled('button')`
  font-size: 1.6rem;
  padding: 0.5rem 1.3rem;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
  }
`;

const PageTitle = styled('span')`
  flex: 1;
  font-size: 1.5rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { NavContainer, HomeLink, MenuButton, PageTitle };
