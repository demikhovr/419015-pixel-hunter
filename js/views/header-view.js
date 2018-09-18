import AbstractView from './abstract-view';
import {INITIAL_STATE} from '../data/data';

const EMPTY_HEART_ICON = `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`;
const FULL_HEART_ICON = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        ${this.state ? `<div class="game__timer">${this.state.time}</div>
                        <div class="game__lives">
                          ${this._getLives(this.state.lives)}
                        </div>` : ``}
      </header>`;
  }

  toggleBlinkMode(isBlink) {
    this._timer.classList[isBlink ? `add` : `remove`](`game__timer--blink`);
  }

  updateTimer(time) {
    this._timer = this._element.querySelector(`.game__timer`);
    this._timer.textContent = time;
  }

  updateLives(lives) {
    this._lives = this._element.querySelector(`.game__lives`);
    this._lives.innerHTML = this._getLives(lives);
  }

  _getLives(lives) {
    return `
      ${new Array(INITIAL_STATE.lives - lives).fill(EMPTY_HEART_ICON).join(``)}
      ${new Array(lives).fill(FULL_HEART_ICON).join(``)}`;
  }

  bind(element) {
    const backBtn = element.querySelector(`.back`);
    this._timer = element.querySelector(`.game__timer`);
    backBtn.addEventListener(`click`, this.onBackBtnClick);
  }

  onBackBtnClick() {

  }
}
