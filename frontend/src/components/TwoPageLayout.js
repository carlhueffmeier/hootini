import React, { Component, Fragment } from 'react';
import { bool, object } from 'prop-types';
import styled from 'react-emotion';

const TwoPageContainer = styled('div')(
  {
    flex: 1,
    position: 'relative'
  },
  ({ isShifted }) =>
    isShifted
      ? {
          '& > div:first-child': {
            transform: 'translateX(-100vw)'
          },
          '& > div:last-child': {
            transform: 'none'
          }
        }
      : null
);

const SinglePage = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  padding: '2rem 1rem 0.5rem',
  overflowY: 'auto',
  transition: `transform 200ms ${theme.timings.easeInOutCirc}`,
  '@media (min-width:400px)': {
    paddingLeft: '2.8rem',
    paddingRight: '2.8rem'
  },
  ':nth-child(2)': {
    transform: 'translateX(100vw)'
  }
}));

const BottomBar = styled('div')({
  display: 'flex',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '2rem',
  '@media (min-width:400px)': {
    paddingLeft: '2.8rem',
    paddingRight: '2.8rem'
  }
});

export default class TwoPageLayout extends Component {
  static Left = ({ children, provided }) => (
    <Fragment>{children(provided)}</Fragment>
  );
  static Right = ({ children, provided }) => (
    <Fragment>{children(provided)}</Fragment>
  );
  static Bottom = ({ children, provided }) => (
    <Fragment>{children(provided)}</Fragment>
  );

  toggleShift = () => {
    this.setState(state => ({ isShifted: !state.isShifted }));
  };

  state = {
    isShifted: false,
    toggleShift: this.toggleShift
  };

  renderTypeOf = type => {
    const filteredComponents = React.Children.map(
      this.props.children,
      child => {
        if (child.type !== type) {
          return null;
        }
        const clone = React.cloneElement(child, { provided: this.state });
        return clone;
      }
    );
    return filteredComponents[0] ? filteredComponents[0] : null;
  };

  render() {
    return (
      <Fragment>
        <TwoPageContainer isShifted={this.state.isShifted}>
          <SinglePage>{this.renderTypeOf(TwoPageLayout.Left)}</SinglePage>
          <SinglePage>{this.renderTypeOf(TwoPageLayout.Right)}</SinglePage>
        </TwoPageContainer>
        <BottomBar>{this.renderTypeOf(TwoPageLayout.Bottom)}</BottomBar>
      </Fragment>
    );
  }
}
