import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { renderTemplate } from '../../../helper/utils';

const markdownOptions = {
  forceBlock: true,
  overrides: {
    p: {
      component: 'div'
    }
  }
};
export default class Preview extends Component {
  static propTypes = {
    template: PropTypes.shape({
      front: PropTypes.string.isRequired,
      back: PropTypes.string.isRequired
    }).isRequired,
    fields: PropTypes.object.isRequired,
    showAnswer: PropTypes.bool
  };

  render() {
    const { template, fields } = this.props;
    const front = renderTemplate(template.front, fields);
    if (this.props.showAnswer) {
      const back = renderTemplate(template.back, { ...fields, _front_: front });
      return <Markdown options={markdownOptions} children={back} />;
    }
    return <Markdown options={markdownOptions} children={front} />;
  }
}
