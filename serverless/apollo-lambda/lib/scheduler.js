const ANSWER_REPEAT = 'REPEAT';
const ANSWER_HARD = 'HARD';
const ANSWER_OK = 'OK';
const ANSWER_EASY = 'EASY';
const PERFORMANCE_RATING = {
  [ANSWER_REPEAT]: 0,
  [ANSWER_HARD]: (5 / 3) * 1,
  [ANSWER_OK]: (5 / 3) * 2,
  [ANSWER_EASY]: 5
};

const INITIAL_EASE = 2.5;
const MINIMUM_EASE = 1.3;

function calculateNextDueDate(ease, consecutiveCorrectAnswers, answer) {
  const rating = PERFORMANCE_RATING[answer];
  if (typeof rating === 'undefined') {
    throw new Error(`Can't handle that answer 🤷‍`);
  }

  const update = {};
  update.ease = ease + -0.8 + 0.28 * rating + 0.02 * rating ** 2;
  if (update.ease < MINIMUM_EASE) {
    update.ease = MINIMUM_EASE;
  }
  update.due = new Date();
  if (rating > 0) {
    update.consecutiveCorrectAnswers = consecutiveCorrectAnswers + 1;
    update.due.setDate(update.due.getDate() + 6 * update.ease ** consecutiveCorrectAnswers);
  } else {
    update.consecutiveCorrectAnswers = 0;
    update.due.setDate(update.due.getDate() + 1);
  }

  return update;
}

exports.calculateNextDueDate = calculateNextDueDate;
exports.ANSWER_REPEAT = ANSWER_REPEAT;
exports.ANSWER_HARD = ANSWER_HARD;
exports.ANSWER_OK = ANSWER_OK;
exports.ANSWER_EASY = ANSWER_EASY;
exports.INITIAL_EASE = INITIAL_EASE;
