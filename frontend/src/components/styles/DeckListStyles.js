import styled from 'react-emotion';
import { Link } from '@reach/router';
import * as colors from '../../shared/colors';
import * as typography from '../../shared/typography';

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0
});

const ListItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  height: '8rem',
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.lightGrey1}`
  }
});

const ListItemLink = styled(Link)({
  width: '100%',
  display: 'flex',
  '&:link, &:visited': {
    textDecoration: 'none'
  }
});

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
});

const DeckName = styled('span')({
  ...typography.h4,
  color: colors.textDark,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const Info = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 1rem'
});

const InfoRow = styled('span')({
  ...typography.caption,
  color: colors.textDark,
  whiteSpace: 'nowrap'
});

export {
  StyledList,
  ListItem,
  ListItemLink,
  Container,
  DeckName,
  Info,
  InfoRow
};
