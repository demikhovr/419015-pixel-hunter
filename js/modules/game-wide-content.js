export default (level) => `
  <form class="game__content  game__content--wide">
    ${`<div class="game__option">
        <img src="${level.options.src}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo" data-is-correct="${level.options.answers[0]}">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint" data-is-correct="${level.options.answers[1]}">
          <span>Рисунок</span>
        </label>
      </div>`}
  </form>`;

