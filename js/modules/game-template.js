import getGameCommonContent from './game-common-content';
import getGameWideContent from './game-wide-content';
import getGameTripleContent from './game-triple-content';
import getGameStats from './game-stats-template';
import {levels} from './../data/data';

export default (state) => {
  const gameState = Object.assign({}, state);
  const gameLevel = levels[gameState.level];
  let gameContent = ``;

  switch (true) {
    case (gameLevel.type === `common`):
      gameContent = getGameCommonContent(gameLevel);
      break;
    case (gameLevel.type === `wide`):
      gameContent = getGameWideContent(gameLevel);
      break;
    case (gameLevel.type === `triple`):
      gameContent = getGameTripleContent(gameLevel);
      break;
  }

  return `<section class="game">
            <p class="game__task">${gameLevel.task}</p>
            ${gameContent}
            ${getGameStats(gameState)}
          </section>`;
};
