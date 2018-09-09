import AbstractView from './../../abstract-view';
import getGameStats from './game-stats-template';
import resize from './../../../utils/resize';

export default class GameTripleView extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
  }

  get template() {
    const FRAME = {
      width: 304,
      height: 455
    };

    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--triple">
          ${this.level.options.map((option, i) => `
            <div class="game__option" data-is-correct="${option.isCorrect}">
              <img src="${option.src}" alt="Option ${i + 1}" width="${resize(FRAME, option).width}" height="${resize(FRAME, option).height}">
            </div>
          `).join(``)}
        </form>
        ${getGameStats(this.answers)}
      </section>`;
  }

  bind(element) {
    const form = element.querySelector(`.game__content`);

    const formClickHandler = ({target}) => {
      const option = target.closest(`.game__option`);

      if (option) {
        const isCorrect = option.dataset.isCorrect === `true`;
        const time = 15;
        const answer = {isCorrect, time};
        this.onAnswer(answer);
      }
    };

    form.addEventListener(`click`, formClickHandler);
  }

  onAnswer() {

  }
}


