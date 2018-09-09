import AbstractView from './../../abstract-view';
import getGameStats from './game-stats-template';
import resize from './../../../utils/resize';

export default class GameCommonView extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
  }

  get template() {
    const FRAME = {
      width: 468,
      height: 458
    };

    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content">
          ${this.level.options.map((option, i) => `
            <div class="game__option">
              <img src="${option.src}" alt="Option ${i + 1}" width="${resize(FRAME, option).width}" height="${resize(FRAME, option).height}">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo" data-is-correct="${option.answers[0]}">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint" data-is-correct="${option.answers[1]}">
                <span>Рисунок</span>
              </label>
            </div>`).join(``)}
        </form>
        ${getGameStats(this.answers)}
      </section>`;
  }

  bind(element) {
    const form = element.querySelector(`.game__content`);

    const MAX_ANSWERS = 2;
    const gameAnswers = form.querySelectorAll(`.game__answer input[type="radio"]`);

    const formChangeHandler = () => {
      const areAllAnswered = [...gameAnswers].filter(({checked}) => checked).length === MAX_ANSWERS;

      if (areAllAnswered) {
        const isCorrect = [...gameAnswers].filter((answer) => answer.checked && answer.dataset.isCorrect === `true`).length === MAX_ANSWERS;
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

