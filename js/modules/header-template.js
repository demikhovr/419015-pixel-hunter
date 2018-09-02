import {INITIAL_STATE} from './../data/data';
const EMPTY_HEART_ICON = `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`;
const FULL_HEART_ICON = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;

export default (state) =>
  `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    ${state ?
    `<div class="game__timer">${state.time}</div>
      <div class="game__lives">
        ${new Array(INITIAL_STATE.lives - state.lives).fill(EMPTY_HEART_ICON).join(``)}
        ${new Array(state.lives).fill(FULL_HEART_ICON).join(``)}
      </div>`
    : ``}
  </header>`;
