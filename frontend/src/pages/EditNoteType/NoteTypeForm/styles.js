import styled from 'react-emotion';
import { easeInOutCirc } from '../../../shared/timings';
import { OutlinedButton, TextButton } from '../../../shared/Buttons';
import * as colors from '../../../shared/colors';

const FullPageForm = styled('form')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const FormContentContainer = styled('div')(
  {
    flex: 1,
    position: 'relative'
  },
  ({ isShifted }) =>
    isShifted
      ? {
          '& > div:first-child': {
            transform: 'translateX(-100vw)'
          },
          '& > div:last-child': {
            transform: 'none'
          }
        }
      : null
);

const HorizontalPartition = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  padding: '2rem 1rem 2rem',
  overflowY: 'auto',
  transition: `transform 200ms ${easeInOutCirc}`,
  '@media (min-width:400px)': {
    paddingLeft: '2.8rem',
    paddingRight: '2.8rem'
  },
  ':nth-child(2)': {
    transform: 'translateX(100vw)'
  }
});

const FormButtonContainer = styled('div')({
  display: 'flex',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '2rem',
  '@media (min-width:400px)': {
    paddingLeft: '2.8rem',
    paddingRight: '2.8rem'
  }
});

const CancelButton = styled(TextButton)({
  marginRight: 'auto'
});

const PreviewButton = styled(OutlinedButton)({
  marginRight: '1rem'
});

export {
  FullPageForm,
  FormContentContainer,
  HorizontalPartition,
  FormButtonContainer,
  CancelButton,
  PreviewButton
};
