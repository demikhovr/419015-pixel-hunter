import AbstractView from './abstract-view';

export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn  modal__btn--submit">Ок</button>
            <button class="modal__btn  modal__btn--cancel">Отмена</button>
          </div>
        </form>
      </section>`;
  }

  remove() {
    this._element.remove();
  }

  bind(element) {
    const closeBtn = element.querySelector(`.modal__close`);
    const btnSubmit = element.querySelector(`.modal__btn--submit`);
    const btnCancel = element.querySelector(`.modal__btn--cancel`);
    closeBtn.addEventListener(`click`, () => this.remove());
    btnSubmit.addEventListener(`click`, () => this.onBtnSubmitClick());
    btnCancel.addEventListener(`click`, () => this.remove());
  }

  onBtnSubmitClick() {

  }
}
