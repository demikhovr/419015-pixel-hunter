import * as game from '../../../game';

export default (answers) => {
  const statsResultTypes = {
    correct: `<li class="stats__result stats__result--correct"></li>`,
    wrong: `<li class="stats__result stats__result--wrong"></li>`,
    fast: `<li class="stats__result stats__result--fast"></li>`,
    slow: `<li class="stats__result stats__result--slow"></li>`,
    unknown: `<li class="stats__result stats__result--unknown"></li>`,
  };

  const getResultTemplate = ({isCorrect, time}) => {
    let template = ``;

    if (isCorrect) {
      switch (true) {
        case (time <= game.MIN_TIME):
          template = statsResultTypes.fast;
          break;
        case (time > game.MAX_TIME):
          template = statsResultTypes.slow;
          break;
        default:
          template = statsResultTypes.correct;
          break;
      }
    } else {
      template = statsResultTypes.wrong;
    }

    return template;
  };

  return `
    <ul class="stats">
      ${Array.from({length: game.MAX_QUESTIONS}, (value, key) => answers[key] ? getResultTemplate(answers[key]) : statsResultTypes.unknown).join(``)}
    </ul>
  `;
};

