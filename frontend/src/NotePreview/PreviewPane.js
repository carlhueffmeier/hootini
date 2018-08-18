import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkdownWithSyntax from '../MarkdownWithSyntax';
import { renderTemplate } from '../helper/utils';

export default class PreviewPane extends Component {
  static propTypes = {
    template: PropTypes.shape({
      front: PropTypes.string.isRequired,
      back: PropTypes.string.isRequired
    }).isRequired,
    fields: PropTypes.object.isRequired
  };

  render() {
    const { template, fields } = this.props;
    const front = renderTemplate(template.front, fields);
    const back = renderTemplate(template.back, { ...fields, _front_: front });
    return (
      <div>
        <h3>Front</h3>
        <MarkdownWithSyntax children={front} />
        <h3>Back</h3>
        <MarkdownWithSyntax children={back} />
      </div>
    );
  }
}
