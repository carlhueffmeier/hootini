import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import RenderedTemplate from './TemplateRenderer';
import * as typography from '../shared/typography';
import * as colors from '../shared/colors';
import { css, getUniqueKey } from '../lib/utils';
import { TextButton, TabButton } from './styles/ButtonStyles';
import { Tabbar, TabbarItem, TabContent } from './styles/TabStyles';

const Card = styled('div')(({ theme }) => ({
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 2,
  height: '100%',
  background: theme.colors.backgroundLight
}));

const CardTitle = styled('h3')({
  ...typography.h5,
  margin: '1rem 0',
  color: colors.textDark,
  textAlign: 'center'
});

const StyledTabContent = styled(TabContent)({
  margin: '0 1rem'
});

const StyledTabbar = styled(Tabbar)({
  padding: '0 1rem'
});

const TabActions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem'
});

class NotePreview extends Component {
  static propTypes = {
    templates: PropTypes.array.isRequired,
    values: PropTypes.object,
    renderActions: PropTypes.func
  };

  static defaultProps = {
    onSelectTab: () => {}
  };

  state = {
    activeTab: 0,
    isCardFlipped: false
  };

  isControlled(key) {
    return this.props.hasOwnProperty(key);
  }

  getState() {
    return Object.keys(this.state).reduce(
      (combinedState, key) => ({
        ...combinedState,
        [key]: this.isControlled(key) ? this.props[key] : this.state[key]
      }),
      {}
    );
  }

  selectTab(tab) {
    if (!this.isControlled('activeTab')) {
      this.setState({ activeTab: tab });
    }
    this.props.onSelectTab(tab);
  }

  flipCard = () => this.setState(state => ({ isCardFlipped: !state.isCardFlipped }));

  render() {
    const { templates, values, renderActions } = this.props;
    const { activeTab, isCardFlipped } = this.getState();

    return (
      <Card>
        <CardTitle>Preview</CardTitle>
        <StyledTabbar>
          {templates &&
            templates.map((template, index) => (
              <TabbarItem key={getUniqueKey(template)}>
                <TabButton
                  type="button"
                  onClick={() => this.selectTab(index)}
                  isActive={index === activeTab}
                >
                  {template.name}
                </TabButton>
              </TabbarItem>
            ))}
        </StyledTabbar>
        <StyledTabContent>
          {templates &&
            templates.map(
              (template, index) =>
                index === activeTab ? (
                  <RenderedTemplate
                    key={getUniqueKey(template)}
                    template={template}
                    values={values}
                    showAnswer={isCardFlipped}
                  />
                ) : null
            )}
        </StyledTabContent>
        <TabActions>
          <TextButton type="button" onClick={this.flipCard}>
            {isCardFlipped ? 'Hide Answer' : 'Show Answer'}
          </TextButton>
          {renderActions && (
            <div {...css({ marginLeft: 'auto' })}>{renderActions({ activeTab })}</div>
          )}
        </TabActions>
      </Card>
    );
  }
}

export default NotePreview;
