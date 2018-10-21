import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavContainer, HomeLink, MenuButton, PageTitle } from './styles/NavbarStyles';
import { BrandIcon, OptionsIcon } from './Icons';
import User from './User';

class Navbar extends Component {
  static propTypes = {
    title: PropTypes.string,
    onMenuOpen: PropTypes.func
  };

  static defaultProps = {
    title: 'hootini',
    onMenuOpen: () => console.log('open menu')
  };

  render() {
    return (
      <NavContainer>
        <User>
          {({ data }) =>
            data && data.me ? (
              <HomeLink to="/decks">
                <BrandIcon />
              </HomeLink>
            ) : (
              <HomeLink to="/">
                <BrandIcon />
              </HomeLink>
            )
          }
        </User>
        <PageTitle>{this.props.title}</PageTitle>
        <MenuButton onClick={this.props.onMenuOpen}>
          <OptionsIcon />
        </MenuButton>
      </NavContainer>
    );
  }
}

export default Navbar;
