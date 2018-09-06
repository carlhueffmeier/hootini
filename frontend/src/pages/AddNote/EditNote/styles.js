import styled from 'react-emotion';
import { easeInOutCirc } from '../../../shared/timings';
import { OutlinedButton, TextButton } from '../../../shared/Buttons';

const FullPageForm = styled('form')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const FormContentContainer = styled('div')(
  {
    flex: 1,
    display: 'flex',
    width: '200vw',
    transition: `transform 200ms ${easeInOutCirc}`
  },
  props => ({
    transform: props.isShifted ? 'translateX(-100vw)' : 'none'
  })
);

const HorizontalPartition = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  padding: '2rem 1rem 2rem',
  overflowY: 'auto',
  '@media (min-width:400px)': {
    paddingLeft: '2.8rem',
    paddingRight: '2.8rem'
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
