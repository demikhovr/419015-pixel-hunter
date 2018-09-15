import AbstractView from '../abstract-view';
import getGameStats from './game-stats-template';
import resize from '../../utils/resize';

const FRAME = {
  width: 705,
  height: 455
};
const TIME = 15;

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

  bind(element) {
    const form = element.querySelector(`.game__content`);

    const formChangeHandler = ({target}) => {
      const checkedAnswer = target.checked;

      if (checkedAnswer) {
        const isCorrect = checkedAnswer && target.value === this.level.options[0].type;
        const answer = {isCorrect, TIME};
        this.onAnswer(answer);
      }
    };

    form.addEventListener(`change`, formChangeHandler);
  }

  onAnswer() {

  }
}

