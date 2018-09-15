import AbstractView from '../abstract-view';
import HeaderView from '../header-view';
import * as game from '../../game';

import getGameStats from '../game/game-stats-template';
const LAST_GAME = 0;
const Titles = {
  WIN: `Победа!`,
  FAIL: `Поражение!`
};

const getResultsTemplate = (results) => {
  const resultsTemplate = [];
  results.reverse().forEach((state, index) => {
    resultsTemplate.push(`<table class="result__table">
    <tr>
      <td class="result__number">${index + 1}.</td>
      <td colspan="2">
        ${state.answerList}
      </td>
      ${state.type.total ? `<td class="result__points">× ${state.type.correct.price}` : `<td class="result__total">`}</td>
      <td class="result__total ${state.type.total ? `">${state.type.correct.total}` : `result__total--final">FAIL`}</td>
    </tr>
  ${state.type.total ? `
    ${state.type.fast.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${state.type.fast.count} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× ${state.type.fast.price}</td>
      <td class="result__total">${state.type.fast.total}</td>
    </tr>` : ``}
    ${state.type.lives.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${state.type.lives.count} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× ${state.type.lives.price}</td>
      <td class="result__total">${state.type.lives.total}</td>
    </tr>` : ``}
    ${state.type.slow.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${state.type.slow.count} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× ${state.type.slow.price}</td>
      <td class="result__total">${state.type.slow.total}</td>
    </tr>` : ``}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${state.type.total}</td>
    </tr>` : ``}
  </table>`);
  });

  return `
  <section class="result">
    <h2 class="result__title">${results.length ? results[LAST_GAME].title : ``}</h2>
    ${resultsTemplate.join(``)}
  </section>`;
};

const getStatsObj = ({answers, lives}) => {
  const scores = game.countPoints(answers, lives);

  return Object.assign({}, {
    title: scores ? Titles.WIN : Titles.FAIL,
    answerList: getGameStats(answers),
    type: {
      correct: {
        count: answers.reduce((total, item) => total + (item !== game.AnswerTypeMultiplier.WRONG), 0),
        price: game.AnswerTypeMultiplier.CORRECT * game.ANSWER_POINT,
        total: answers.reduce((total, item) => total + (item !== game.AnswerTypeMultiplier.WRONG), 0) * game.AnswerTypeMultiplier.CORRECT * game.ANSWER_POINT
      },
      fast: {
        count: answers.reduce((total, item) => total + (item === game.AnswerTypeMultiplier.FAST), 0),
        price: game.ANSWER_POINT,
        total: answers.reduce((total, item) => total + (item === game.AnswerTypeMultiplier.FAST), 0) * game.ANSWER_POINT
      },
      lives: {
        count: lives,
        price: game.ANSWER_POINT,
        total: lives * game.ANSWER_POINT
      },
      slow: {
        count: answers.reduce((total, item) => total + (item === game.AnswerTypeMultiplier.SLOW), 0),
        price: game.ANSWER_POINT,
        total: answers.reduce((total, item) => total + (item === game.AnswerTypeMultiplier.SLOW), 0) * -game.ANSWER_POINT
      },
      total: scores
    }
  });
};

export default class StatsView extends AbstractView {
  constructor(results) {
    super();
    this._header = new HeaderView();
    this._header.onBackBtnClick = () => this.onBackBtnClick();
    this.results = results.map((result) => getStatsObj(result));
  }

  get template() {
    return getResultsTemplate(this.results);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    const elementFragment = document.createDocumentFragment();
    elementFragment.append(this._header.element, this.render());
    this._element = elementFragment;
    this.bind(this._element);

    return this._element;
  }

  onBackBtnClick() {

  }
}
