import AbstractView from '../abstract-view';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
  }

  hide() {
    this._element.classList.add(`intro--fade-out`);
  }

  bind(element) {
    const playGameBtn = element.querySelector(`.intro__asterisk`);

    const introTransitionEndHandler = (evt) => {
      if (evt.propertyName === `opacity`) {
        this.onFadeOut();
      }
    };

    element.addEventListener(`transitionend`, introTransitionEndHandler);
    playGameBtn.addEventListener(`click`, this.onPlayGameBtnClick);
  }

  onFadeOut() {

  }

  onPlayGameBtnClick() {

  }
}
