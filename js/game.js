import {INITIAL_STATE} from "./data/data";

const MAX_QUESTIONS = 10;
const ANSWER_POINT = 100;
const EXTRA_POINT = 50;
const MIN_TIME = 10;
const MAX_TIME = 20;

export const countPoints = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`answers should be of type array`);
  }

  if (answers.length < MAX_QUESTIONS || answers.length > MAX_QUESTIONS) {
    throw new Error(`There should be only 10 answers`);
  }

  if (typeof lives !== `number`) {
    throw new Error(`lives should be of type number`);
  }

  let points = answers.reduce((prev, curr) => {
    if (curr.isCorrect) {
      prev += ANSWER_POINT;

      if (curr.time < MIN_TIME) {
        prev += EXTRA_POINT;
      }

      if (curr.time > MAX_TIME) {
        prev -= EXTRA_POINT;
      }
    }

    return prev;
  }, 0);

  points += lives * EXTRA_POINT;

  return points;
};

export const updateLives = (state, isCorrectAnswer) => {
  let {lives} = state;

  if (!isCorrectAnswer) {
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

export const updateTime = (state) => {
  let {time} = state;

  time--;

  if (!time) {
    return false;
  }

  return Object.assign({}, state, {time});
};
