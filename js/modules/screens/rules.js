import {createElement, renderScreen} from '../../util';
import {INITIAL_STATE} from './../../data/data';
import {MAX_QUESTIONS} from './../../game';
import getHeader from '../header-template';
import game from './game';
import greeting from "./greeting";

export default () => {
  const template = `
      ${getHeader()}
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>Угадай ${MAX_QUESTIONS} раз для каждого изображения фото
            <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
            <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится ${INITIAL_STATE.time} секунд.</li>
          <li>Ошибиться можно не более ${INITIAL_STATE.lives} раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </section>`;

  const rules = createElement(template);
  const rulesForm = rules.querySelector(`.rules__form`);
  const rulesNameInput = rules.querySelector(`.rules__input`);
  const rulesFormSubmitBtn = rules.querySelector(`.rules__button`);
  const backBtn = rules.querySelector(`.back`);

  rulesFormSubmitBtn.disabled = true;

  const rulesNameInputHandler = ({target}) => {
    rulesFormSubmitBtn.disabled = !target.value.length;
  };

  const rulesFormSubmitHandler = (evt) => {
    evt.preventDefault();
    renderScreen(game(INITIAL_STATE));
  };

  rulesNameInput.addEventListener(`input`, rulesNameInputHandler);
  rulesForm.addEventListener(`submit`, rulesFormSubmitHandler);
  backBtn.addEventListener(`click`, () => renderScreen(greeting()));

  return rules;
};
