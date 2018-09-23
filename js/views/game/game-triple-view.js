import AbstractView from '../abstract-view';
import getGameStats from './game-stats-template';
import resize from '../../utils/resize';
import {isDebugMode} from "../../utils/util";

const FRAME = {
  width: 304,
  height: 455
};

export default class GameTripleView extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--triple">
          ${this.level.options.map((option, i) => `
            <div class="game__option">
              <img src="${option.src}" alt="Option ${i + 1}" width="${resize(FRAME, option).width}" height="${resize(FRAME, option).height}">
            </div>
          `).join(``)}
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
    const answerIndex = this._getUniqueAnswerIndex(this.level.options);
    const rightAnswer = [...this._gameOptions].find((option, index) => answerIndex === index);
    rightAnswer.classList.add(`game__option--right`);
  }

  _getUniqueAnswerIndex(answers) {
    const counts = {};
    const types = answers.map((answer) => answer.type);

    types.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    const result = types.filter((type) => counts[type] <= 1)[0];
    return types.indexOf(result);
  }

  bind(element) {
    this._gameOptions = element.querySelectorAll(`.game__option`);

    const optionClickHandler = ({target}) => {
      const option = target.closest(`.game__option`);
      const optionIndex = Array.from(this._gameOptions).indexOf(option);

      if (option) {
        const answerIndex = this._getUniqueAnswerIndex(this.level.options);
        const isCorrect = answerIndex === optionIndex;
        this.onAnswer(isCorrect);
      }
    };

    this._gameOptions.forEach((option) => option.addEventListener(`click`, optionClickHandler));
  }

  onAnswer() {

  }
}


