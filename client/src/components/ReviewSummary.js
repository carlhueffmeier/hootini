import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { number, string } from 'prop-types';
import styled from 'react-emotion';
import { navigate } from '@reach/router';
import { TextButton, Button } from './styles/ButtonStyles';
import { ChevronIcon } from './Icons';
import TimeSelect from './TimeSelect';
import { randomInteger } from '../lib/utils';
import { DECK_QUERY } from '../pages/DeckDetailsPage';

const Container = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100%',
  padding: '2.8rem 0.5rem',
  maxWidth: 900,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [`@media (min-width: ${theme.breakpoints.md}px)`]: {
    padding: '2.8rem'
  }
}));

const NavigateButton = styled(TextButton)({
  alignSelf: 'flex-start'
});

const ActionBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const ContinueButton = styled(Button)({
  marginBottom: '1rem'
});

const Message = styled('h3')(({ theme }) => ({
  ...theme.typography.h3,
  alignSelf: 'center',
  textAlign: 'center'
}));

function generateMotivation() {
  const messages = [
    'You are awesome 🎉',
    'Way to go 🙌',
    'You got this 👊',
    'Rock on 🤘',
    'Live long and prosper 🖖'
  ];
  const randomIndex = randomInteger(0, messages.length);
  return messages[randomIndex];
}

class ReviewSummary extends Component {
  static propTypes = {
    cardsStudied: number,
    deckSlug: string
  };

  render() {
    const { deckSlug } = this.props;
    return (
      <Container>
        <NavigateButton onClick={() => navigate('./')}>
          <ChevronIcon direction="left" /> Back to deck
        </NavigateButton>
        <Query query={DECK_QUERY} variables={{ slug: deckSlug }}>
          {({ data, loading, error }) => {
            if (loading) {
              return 'Loading....';
            }
            if (error) {
              return <p>Error! {error.message}</p>;
            }
            if (data.deck.cardsDue === 0) {
              return (
                <Message>
                  All reviews done{' '}
                  <span role="img" aria-label="thumbs up">
                    👍
                  </span>
                </Message>
              );
            }
            return (
              <Fragment>
                <Message>{generateMotivation()}</Message>
                <ActionBox>
                  <ContinueButton large>Continue Learning</ContinueButton>
                  <TimeSelect />
                </ActionBox>
              </Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default ReviewSummary;
