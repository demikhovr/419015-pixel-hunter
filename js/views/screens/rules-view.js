import AbstractView from '../abstract-view';
import HeaderView from '../header-view';
import {INITIAL_STATE} from '../../data/data';
import {MAX_QUESTIONS} from '../../game';

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this._header = new HeaderView();
    this._header.onBackBtnClick = () => this.onBackBtnClick();
  }

  get template() {
    return `
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

  bind(element) {
    const form = element.querySelector(`.rules__form`);
    const nameInput = element.querySelector(`.rules__input`);
    const submitBtn = element.querySelector(`.rules__button`);

    const nameInputHandler = ({target}) => {
      submitBtn.disabled = !target.value.length;
      this.onNameInput();
    };

    const formSubmitHandler = (evt) => {
      evt.preventDefault();
      this.onFormSubmit();
    };

    nameInput.addEventListener(`input`, nameInputHandler);
    form.addEventListener(`submit`, formSubmitHandler);
  }

  onNameInput() {

  }

  onFormSubmit() {

  }

  onBackBtnClick() {

  }
}
