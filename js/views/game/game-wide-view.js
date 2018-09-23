import AbstractView from '../abstract-view';
import getGameStats from './game-stats-template';
import resize from '../../utils/resize';
import {isDebugMode} from "../../utils/util";

const FRAME = {
  width: 705,
  height: 455
};

export default class GameWideView extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--wide">
          ${`<div class="game__option">
              <img src="${this.level.options[0].src}" alt="Option 1" width="${resize(FRAME, this.level.options[0]).width}" height="${resize(FRAME, this.level.options[0]).height}">
              <label class="game__answer  game__answer--photo">
                <input class="visually-hidden" name="question1" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--paint">
                <input class="visually-hidden" name="question1" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>`}
        </form>
        ${getGameStats(this.answers)}
      </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind(this._element);

    if (isDebugMode()) {
      this._showRightAnswer();
    }

    return this._element;
  }

  _showRightAnswer() {
    const rightAnswer = [...this._gameOptions].find((option) => option.value === this.level.options[0].type);
    rightAnswer.parentNode.classList.add(`game__answer--right`);
  }

  bind(element) {
    const form = element.querySelector(`.game__content`);
    this._gameOptions = form.querySelectorAll(`.game__answer input[type="radio"]`);

    const formChangeHandler = ({target}) => {
      const checkedOption = target.checked;

      if (checkedOption) {
        const isCorrect = checkedOption && target.value === this.level.options[0].type;
        this.onAnswer(isCorrect);
      }
    };

    form.addEventListener(`change`, formChangeHandler);
  }

  onAnswer() {

  }
}

