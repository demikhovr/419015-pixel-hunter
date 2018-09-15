import {INITIAL_STATE} from "./data/data";
export const MAX_QUESTIONS = 10;
export const ANSWER_POINT = 50;

export const AnswerType = {
  WRONG: 0,
  SLOW: 1,
  CORRECT: 2,
  FAST: 3
};

export const AnswerTime = {
  MIN: 10,
  MAX: 20
};

export const AnswerTypeMultiplier = {
  WRONG: 0,
  SLOW: 1,
  CORRECT: 2,
  FAST: 3
};

export const countPoints = (answers, lives) => {
  if (lives < 0) {
    return 0;
  }

  return (answers.reduce((prev, item) => prev + item) + lives) * ANSWER_POINT;
};

export const updateLives = (state, isCorrect) => {
  let {lives} = state;

  if (!isCorrect) {
    lives--;
  }

  return Object.assign({}, state, {lives});
};

export const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < INITIAL_STATE.level) {
    throw new Error(`Level should not be negative value`);
  }

  if (level > MAX_QUESTIONS) {
    throw new Error(`There should not be more than 10 levels`);
  }

  return Object.assign({}, state, {level});
};

export const tick = (state) => {
  if (!state.time) {
    return state;
  }

  return Object.assign({}, state, {time: state.time - 1});
};

export const getAnswerType = (time) => {
  if (time <= AnswerTime.MIN) {
    return AnswerType.FAST;
  }

  if (time > AnswerTime.MAX) {
    return AnswerType.SLOW;
  }

  if (AnswerTime.MIN < time && time < AnswerTime.MAX) {
    return AnswerType.CORRECT;
  }

  return AnswerType.WRONG;
};

export const addAnswer = (state, isCorrect) => {
  const time = INITIAL_STATE.time - state.time;
  const answer = !isCorrect ? AnswerType.WRONG : getAnswerType(time);
  return Object.assign({}, state, {answers: [...state.answers, answer]});
};
