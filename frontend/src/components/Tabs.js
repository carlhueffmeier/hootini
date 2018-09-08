import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import * as colors from '../shared/colors';
import { TabButton } from '../shared/Buttons';

const Tabbar = styled('ul')({
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: '0 1rem'
});

const Item = styled('li')({
  padding: 'none'
});

const TabContent = styled('div')({
  flex: 1,
  margin: '0 1rem',
  paddingTop: '1rem',
  borderBottom: `1px solid ${colors.lightGrey1}`
});

export default class Tabs extends Component {
  static Tab = props => props.children;

  static defaultProps = {
    onChange: () => {}
  };

  state = {
    activeTab: 0
  };

  isControlled() {
    return typeof this.props.activeTab !== undefined;
  }

  getActiveTab = () => {
    return this.isControlled() ? this.props.activeTab : this.state.activeTab;
  };

  openTab = tab => {
    if (!this.isControlled()) {
      this.setState({ activeTab: tab });
    }
    this.props.onChange(tab);
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <Tabbar>
          {React.Children.map(children, (child, i) => (
            <Item key={i}>
              <TabButton
                type="button"
                onClick={() => this.openTab(i)}
                isActive={i === this.getActiveTab()}
              >
                {child.props.title}
              </TabButton>
            </Item>
          ))}
        </Tabbar>
        <TabContent>
          {React.Children.map(
            children,
            (child, i) => (i === this.getActiveTab() ? child : null)
          )}
        </TabContent>
      </Fragment>
    );
  }
}
