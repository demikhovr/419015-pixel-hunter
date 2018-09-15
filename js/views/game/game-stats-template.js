import * as game from '../../game';

const StatsResultTemplates = {
  CORRECT: `<li class="stats__result stats__result--correct"></li>`,
  WRONG: `<li class="stats__result stats__result--wrong"></li>`,
  FAST: `<li class="stats__result stats__result--fast"></li>`,
  SLOW: `<li class="stats__result stats__result--slow"></li>`,
  UNKNOWN: `<li class="stats__result stats__result--unknown"></li>`,
};

export default (answers) => {
  const getResultTemplate = (answer) => {
    let template = ``;

    switch (answer) {
      case (game.AnswerType.FAST):
        template = StatsResultTemplates.FAST;
        break;
      case (game.AnswerType.SLOW):
        template = StatsResultTemplates.SLOW;
        break;
      case (game.AnswerType.CORRECT):
        template = StatsResultTemplates.CORRECT;
        break;
      default:
        template = StatsResultTemplates.WRONG;
        break;
    }

    return template;
  };

  return `
    <ul class="stats">
      ${Array.from({length: game.MAX_QUESTIONS}, (value, key) => answers[key] !== undefined ? getResultTemplate(answers[key]) : StatsResultTemplates.UNKNOWN).join(``)}
    </ul>
  `;
};

