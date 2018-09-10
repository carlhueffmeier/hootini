import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NavContainer,
  HomeLink,
  MenuButton,
  PageTitle
} from './styles/NavbarStyles';
import { BrandIcon, OptionsIcon } from './Icons';

export default class Navbar extends Component {
  static propTypes = {
    title: PropTypes.string,
    onMenuOpen: PropTypes.func
  };

  static defaultProps = {
    title: 'Mnemo',
    onMenuOpen: () => console.log('open menu')
  };

  render() {
    return (
      <NavContainer>
        <HomeLink to="/">
          <BrandIcon />
        </HomeLink>
        <PageTitle>{this.props.title}</PageTitle>
        <MenuButton onClick={this.props.onMenuOpen}>
          <OptionsIcon />
        </MenuButton>
      </NavContainer>
    );
  }
}
