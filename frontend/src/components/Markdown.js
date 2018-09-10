import React from 'react';
import { markdownToJsx } from '../lib/markdown';
import MarkdownStyles from './styles/MarkdownStyles';

export default function Markdown({ children }) {
  return <MarkdownStyles>{markdownToJsx(children)}</MarkdownStyles>;
}
