import React from 'react';
import { markdownToJsx } from '../lib/markdown';
import MarkdownStyles from './styles/MarkdownStyles';

function Markdown({ children }) {
  return <MarkdownStyles>{markdownToJsx(children)}</MarkdownStyles>;
}

export default Markdown;
