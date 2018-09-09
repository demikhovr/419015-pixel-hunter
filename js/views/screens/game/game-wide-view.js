import AbstractView from './../../abstract-view';
import getGameStats from './game-stats-template';
import resize from './../../../utils/resize';

export default class GameWideView extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
  }

  get template() {
    const FRAME = {
      width: 705,
      height: 455
    };

    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--wide">
          ${`<div class="game__option">
              <img src="${this.level.option.src}" alt="Option 1" width="${resize(FRAME, this.level.option).width}" height="${resize(FRAME, this.level.option).height}">
              <label class="game__answer  game__answer--photo">
                <input class="visually-hidden" name="question1" type="radio" value="photo" data-is-correct="${this.level.option.answers[0]}">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--paint">
                <input class="visually-hidden" name="question1" type="radio" value="paint" data-is-correct="${this.level.option.answers[1]}">
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
      const isAnswered = target.checked;

      if (isAnswered) {
        const isCorrect = target.checked && target.dataset.isCorrect === `true`;
        const time = 15;
        const answer = {isCorrect, time};
        this.onAnswer(answer);
      }
    };

    form.addEventListener(`change`, formChangeHandler);
  }

  onAnswer() {

  }
}

