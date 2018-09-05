export default (level) => `
  <form class="game__content  game__content--triple">
    ${level.options.map((option, i) => `
      <div class="game__option" data-is-correct="${option.isCorrect}">
        <img src="${option.src}" alt="Option ${i + 1}" width="304" height="455">
      </div>
    `).join(``)}
  </form>`;
