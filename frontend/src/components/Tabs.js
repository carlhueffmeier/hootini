import React, { Component, Fragment } from 'react';
import { TabButton } from '../shared/Buttons';
import { Tabbar, TabbarItem, TabContent } from './styles/TabbarStyles';

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
            <TabbarItem key={i}>
              <TabButton
                type="button"
                onClick={() => this.openTab(i)}
                isActive={i === this.getActiveTab()}
              >
                {child.props.title}
              </TabButton>
            </TabbarItem>
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
