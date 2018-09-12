import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import posed from 'react-pose';

const twoPageContainerProps = {
  input: {
    x: '0',
    transition: { type: 'spring', damping: 30, stiffness: 400 }
  },
  preview: {
    x: '-100vw',
    transition: { type: 'spring', damping: 30, stiffness: 400 }
  }
};

const TwoPageContainer = styled(posed.div(twoPageContainerProps))({
  flex: 1,
  display: 'flex',
  width: '200vw'
});

const SinglePage = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 1rem 0.5rem',
  overflowY: 'auto',
  '@media (min-width:400px)': {
    paddingLeft: '2.8rem',
    paddingRight: '2.8rem'
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
    const { isShifted } = this.state;
    return (
      <Fragment>
        <TwoPageContainer pose={isShifted ? 'preview' : 'input'}>
          <SinglePage>{this.renderTypeOf(TwoPageLayout.Left)}</SinglePage>
          <SinglePage>{this.renderTypeOf(TwoPageLayout.Right)}</SinglePage>
        </TwoPageContainer>
        <BottomBar>{this.renderTypeOf(TwoPageLayout.Bottom)}</BottomBar>
      </Fragment>
    );
  }
}
