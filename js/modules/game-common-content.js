export default (level) => `
  <form class="game__content">
    ${level.options.map((option, i) => `
      <div class="game__option">
        <img src="${option.src}" alt="Option ${i + 1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo" data-is-correct="${option.answers[0]}">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint" data-is-correct="${option.answers[1]}">
          <span>Рисунок</span>
        </label>
      </div>`).join(``)}
  </form>`;

