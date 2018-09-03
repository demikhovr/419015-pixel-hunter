import {createElement, renderScreen} from './../../util';
import greeting from './greeting';
import stats from './stats';
import getHeader from '../header-template';
import getGameTemplate from './../game-template';
import {levels} from './../../data/data';
import * as game from './../../game';

const getGameScreen = (state) => {
  let gameState = Object.assign({}, state, {answers: [...state.answers]});
  const gameLevel = levels[gameState.level];

  const template = `
    ${getHeader(gameState)}
    ${getGameTemplate(gameState)}`;

  const gameScreen = createElement(template);
  const gameForm = gameScreen.querySelector(`.game__content`);
  const backBtn = gameScreen.querySelector(`.back`);

  const updateGame = (isCorrect, time) => {
    gameState.answers.push({
      isCorrect,
      time
    });

    gameState.level++;
    gameState = game.getUpdatedState(gameState, gameState.level, isCorrect);
    const isLastLevel = gameState.level === game.MAX_QUESTIONS;
    const nextScreen = (!gameState.lives || isLastLevel) ? stats(gameState) : getGameScreen(gameState);
    renderScreen(nextScreen);
  };

  if (gameLevel.type === `common`) {
    const MAX_ANSWERS = 2;
    const gameAnswers = gameScreen.querySelectorAll(`.game__answer input[type="radio"]`);

    const gameFormChangeHandler = () => {
      const areAllAnswered = [...gameAnswers].filter(({checked}) => checked).length === MAX_ANSWERS;

      if (areAllAnswered) {
        const isCorrect = [...gameAnswers].filter((answer) => answer.checked && answer.dataset.isCorrect === `true`).length === MAX_ANSWERS;
        const time = 15;
        updateGame(isCorrect, time);
      }
    };

    gameForm.addEventListener(`change`, gameFormChangeHandler);
  }

  if (gameLevel.type === `wide`) {
    const gameFormChangeHandler = ({target}) => {
      const isAnswered = target.checked;

      if (isAnswered) {
        const isCorrect = target.checked && target.dataset.isCorrect === `true`;
        const time = 15;
        updateGame(isCorrect, time);
      }
    };

    gameForm.addEventListener(`change`, gameFormChangeHandler);
  }

  if (gameLevel.type === `triple`) {
    const gameFormClickHandler = ({target}) => {
      const option = target.closest(`.game__option`);

      if (option) {
        const isCorrect = option.dataset.isCorrect === `true`;
        const time = 15;
        updateGame(isCorrect, time);
      }
    };

    gameForm.addEventListener(`click`, gameFormClickHandler);
  }

  backBtn.addEventListener(`click`, () => renderScreen(greeting()));

  return gameScreen;
};

export default getGameScreen;
