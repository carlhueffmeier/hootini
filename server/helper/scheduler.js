ANSWER_NO_IDEA = 0;
ANSWER_HARD = 1;
ANSWER_GOOD = 2;
ANSWER_EASY = 3;
DEFAULT_INTERVAL = 10 * 60 * 1000; // 10 min

function rescheduleCard({ interval, dueTime, ease, timeOfReview, answer }) {
  switch (answer) {
    case ANSWER_NO_IDEA:
      return {
        due: Date.now() + DEFAULT_INTERVAL,
        interval: DEFAULT_INTERVAL,
        ease: ease * 0.8
      };
    case ANSWER_HARD:
      return {
        due: timeOfReview + interval * 1.2,
        interval: interval * 1.2,
        ease: ease * 0.9
      };

    case ANSWER_GOOD:
      return {
        due: timeOfReview + interval * 1.5,
        interval: interval * 1.5,
        ease: ease
      };

    case ANSWER_EASY:
      return {
        due: timeOfReview + interval * 2,
        interval: interval * 2,
        ease: ease * 1.2
      };
    default:
      throw new Error(`Can't handle that answer 🤷‍`);
  }
}

module.exports = { DEFAULT_INTERVAL, rescheduleCard };
