import React, { Component } from 'react';
import { array } from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TemplateRenderer from './TemplateRenderer';
import styled from 'react-emotion';
import { OutlinedButton } from './styles/ButtonStyles';
import ReviewAnswerButtons from './ReviewAnswerButtons';
import ReviewSummary from './ReviewSummary';
import { DECK_QUERY } from '../pages/DeckDetailsPage';
import { ALL_DECKS_QUERY } from '../pages/DeckListPage';

const REVIEW_CARD_MUTATION = gql`
  mutation reviewCard($id: ID!, $answer: ReviewAnswer!) {
    reviewCard(data: {id: $id, timeOfReview: ${Date.now()}, answer: $answer}) {
      due
    }
  }
`;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh'
});

const FlipButton = styled(OutlinedButton)({
  position: 'fixed',
  bottom: '5rem'
});

const CardStyles = styled('div')({
  '& p': {
    fontSize: '2rem'
  }
});

class Review extends Component {
  static propTypes = {
    cards: array
  };

  static defaultProps = {
    timeboxDuration: 1000 * 60 * 5
  };

  state = {
    timeboxStart: Date.now(),
    currentCard: 0,
    isReviewOver: false,
    isAnswerShown: false
  };

  getTimeboxEndTime() {
    return this.state.timeboxStart + this.props.timeboxDuration;
  }

  nextCard() {
    const { cards } = this.props;
    const { currentCard } = this.state;

    if (Date.now() >= this.getTimeboxEndTime() || currentCard >= cards.length - 1) {
      this.setState({ isReviewOver: true, isAnswerShown: false });
    } else {
      this.setState(state => ({ currentCard: state.currentCard + 1, isAnswerShown: false }));
    }
  }

  showAnswer = () => {
    this.setState({ isAnswerShown: true });
  };

  handleAnswer = async ({ reviewCard, answer }) => {
    const { cards } = this.props;
    const { currentCard } = this.state;

    await reviewCard({ variables: { id: cards[currentCard].id, answer } });
    this.nextCard();
  };

  render() {
    const { cards, deckSlug } = this.props;
    if (cards.length === 0 || this.state.isReviewOver) {
      return <ReviewSummary deckSlug={deckSlug} />;
    }
    const { currentCard, isAnswerShown } = this.state;
    const { fields, template } = cards[currentCard];
    const keyValuePairs = fields.reduce(
      (target, current) => ({ ...target, [current.key]: current.value }),
      {}
    );
    return (
      <Container>
        <CardStyles>
          <TemplateRenderer template={template} values={keyValuePairs} showAnswer={isAnswerShown} />
        </CardStyles>
        {isAnswerShown ? (
          <Mutation
            mutation={REVIEW_CARD_MUTATION}
            refetchQueries={[
              { query: DECK_QUERY, variables: { slug: deckSlug } },
              { query: ALL_DECKS_QUERY }
            ]}
          >
            {(reviewCard, { loading }) => (
              <ReviewAnswerButtons
                disabled={loading}
                onAnswer={answer => this.handleAnswer({ reviewCard, answer })}
              />
            )}
          </Mutation>
        ) : (
          <FlipButton large onClick={this.showAnswer}>
            Show Answer
          </FlipButton>
        )}
      </Container>
    );
  }
}

export default Review;
export { REVIEW_CARD_MUTATION };
