import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';

export default function SyntaxHighlightedCodeBlock({ children, className }) {
  const language = className ? className.slice('lang-'.length) : 'jsx';
  return (
    <SyntaxHighlighter
      style={atomDark}
      language={language}
      children={children}
    />
  );
}
