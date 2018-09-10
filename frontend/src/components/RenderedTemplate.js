import React, { Component } from 'react';
import { shape, string, object, bool } from 'prop-types';
import Markdown from './Markdown';
import { renderTemplate } from '../lib/utils';

// To revert back to markdown-to-jsx
// import Markdown from 'markdown-to-jsx';
// const markdownOptions = {
//   forceBlock: true,
//   overrides: {
//     p: {
//       component: 'div'
//     }
//   }
// };

export default class Preview extends Component {
  static propTypes = {
    template: shape({
      front: string,
      back: string
    }).isRequired,
    values: object,
    showAnswer: bool
  };

  static defaultProps = {
    values: {},
    template: {}
  };

  render() {
    const {
      template: { front = '', back = '' },
      values,
      showAnswer
    } = this.props;

    const renderedFront = renderTemplate(front, values);
    if (showAnswer) {
      const renderedBack = renderTemplate(back, {
        ...values,
        _front_: renderedFront
      });
      return <Markdown children={renderedBack} />;
    }
    return <Markdown children={renderedFront} />;
  }
}
