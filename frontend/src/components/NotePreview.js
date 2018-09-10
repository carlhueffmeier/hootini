import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import RenderedTemplate from './RenderedTemplate';
import Tabs from './Tabs';
import * as typography from '../shared/typography';
import * as colors from '../shared/colors';
import { css } from '../lib/utils';
import { TextButton } from './styles/ButtonStyles';

const Card = styled('div')({
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 2,
  height: '100%',
  background: '#FAFAFA'
});

const CardTitle = styled('h3')({
  ...typography.h5,
  margin: '1rem 0',
  color: colors.textDark,
  textAlign: 'center'
});

const TabActions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem'
});

export default class NotePreview extends Component {
  static propTypes = {
    templates: PropTypes.array.isRequired,
    values: PropTypes.object,
    renderActions: PropTypes.func
  };

  state = {
    activeTab: 0,
    isCardFlipped: false
  };

  flipCard = () =>
    this.setState(state => ({ isCardFlipped: !state.isCardFlipped }));

  handleTabChange = tab => this.setState({ activeTab: tab });

  render() {
    const { templates, values, renderActions } = this.props;
    const { activeTab, isCardFlipped } = this.state;
    return (
      <Card>
        <CardTitle>Preview</CardTitle>
        <Tabs activeTab={activeTab} onChange={this.handleTabChange}>
          {templates &&
            templates.map((template, index) => (
              <Tabs.Tab key={index} title={template.name}>
                <RenderedTemplate
                  template={template}
                  values={values}
                  showAnswer={isCardFlipped}
                />
              </Tabs.Tab>
            ))}
        </Tabs>
        <TabActions>
          <TextButton type="button" onClick={this.flipCard}>
            {isCardFlipped ? 'Hide Answer' : 'Show Answer'}
          </TextButton>
          {renderActions && (
            <div {...css({ marginLeft: 'auto' })}>
              {renderActions({ activeTab })}
            </div>
          )}
        </TabActions>
      </Card>
    );
  }
}
