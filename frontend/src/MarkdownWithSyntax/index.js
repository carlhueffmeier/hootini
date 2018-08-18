import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';
import SyntaxHighlightedCodeBlock from './SyntaxHighlightedCodeBlock';
import styled from 'styled-components';

const Paragraph = styled.div`
  margin: 0.5rem 0;
`;

export default class MarkdownWithSyntax extends Component {
  render() {
    return (
      <Markdown
        options={{
          overrides: {
            p: {
              component: Paragraph
            },
            code: SyntaxHighlightedCodeBlock
          }
        }}
        children={this.props.children}
      />
    );
  }
}
