import { css as emoCSS } from 'react-emotion';

function renderTemplate(template, fields) {
  const re = /<%(\w+)%>/g;
  return template.replace(re, getField(fields));
}

function getField(data) {
  return (match, fieldId) => data[fieldId] || match;
}

const css = (...args) => ({ className: emoCSS(...args) });

export { css, renderTemplate };
