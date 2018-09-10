import styled from 'react-emotion';

const StyledList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  '& > li': {
    padding: 0
  },
  '& > li:not(:last-child)': {
    marginBottom: '0.5rem'
  }
});

const StyledListItem = styled('li')({
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  '& > input': {
    margin: '0 1rem'
  }
});

export { StyledList, StyledListItem };
