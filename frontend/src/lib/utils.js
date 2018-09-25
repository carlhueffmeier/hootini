import { css as emoCSS } from 'react-emotion';
import shortid from 'shortid';

// General Utilities
function curry(fn) {
  return (...args) => (args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args)));
}

function pick(keysToPick, obj) {
  return keysToPick.reduce(
    (target, key) => (obj.hasOwnProperty(key) ? { ...target, [key]: obj[key] } : target),
    {}
  );
}

const curriedPick = curry(pick);

const wait = (timeInMs = 0) => new Promise(resolve => setTimeout(resolve, timeInMs));

// min: inclusive --- max: exclusive
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Templating
function renderTemplate(template, fields) {
  const re = /<%(\w+)%>/g;
  return template.replace(re, getField(fields));
}

function getField(data) {
  return (match, fieldId) => data[fieldId] || match;
}

// UI helpers
const css = (...args) => ({ className: emoCSS(...args) });

// Returns true when an item was moved, false if no action was taken
function handleDragInFieldArray({ dragInfo, fields }) {
  const { destination, source } = dragInfo;
  if (!destination) {
    // Don't do anything if dragged outside the tab bar
    return false;
  }
  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    // Don't do anything if position is unchanged
    return false;
  }
  // Change position in FieldArray
  fields.move(source.index, destination.index);
  return true;
}

function correctDraggableOffset(draggableProps, offset) {
  if (!draggableProps.style.left) {
    return draggableProps;
  }
  const { x = 0, y = 0 } = offset;

  return {
    ...draggableProps,
    style: {
      ...draggableProps.style,
      top: draggableProps.style.top + y,
      left: draggableProps.style.left + x
    }
  };
}

// App specific utilities
function invariant(condition, ...message) {
  if (!condition) {
    console.warn('[Invariant]: ', ...message);
  }
}

function getUniqueKey(item) {
  try {
    const key = item.id || item.localId;
    invariant(typeof key === 'string', 'Can not generate key for ', item);
    return key;
  } catch (error) {
    console.warn('💣 Error generating key.\nRaw Error:\n', error);
  }
}

function addLocalId() {
  return {
    localId: shortid.generate()
  };
}

export {
  addLocalId,
  css,
  wait,
  curry,
  curriedPick as pick,
  getUniqueKey,
  randomInteger,
  renderTemplate,
  handleDragInFieldArray,
  correctDraggableOffset
};
