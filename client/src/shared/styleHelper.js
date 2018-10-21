import styled from 'react-emotion';

// Hide something visually while keeping it in the DOM
// for accessibility purposes
// Usage: https://emotion.sh/docs/styled#change-the-rendered-tag-using-withcomponent
const VisuallyHidden = styled('div')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: 1
});

export { VisuallyHidden };
