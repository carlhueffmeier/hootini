import { css as emoCSS } from 'react-emotion';

const css = (...args) => ({ className: emoCSS(...args) });

const wait = (timeInMs = 0) =>
  new Promise(resolve => setTimeout(resolve, timeInMs));

function renderTemplate(template, fields) {
  const re = /<%(\w+)%>/g;
  return template.replace(re, getField(fields));
}

function getField(data) {
  return (match, fieldId) => data[fieldId] || match;
}

function handleDragInFieldArray({ dragInfo, fields }) {
  const { destination, source } = dragInfo;
  // Don't do anything if dragged outside the tab bar
  if (!destination) {
    return;
  }
  // Don't do anything if position is unchanged
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  // Change position in FieldArray
  fields.move(source.index, destination.index);
}

export { css, wait, renderTemplate, handleDragInFieldArray };
