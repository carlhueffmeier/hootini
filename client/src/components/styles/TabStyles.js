import styled from 'react-emotion';
import * as colors from '../../shared/colors';

const Tabbar = styled('ul')({
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  margin: 0,
  padding: 0
});

const TabbarItem = styled('li')({
  padding: 'none'
});

const TabContent = styled('div')({
  flex: 1,
  display: 'flex',
  paddingTop: '1rem',
  overflow: 'auto',
  ':not(:last-child)': {
    borderBottom: `1px solid ${colors.lightGrey1}`
  }
});

export { Tabbar, TabbarItem, TabContent };
